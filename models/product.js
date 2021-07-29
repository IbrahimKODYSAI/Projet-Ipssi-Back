const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    color: {
        type: [String],
        required: false
    },
    rating: {
        type: [Number],
        required: false
    },
    stock: {
        type: Number,
        required: true
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    categoryId: [{  type: mongoose.Schema.Types.ObjectId, ref : 'Category' }],
});

module.exports = mongoose.model('Product', productSchema)