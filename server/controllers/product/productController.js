const Product = require("../../models/product/product");
const Category = require("../../models/category/category");
const mongoose = require("mongoose");

// this getProducts function is used to get all the products from the database
// if we specify the category in the query string, then we will get the products of that category only

exports.getProducts = async (req, res) => {
    let filter = {};
    if(req.query.categories){
        filter={category:req.query.categories.split(',')};
    }

   const productList = await Product.find(filter).populate('category');

    if (!productList) { 
        res.status(500).json({ success: false });
    }
    res.send(productList);
};

exports.getProduct = async (req, res) => {
   const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
        res.status(500).json({ success: false });
    }
    res.send(product);
};

exports.addProduct = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if product with the same name already exists
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ error: "Product already exists" });
        }

        const category=Category.findById(req.body.category);
        if(!category){
            return res.status(400).json({ error: "Invalid category" });
        }

        const product = new Product({
            name,
            price: req.body.price,
            description: req.body.description,
            rich_description: req.body.rich_description,
            image: req.body.image,
            images: req.body.images,
            category: req.body.category,
            numReviews: req.body.numReviews,
            countInStock: req.body.countInStock,
            isFeatured: req.body.isFeatured,
        });

        const newProduct = await product.save();
        if (!newProduct) {
            return res.status(500).json({ error: "Product cannot be created" });
        }
        res.status(200).json({ success: true, product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

exports.updateProduct = async (req, res) => {
    try {
        mongoose.isValidObjectId(req.params.id);
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send("Invalid Product Id");
        }
        const category=await Category.findById(req.body.category);
        if(!category){
            return res.status(400).json({ error: "Invalid category" });
        }
        // Check if product with the same name already exists
        const product = await Product.findByIdAndUpdate(req.params.id, {      
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            rich_description: req.body.rich_description,
            image: req.body.image,
            images: req.body.images,
            category: req.body.category,
            nummReviews: req.body.numReviews,   
            countInStock: req.body.countInStock,
            isFeatured: req.body.isFeatured,
        });

        const updatedProduct = await product.save();
        if (!updatedProduct) {
            return res.status(500).json({ error: "Product cannot be updated" });
        }
        res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

exports.deleteProduct = async (req, res) => {
    const deletedProduct=await Product.findByIdAndDelete(req.params.id);
    if(!deletedProduct){
        return res.status(404).json({success:false,message:'product not found!'});
    }
    res.status(200).json({success:true,message:'the product is deleted!'});
};

exports.getProductsCount = async (req, res) => {
    const productCount = await Product.countDocuments((count) => count);
    if (!productCount) {
        res.status(500).json({ success: false });
    }
    res.send({
        productCount: productCount,
    });
};
exports.getFeaturedProducts = async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(+count);
    if (!products) {
        res.status(500).json({ success: false });
    }
    res.send(products);
};

