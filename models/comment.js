const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    commentary: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.String, ref : 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref : 'Product'
    }

})


module.exports = mongoose.model('Comment', commentSchema)