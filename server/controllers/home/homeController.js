exports.homepage =(req,res)=>{
    try {
       res.render('index');
        
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

exports.products =(_, res) => {
  try {
    console.log("in products");
    console.log("-------------");
    res.render('products/products');
    console.log('after products');
  } catch (error) {
    // Handle errors, e.g., file not found
    console.error(error);
    res.status(500).send("Can't find products.ejs file");
  }
}


