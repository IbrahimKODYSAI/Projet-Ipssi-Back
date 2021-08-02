const Comment = require('../models/comment');
const User = require('../models/user');
const Product = require('../models/product')
const jwt = require('jsonwebtoken')
require('dotenv/config');


const createComment = async (req, res) => {

    const authorId = req.user._id;
    const author = await User.findOne({_id: authorId})
    const authorName = author.username;
    console.log(authorName)

    const comment = new Comment ({
        commentary: req.body.commentary,
        author: authorName
    });
    console.log(comment)
    try{
        const savedComment = await comment.save();
        res.send(savedComment)
        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.productId
            },
            {
                $push: {comments: savedComment}
            },
            {new: true}
        )
        res.send(product)
    }catch(error) {
        res.status(400).send(error)
    }


}


module.exports = {
    createComment
}