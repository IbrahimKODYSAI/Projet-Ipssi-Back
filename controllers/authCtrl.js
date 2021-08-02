const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv/config');

const verifyToken = require('../utils/verifyToken')

//VALIDATION
const {  registerValidation, loginValidation } = require('../validation')


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
        }
    })
}



module.exports = {
    register,
    login,
    getUserProfile
}