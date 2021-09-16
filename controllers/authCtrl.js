const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const stripe = require('stripe')(process.env.SECRET_KEY)
require('dotenv/config');

const verifyToken = require('../utils/verifyToken')

//VALIDATION
const {  registerValidation, loginValidation } = require('../validation');
const user = require('../models/user');


const register = async (req, res) => {
        
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const email = req.body.email; 
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm

        //  VALIDATE THE DATA DEFORE CREATING A USER
        const {error} = registerValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        // Checking if user already exist in databade
        const emailExist = await User.findOne({email: email});
        if(emailExist) return res.status(400).send('Email already exists');


        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const hashedPasswordConfirm = await bcrypt.hash(passwordConfirm, salt)


        // creat a user
        const user = new User ({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: hashedPassword,
            passwordConfirm: hashedPasswordConfirm
        })

        try {
            const savedUser = await user.save();
            res.send({
                user: user._id
            })
        }catch(err) {
            res.status(400).send(err)
        }
};



const login = async (req, res) => {
        console.log(req.body)
        const email = req.body.email;
        const password = req.body.password;

        //VALIDATE DATA BEFORE LOGING
        const {error} = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        // Checkinf if user exist in database
        const user = await User.findOne({email: email});
        if(!user) return res.status(422).send({error: `Email doesn't exist`});

        // PASSWORD IS CORRECT
        const validPass = await bcrypt.compare(password, user.password);
        if(!validPass) return res.status(403).send({error: `Invalid Password`});

        // Creat and assign a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
        res.header('Authorization', token).send({token})

        // res.send('Logged in !')
}

const getUserProfile = async (req, res) => {
    const userId = req.user._id
    const foundUser = await User.findOne({_id: userId})

    res.send( {
        user: {
            firstname: foundUser.firstname,
            lastname: foundUser.lastname,
            username: foundUser.username,
            email: foundUser.email,
            avatar: foundUser.avatar,
            isAdmin: foundUser.isAdmin
        }
    })
}

const creatCart = async (req, res) => {
    const userId = req.user._id

    const foundUser = await User.findOneAndUpdate(
        {
            _id: userId
        },
        {
            cart : req.body.cartItems
        },
        {
            upsert: true, new: true
        }
    );
    try {
        const savedUpdatedUser = await foundUser.save()
        res.status(200).send(savedUpdatedUser)
    }catch (error) {
        res.status(400).send('user cart update failed')
    }

    
}

const getAllUser = async (req, res) => {
    
    const foundUsers = await User.find()

    try {
        res.status(200).send(foundUsers)
    } catch (error) {
        res.status(400).send(foundUsers)
    }
}

const updateUser = async (req, res) => {

    const  userId = req.user._id

    // let fileArray = [];

    //     const file = {
    //         fileName: req.file.originalname,
    //         filePath: req.file.path,
    //         fileType: req.file.mimetype,
    //         fileSize: fileSizeFormatter(req.file.size, 2)
    //     }

    //     fileArray.push(file)

    const foundUser = await User.findOneAndUpdate(
        {
            _id: userId
        },
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            // avatar: fileArray,
            email: req.body.email,
            // password: req.body.password,
            // passwordConfirm: req.body.password
        },
        {
            upsert: true, new: true
        }
    );
    try {
        const savedUpdatedUser = await foundUser.save()
        res.status(200).send(savedUpdatedUser)
    }catch (error) {
        res.status(400).send('user update failed')
    }
}


const updateUserAvatar = async (req, res) => {

    const  userId = req.user._id

    let fileArray = [];

        const file = {
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        }

        fileArray.push(file)

    const foundUser = await User.findOneAndUpdate(
        { 
            _id: userId
        },
        {
            avatar: fileArray,
        },
        {
            upsert: true, new: true
        }
    );
    try {
        const savedUpdatedUserAvatar = await foundUser.save()
        res.status(200).send(savedUpdatedUserAvatar)
    }catch (error) {
        res.status(400).send('user avatar update failed')
    }
}


const createCheckoutSession = async (req, res) => {

    const domainUrl = process.env.WEB_APP_URL;

    const userId = req.user._id;
    // userId = JSON.stringify(userId)
    const foundUser = await User.findOne({_id: userId})
    const { email } = foundUser;

    const { line_items } = req.body
    
    if(!line_items || !email) {
            return res.status(400).json({ error: 'missing required session parameters' })
        }
        let session;
        
    try {
        session = await stripe.checkout.sessions.create({
            // submit_type: 'donate',
            payment_method_types: ['card'],
            mode: 'payment',
            shipping_rates: ['shr_1JZeeGJH7Azx3XTQb0U1Gamg'],
            line_items,
            client_reference_id: userId,
            customer_email: email,
            success_url: `${domainUrl}/cart/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainUrl}/cart/checkout/canceled`,
            shipping_address_collection: { allowed_countries: ['FR', 'GB', 'US'] }
        })

        res.status(200).json({ sessionId: session.id, })
    } catch (error)  {
        console.log(error),
        res.status(400).json({ error: 'an error occured unable to create session'});
    }

}

const getallStripeOrders = async (req, res) => {
    const sessionId = req.body.id;
    try {
        const session = await stripe.checkout.sessions.list();
        // sessionId, {expand: ['line_items']}
        res.status(200).send(session)
    }catch (error) {
        res.status(400).send('failed to get orders list')
    }
}
const fileSizeFormatter = (bytes, decimal) => {
    if(bytes ===  0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index]
}

module.exports = {
    register,
    login,
    getUserProfile,
    getAllUser,
    updateUser,
    updateUserAvatar,
    creatCart,
    createCheckoutSession,
    getallStripeOrders
}