const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    commentary: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.Object, ref : 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref : 'Product'
    },

},{timestamps: true})


module.exports = mongoose.model('Comment', commentSchema)