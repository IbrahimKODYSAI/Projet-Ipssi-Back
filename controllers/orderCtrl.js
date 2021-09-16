const Orders = require('../models/oders');
const Product = require('../models/product');
const stripe = require('stripe')(process.env.SECRET_KEY)



const getOrders = async (req, res) => {

    const foundOrders = await Orders.find();

    const orders = foundOrders.map((order) => {

        const foundOrder = {
            _id : order._id,
            userId: order.user,
            user_email: order.user_email,
            products: order.session_completed.line_items.data.map((item) => {

                
                async function hello(){
                    const productFound = await Product.findOne({ name: item.description})
                    return productFound
                };

                var product = {
                    name: item.description,
                    price: item.amount_total / 100,
                    quantity:  item.quantity,
                }
               return product
            }),
            shipping: order.session_completed.shipping,
            amount_subtotal : order.session_completed.amount_subtotal / 100,
            amount_total : order.session_completed.amount_total / 100,
            payment_status: order.session_completed.payment_status,
        }
        return foundOrder

    })

    try {
        res.status(200).send(orders)
    } catch(erro) {
        res.status(400).send('failed to get all orders')
    }
}


const getUserOrders = async (req, res) => {
    const userId = req.user._id;

    const foudUserOrders = await Orders.find({user: userId}).sort({_id:-1}) 

    const userOrders = foudUserOrders.map((order) => {

        const foundOrder = {
            _id : order._id,
            userId: order.user,
            user_email: order.user_email,
            products: order.session_completed.line_items.data.map((item) => {
                var product = {
                    name: item.description,
                    price: item.amount_total / 100,
                    quantity:  item.quantity,
                }
               return product
            }),
            shipping: order.session_completed.shipping,
            amount_subtotal : order.session_completed.amount_subtotal / 100,
            amount_total : order.session_completed.amount_total / 100,
            payment_status: order.session_completed.payment_status,
        }
        return foundOrder

    })
     try{
        res.status(200).send(userOrders)
     } catch (error) {
        res.status(400).send('failed to get user orders')
     }
}


const displayCurrentOrder = async (req, res) => {

    // const sessionId = req.body.sessionId
    // console.log(sessionId)
    // const foundOrder = await Orders.findOne({sessionId: sessionId})
    // try{
    //     res.status(200).send(foundOrder)
    // } catch (error) {
    //     res.status(400).send('failed to get current order')
    // }

    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);
  
    res.send(customer);
}

module.exports = {
    getOrders,
    getUserOrders,
    displayCurrentOrder
}