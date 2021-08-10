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
    images:{
        type: [Object],
        required: false
    },
    colors: {
        type: [String],
        required: false
    },
    ratings: {
        type: [Number],
        required: false
    },
    stock: {
        type: Number,
        required: true
    },
    comments: [{ type: Object, ref: 'Comment' }],
    categories: [{  type: mongoose.Schema.Types.String, ref : 'Category' }],
});

module.exports = mongoose.model('Product', productSchema)