const express=require('express');
const homeController=require('../controllers/home/homeController');
const productController=require('../controllers/product/productController');

const routes=express.Router();

const api=process.env.API_URL || '/api/v1'

// home routes
routes.get(`/`,homeController.homepage);
routes.get(`/login`,homeController.loginPage);
routes.get(`/signup`,homeController.signupPage);

// product routes
routes.get(`/products`,productController.productsPage);
routes.post(`/product`,productController.addProduct);

module.exports=routes;
