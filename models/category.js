const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }],

})


module.exports = mongoose.model('Category', categorySchema)