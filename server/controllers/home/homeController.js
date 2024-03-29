const Product=require('../../models/product/product')
exports.homepage =async (req,res)=>{
    try {
      await req.flash('info','')
      console.log("In home controller");
      return res.render('index', { messages: req.flash() });
      } catch (error) {
        // Handle errors, e.g., file not found
        console.error(error);
        res.status(500).send("Can't find index.ejs file");
      }
}

exports.loginPage =(_, res) => {
  try {
    res.render('forms/login');
  } catch (error) {
    // Handle errors, e.g., file not found
    console.error(error);
    res.status(500).send("Can't find login.ejs file");
  }
}


exports.signupPage =(_, res) => {
  try {
    res.render('forms/signup');
  } catch (error) {
    // Handle errors, e.g., file not found
    console.error(error);
    res.status(500).send("Can't find login.ejs file");
  }
}

exports.productsPage =(_, res) => {
  try {
    res.render('products/products');
  } catch (error) {
    // Handle errors, e.g., file not found
    console.error(error);
    res.status(500).send("Can't find products.ejs file");
  }
}
exports.cprofilePage =(_, res) => {
  try {
    res.render('cprofile/cprofile');
  } catch (error) {
    // Handle errors, e.g., file not found
    console.error(error);
    res.status(500).send("Can't find Cprofile.ejs file");
  }
}
exports.bPackagingPage =(_, res) => {
  try {
    res.render('branding_packaging/packaging');
  } catch (error) {
    // Handle errors, e.g., file not found
    console.error(error);
    res.status(500).send("Can't find brandingpackaging.ejs file");
  }
}
exports.skBasmatiPage = (req, res) => {
  // Replace 'super-kernel-basmati-rice' with the actual product identifier
  Product.findOne({ name: 'basmati' })
    .then(product => {
      if (!product) {
        // Handle the case when the product is not found
        return res.status(404).send('Product not found');
      }

      res.render('products/categories/skBasmati', { product: product });
    })
    .catch(error => {
      // Handle errors, e.g., database error
      console.error(error);
      res.status(500).send("Can't find skBasmatiPage.ejs file");
    });
};
exports.contactPage =(_, res) => {
  try {
    res.render('contact/contact');
  } catch (error) {
    // Handle errors, e.g., file not found
    console.error(error);
    res.status(500).send("Can't find contact.ejs file");
  }
}




