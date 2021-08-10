const Comment = require('../models/comment');
const User = require('../models/user');
const Product = require('../models/product')
const jwt = require('jsonwebtoken')
require('dotenv/config');


const createComment = async (req, res) => {

    const authorId = req.user._id;
    const author = await User.findOne({_id: authorId})
    // const authorName = author.username;
    // const userAvatar = author.avatar;
    // console.log(authorName)

    const comment = new Comment ({
        commentary: req.body.commentary,
        author: {
            username: author.username,
            avatar: author.avatar,
        }
    });
    console.log(comment)
    try{
        const savedComment = await comment.save();
        res.send(savedComment)
        const productId = req.body.productId;
        const product = await Product.findOneAndUpdate(
            {
                _id: productId
            },
            {
                $push: {comments: savedComment}
            },
            {upsert: true, new: true}
        )
        console.log(savedComment)
        res.send(product)
    }catch(error) {
        res.status(400).send(error)
    }


}


const getCommentaries = async (req, res) => {

    const productId = req.body.productId;

    const foundProduct = await Product.findOne({_id: productId})
    const commentaries = foundProduct.comments;
    try{
        res.status(200).send(commentaries)
    }catch(err) {
        res.status(400).send('failed to get all the commantries')
    }

}


module.exports = {
    createComment,
    getCommentaries
}