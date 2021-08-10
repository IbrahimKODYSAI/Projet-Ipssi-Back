const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const path = require('path');

require('dotenv/config');


// connect to db
mongoose.connect(
    process.env.DB_CONNECTION, 
    {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
    }).then(() => {
    console.log('connexion success to bdd !')
}).catch((error) => {
    console.log(error);
});


// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use("/uploads/", express.static(path.join(__dirname, 'uploads')));



//Import Routes
const authRoute = require('./routes/auth.js');
const productRoute = require('./routes/product.js')
const commentRoute = require('./routes/comment.js')



// Route Middlewares
app.get('/', (req, res) => {
    res.send('we are on home server')
})

app.use('/api/user', authRoute);
app.use('/api/product', productRoute);
app.use('/api/comment', commentRoute);





// server listen
app.listen(process.env.PORT, () => {
    console.log('server is Up and running')
});
