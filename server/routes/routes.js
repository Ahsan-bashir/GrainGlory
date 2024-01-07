const express=require('express');
const routes=express.Router();
const homeController=require('../controllers/home/homeController');
// home routes
routes.get('/',homeController.homepage);
routes.get('/login',homeController.loginPage);
routes.get('/signup',homeController.signupPage);
// product routes
routes.get('/products',homeController.products);

module.exports=routes;
