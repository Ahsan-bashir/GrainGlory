const express=require('express');
const homeController=require('../controllers/home/homeController');
const productController=require('../controllers/product/productController');
const userController=require('../controllers/user/userController');
const categoryController=require('../controllers/category/categoryController');

const routes=express.Router();

const api=process.env.API_URL || '/api/v1'

// home routes
routes.get(`/`,homeController.homepage);
routes.get(`/loginPage`,homeController.loginPage);
routes.get(`/signupPage`,homeController.signupPage);
routes.get(`/productsPage`,homeController.productsPage);

// product routes 
routes.get(`/product`,productController.getProducts);
routes.get(`/product/:id`,productController.getProduct);
routes.get(`/product/get/featured/:count`,productController.getFeaturedProducts);
routes.get(`/product/get/count`,productController.getProductsCount);
routes.post(`/product`,productController.addProduct);
routes.put(`/product/:id`,productController.updateProduct);
routes.delete(`/product/:id`,productController.deleteProduct);


// User routes
routes.post(`/user/register`,userController.registerUser);
routes.post(`/user/login`,userController.loginUser);

routes.get(`/user/:id`,userController.getUser);

// category routes
routes.get(`/category`,categoryController.getCategories);
routes.get(`/category/:id`,categoryController.getCategory);
routes.post(`/category`,categoryController.addCategory);
routes.put(`/category/:id`,categoryController.updateCategory);
routes.delete(`/category/:id`,categoryController.deleteCategory);

module.exports=routes;
