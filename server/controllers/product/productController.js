const Product = require("../../models/product/product");

exports.productsPage =(_, res) => {
    try {
      res.render('products/products');
    } catch (error) {
      // Handle errors, e.g., file not found
      console.error(error);
      res.status(500).send("Can't find products.ejs file");
    }
  }


exports.addProduct = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if product with the same name already exists
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ error: "Product already exists" });
        }
        const product = new Product({
            name: "IRRI-1",
            price: 25000,
            description: "IRRI-1 is very good",
            rich_description: "IRRI-1 is very good",
            image: "IRRI-1 is very good",
            countInStock: 76,
            isFeatured: true,
        });

        product.save().then((createdProduct) => {
            res.status(201).json(createdProduct);
            console.log("Product created");
        }).catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};
