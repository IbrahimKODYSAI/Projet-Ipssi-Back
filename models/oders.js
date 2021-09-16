const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, ref : 'User' 
    },
    user_email: {
        type: String,
        required: true
    },
    session_completed: {
        type: Object,
        required: true
    },
    // items: {
    //     type: Array,
    //     required: true
    // },
    // adress : {
    //     type: String,
    //     required: true
    // },
    // zipCode: {
    //     type: String,
    //     required: true
    // },
    // city: {
    //     type: String,
    //     required: true
    // },
    // state: {
    //     type: String,
    //     required: false
    // },
    // country: {
    //     type: String,
    //     required: true
    // },
    // total: {
    //     type: Object,
    //     required: true
    // }
},{timestamps: true})


module.exports = mongoose.model('Order', ordersSchema)