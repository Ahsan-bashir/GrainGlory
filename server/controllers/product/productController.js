const Product = require("../../models/product/product");
const Category = require("../../models/category/category");
const mongoose = require("mongoose");
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid=FILE_TYPE_MAP[file.mimetype];
        let uploadError=new Error('invalid image type');
        if(isValid){
            uploadError=null;
        }
        cb(uploadError, '/assets/images/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension=FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`) //Appending extension
    }
})
const uploadOptions = multer({ storage: storage });


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
// uploadOptions.single('image').
exports.addProduct = async (req, res) => {
    try {
        const { name } = req.body;
        // Check if product with the same name already exists
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            await req.flash('info', 'Product Already Exists !!!');
            console.log("--------------------");
           return res.redirect('/getProductsPage');
        }

        // const category=Category.findById(req.body.category);
        // if(!category){
        //     await req.flash('info', 'Invalid Category !!!');
        //     console.log("--------------------");
        //     res.redirect('/addProductPage');   
        // }

        // const file=req.file;
        // if(!file){
        //      return res.status(400).json({ error: "No image in the request" });
        //     }
        // const fileName=req.file.filename;
        // const basePath=`${req.protocol}://${req.get('host')}/assets/images/uploads/`;
        const product = new Product({
            name,
            price: req.body.price,
            description: req.body.description,
            rich_description: req.body.rich_description,
            // image: `${basePath}}${fileName}}`,
            image: req.body.image,
            images: req.body.images,
            category: req.body.category,
            numReviews: req.body.numReviews,
            countInStock: req.body.countInStock,
            isFeatured: req.body.isFeatured,
        });

        const newProduct = await product.save();
        if (!newProduct) {
            await req.flash('info', 'Product is not created !!!');
            console.log("--------------------");
            res.redirect('/addProductPage');
        }
        res.redirect('/addProductPage');
        
    } catch (error) {
        console.error(error);
        res.redirect('/addProductPage');

        res.status(500).send("Internal server error");
    }
};


exports.viewProduct = async (req, res) => {  
    try {
     const product=await Product.findById(req.params.id);
     const locals = {
         title: "View Product",
         description: "GrainGlory"
     }
     console.log("--------------------------in view");
     res.render('admin/product/viewProduct', {locals,user: product})
    } catch (error) {
      req.flash('error', 'An error occurred while trying to find the product.');
      res.render('admin/product/viewProduct', { messages: req.flash() });
     // console.log("err : ", + error);
    }
 }

exports.updateProduct = async (req, res) => {
    try {
        console.log("in prodct Update");

        // mongoose.isValidObjectId(req.params.id);
        // if (!mongoose.isValidObjectId(req.params.id)) {
        //     req.flash('info','Invalid Id !!!')
        //     // await req.flash('info','New Customer Added Successfully')
        //     await res.redirect(`/editUserPage/${req.params.id}`);
        //  }
        // const category=await Category.findById(req.body.category);
        // if(!category){
        //     return res.status(400).json({ error: "Invalid category" });
        // }
        // Check if product with the same name already exists
        const product = await Product.findByIdAndUpdate(req.params.id, {      
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            rich_description: req.body.rich_description,
            image: req.body.image,
            images: req.body.images,
            category: req.body.category ,
            nummReviews: req.body.numReviews,   
            countInStock: req.body.countInStock,
            isFeatured: req.body.isFeatured,
        });
        const updatedProduct = await product.save();
        console.log("After product save");
        if (!updatedProduct) {
            req.flash('info','Customer Cannot be Updated !!!')
            // await req.flash('info','New Customer Added Successfully')
            await res.redirect(`/editProductPage/${req.params.id}`);
         
        }
        req.flash('info','Customer Updated Successfully !!!')
        // await req.flash('info','New Customer Added Successfully')
        await res.redirect(`/editProductPage/${req.params.id}`);
       } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

exports.updateProductGalleryImages = uploadOptions.array('images',10),async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send("Invalid Product Id");
    }

    const files=req.files;
    let imagesPaths=[];
    if(files){
        const basePath=`${req.protocol}://${req.get('host')}/assets/images/uploads/`;
        files.map(file=>{
            imagesPaths.push(`${basePath}${file.fileName}`);
        });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, {
        images: imagesPaths
    }, { new: true });

    if (!product) {
        return res.status(404).send('the product cannot be updated!');
    }
    res.send(product);
}

exports.deleteProduct = async (req, res) => {
    const deletedProduct=await Product.findByIdAndDelete(req.params.id);
    if(!deletedProduct){
        return res.status(404).json({success:false,message:'product not found!'});
    }
    
    res.redirect('/getProductsPage');
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
// ----------for Admin------------------------------

exports.addProductPage = async (req, res) => {
    const locals = {
        title: "Add New Product",
        description: "GrainGlory"
    }
    res.render('admin/product/addProduct', locals)

};

exports.getProductsPage = async (req, res) => {
    const messages =    await req.flash('info')
    const locals = {
        title: "GrainGlory",
        description: "Get All Products"
    }

const perPage=12;
const page=req.query.page || 1; 

    try {
        
        const products = await Product.aggregate([{  $sort:{updatedAt:-1}  }])
        .skip((perPage*page)-perPage)
        .limit(perPage)
        .exec();

        // .skip(perPage*(page-perPage))
        // .limit(perPage)
        // .exec();
        const count=await Product.countDocuments();    

        res.render('admin/product/allProducts',{
            locals,
            products: products,
            current:page,
            pages:Math.ceil(count/perPage),
            messages
        });

    } catch (error) {
        
        console.log(error);
    }

};

exports.editProductPage = async (req, res) => {  
    try {
     const product=await Product.findById(req.params.id).select("-password");
     const locals = {
         title: "Edit Product",
         description: "GrainGlory"
     }
     console.log("--------------------------in view");
     res.render('admin/product/editProduct', {locals,customer:product})
    } catch (error) {
      req.flash('error',    'An error occurred while trying to find the product.');
      res.render('admin/product/allProducts', { messages: req.flash() });
     // console.log("err : ", + error);
    }
 }