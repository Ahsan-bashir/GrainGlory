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




