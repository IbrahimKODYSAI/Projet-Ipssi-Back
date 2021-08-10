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
    
    let filesArray = [];
    req.files.forEach(element => {
        const file = {
            fileName: element.originalname,
            filePath: element.path,
            fileType: element.mimetype,
            fileSize: fileSizeFormatter(element.size, 2)
        }
        filesArray.push(file)
    })
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
        images: filesArray,
        colors: req.body.colors,
        stock: req.body.stock,
        categories: categoriesName
    })
    
    try {
        const savedProduct = await product.save();
        res.send(savedProduct)
    }catch(err){
        res.status(400).send("failederino")
    }
      
};


const getProducts = async (req, res) => {

    const foundProducts = await Product.find();
    console.log(foundProducts)
    try {
        res.status(200).send(foundProducts)
    } catch (error) {
        res.status(400).send(foundProducts)
    }
}

const getOneProduct = async  (req, res) => {

    const productId = req.body.productId;
    console.log(productId)
    const foundOneProduct = await Product.findById({_id: productId})
    console.log(foundOneProduct)
    try {
        res.status(200).send(foundOneProduct)
    } catch (err) {
        res.status(400).send('failed to get the product')
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

    let filesArray = [];
    req.files.forEach(element => {
        const file = {
            fileName: element.originalname,
            filePath: element.path,
            fileType: element.mimetype,
            fileSize: fileSizeFormatter(element.size, 2)
        }
        filesArray.push(file)
    })

    const updatedProduct = await Product.findByIdAndUpdate(

        { _id: req.body._id},
        {
            name: req.body.name,
            title: req.body.title,
            price: req.body.price,
            stock: req.body.stock,
            images: filesArray,
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


    try{
        await Product.findByIdAndDelete({_id: req.body._id});
        res.status(200).send('Product successfully deleted')
    }catch(error) {
        res.status(400).send('failed to delete product')
    }
}


const fileSizeFormatter = (bytes, decimal) => {
    if(bytes ===  0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index]
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getOneProduct,
    fileSizeFormatter,
    // addImageToProduct
}