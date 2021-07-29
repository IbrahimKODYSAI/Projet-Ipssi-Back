const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();


//Import Routes
const productRoute = require('./routes/Products');

app.use('/products', productRoute);










//------------------------------------------------SERVER-----------------------------------------------

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes

app.get('/', (req, res) => {
    res.send('we are on home server')
})

// connect to db
mongoose.connect(
    process.env.DB_CONNECTION, 
{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('connexion success to bdd !')
}).catch((error) => {
    console.log(error);
});

// server listen
app.listen(3000, () => {
    console.log('server is running on 3000')
});