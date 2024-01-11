const express=require('express');
const homeController=require('../controllers/home/homeController');
const productController=require('../controllers/product/productController');
const userController=require('../controllers/user/userController');

const routes=express.Router();

const api=process.env.API_URL || '/api/v1'

// home routes
routes.get(`/`,homeController.homepage);
routes.get(`/loginPage`,homeController.loginPage);
routes.get(`/signupPage`,homeController.signupPage);

// product routes 
routes.get(`/products`,productController.productsPage);
routes.post(`/product`,productController.addProduct);


// User routes
routes.post(`/user`,userController.addUser);
routes.get(`/user/:id`,userController.getUser);
routes.post(`/user/login`,userController.loginUser);
module.exports=routes;
