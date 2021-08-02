const Product = require('../models/product');
const Category = require('../models/category');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
require('dotenv/config');


const createProduct = async (req, res) => {

    const userId = req.user._id;
    const foundUser = await User.findOne({_id: userId })
    const userRole = foundUser.isAdmin;
    if(userRole == false) return res.status(400).send('Access denied to non user Admin')

    const productExist = await Product.findOne({ name: req.body.name})
    if (productExist) return res.status(400).send('Product already exists');

    const allSentCategories = await Promise.all(req.body.categories.map((category) => {
        const toReturn = Category.findOneAndUpdate(
            {
                categoryName: category
            },
            {
                categoryName: category
            },
            {
                upsert: true, new: true
            }
        )
        return toReturn
    }))
    const categoriesName = allSentCategories.map(category => {
        return category.categoryName
    })

    // creat a product
    const product = new Product ({
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        colors: req.body.colors,
        stock: req.body.stock,
        categories: categoriesName
    })

    try {
        const savedProduct = await product.save();
        res.send(savedProduct)
    }catch(err){
        res.status(400).send(err)
    }
      
};


const getProducts = async (req, res) => {

    const foundProducts = await Product.find();
    console.log(foundProducts)
    try {
        res.status(200).send(foundProducts)
    } catch (error) {
        res.status(400).send(foundProduct)
    }
}

const updateProduct = async (req, res) => {

    const userId = req.user._id;
    const foundUser = await User.findOne({_id: userId })
    const userRole = foundUser.isAdmin;
    if(userRole == false) return res.status(400).send('Access denied to non admin user')

    const allSentCategories = await Promise.all(req.body.categories.map((category) => {
        const toReturn = Category.findOneAndUpdate(
            {
                categoryName: category
            },
            {
                categoryName: category
            },
            {
                upsert: true, new: true
            }
        )
        return toReturn
    }))
    const categoriesName = allSentCategories.map(category => {
        return category.categoryName
    })

    const updatedProduct = await Product.findOneAndUpdate(

        { _id: req.params.productId},
        {
            name: req.body.name,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            colors: req.body.colors,
            stock: req.body.stock,
            categories: categoriesName
        },
        { upsert: true,  new: true },
    
    );
    try {
        const savedUpdatedProduct = await updatedProduct.save()
        res.status(200).send(savedUpdatedProduct)
    }catch (error) {
        res.status(400).send('product update failed')
    }
}

const deleteProduct = async (req, res) => {

    const userId = req.user._id;
    const foundUser = await User.findOne({_id: userId })
    const userRole = foundUser.isAdmin;
    if(userRole == false) return res.status(400).send('Access denied to non admin user')
    
    await Product.deleteOne({_id: req.params.productId});
    try{
        res.status(200).send('Product successfully deleted')
    }catch(error) {
        res.status(400).send('failed to delete product')
    }
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
}