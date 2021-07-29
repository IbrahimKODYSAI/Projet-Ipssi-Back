const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref : 'User' },
    order: [{ type: mongoose.Schema.Types.ObjectId, ref : 'Order' }],
    adress : {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Order', ordersSchema)