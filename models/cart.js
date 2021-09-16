const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})
const CartSchema = new Schema({
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Cart', CartSchema);








// module.exports = function Cart(oldCart) => {
//     this.items = oldCart.items;
//     this.totalQty = oldCart.totalQty;
//     this.totalPrice = oldCart.totalQty;


//     this.add = (item, id) => {
//         const storedItem = this.items[id];
//         if(!storedItem) {
//             storedItem = this.items[id] = {item: item, qty: 0, price: 0};
//         }
//         storedItem.qty++;
//         storedItem.price = storedItem.item.price * storedItem.qty;
//         this.totalQty++;
//         this.totalPrice += storedItem.price;
//     }
// }