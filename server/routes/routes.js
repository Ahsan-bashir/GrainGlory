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
routes.get(`/productsPage`,homeController.productsPage);

// product routes 
routes.post(`/product`,productController.addProduct);


// User routes
routes.post(`/user/register`,userController.registerUser);
routes.post(`/user/login`,userController.loginUser);

routes.get(`/user/:id`,userController.getUser);


module.exports=routes;
