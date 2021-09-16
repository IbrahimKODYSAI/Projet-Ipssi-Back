const stripe = require('stripe')(process.env.SECRET_KEY);
const Order = require('../models/oders');
const User = require('../models/user');


const webHookHandlers = {
    'checkout.session.completed': async (data, res) => {
        // other business logic
        // const user = await User.findOne({ email: data.customer_email})
        
        const order = new Order ({
            sessionId: data.id,
            user: data.client_reference_id,
            user_email: data.customer_email,
            session_completed: data,
        })

        try {
            const savedOrder = await order.save();
            res.send(savedOrder)
            console.log(savedOrder)
        }catch(error) {
            res.status(400).send(error.message)
        }

    },

    // 'payment_intent.succeeded': (data) => {
    // console.log('Payment succeeded', data);
    // },
    'payment_intent.payment_failed': async (data) => {
    console.log('Payment Failed', data);
    }
}
  
async function webhook(req, res) {
    const sig = req.headers['stripe-signature'];
    let event;
    let session

    try {
        event = stripe.webhooks.constructEvent(
            req['rawBody'], sig, process.env.WEB_HOOK_SECRET
        );

        session = await stripe.checkout.sessions.retrieve(event.data.object.id,
            {
              expand: ['line_items'],
            }
        );
        if (webHookHandlers[event.type]) {
            webHookHandlers[event.type](session, res);
        }
    } catch(error) {
        return res.status(400).send(`Webhook error ${error.message}`);
    }

}
  
  module.exports = webhook;