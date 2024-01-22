const fs = require('fs');
const cartPath = require('../../models/cart.json');

exports.addToCart=async(req, res)=> {
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    // Load the cart
   fs.readFile(cartPath, (err, data) => {   
    let cart={products:[], totalPrice:0};
    if(!err){
        cart=JSON.parse(data);
    }
    let existingProductIndex=cart.products.findIndex(product=>product.id===productId);
    let updateedProduct;

    if(existingProductIndex>=0){
        updateedProduct={...cart.products[existingProductIndex]};
        updateedProduct.quantity+=quantity;
        cart.products=[...cart.products];
        cart.products[existingProductIndex]=updateedProduct;
     
     }else{
        updateedProduct={id:productId,quantity:quantity};
        cart.products=[...cart.products,updateedProduct];
     }

    cart.totalPrice+=quantity;
    fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
        if (err) {
            console.log(err);
        }
       
    });
}
)}  
exports.viewCart=async(req, res) => {
    // Load the cart
    let cart = JSON.parse(fs.readFileSync(path.join(__dirname, '../cart.json'), 'utf-8'));

    // Render the cart view
    res.render('cart', { cart: cart });
}
exports.postCartPage=async(req, res) => {
   const productId = req.body.productId;
    this.getProductById(productId).then(product => {
        
        addToCart(productId,product.price);
        res.redirect('/cartPage');
    });
}

// get product  by id method
exports.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(500).json({ message: 'the product with the given ID was not found!' });
    }
   return product;
}