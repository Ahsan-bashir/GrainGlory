const express=require('express');
const homeController=require('../controllers/home/homeController');
const productController=require('../controllers/product/productController');
const userController=require('../controllers/user/userController');
const categoryController=require('../controllers/category/categoryController');
const orderController=require('../controllers/order/orderController');
const routes=express.Router();

const api=process.env.API_URL || '/api/v1'

// home routes
routes.get(`/`,homeController.homepage);
routes.get(`/loginPage`,homeController.loginPage);
routes.get(`/signupPage`,homeController.signupPage);
routes.get(`/productsPage`,homeController.productsPage);
routes.get(`/cprofilePage`,homeController.cprofilePage);

// product routes 
routes.get(`/product`,productController.getProducts);
routes.get(`/product/:id`,productController.getProduct);
routes.get(`/product/get/featured/:count`,productController.getFeaturedProducts);
routes.get(`/product/get/count`,productController.getProductsCount);
routes.put(`/product/gallery-images/:id`,productController.updateProductGalleryImages);


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

// order routes
routes.get(`/order`,orderController.getOrders);
routes.get(`/order/:id`,orderController.getOrder);
routes.get(`/order/get/userorders/:userid`,orderController.getUserOrders);
routes.post(`/order`,orderController.placeOrder);
routes.put(`/order/:id`,orderController.updateOrder);
routes.delete(`/order/:id`,orderController.deleteOrder);
// sales routes
routes.get(`/order/get/totalsales`,orderController.getTotalSales);
routes.get(`/order/get/count`,orderController.getOrdersCount);


// admin routes  ---------  User -----------

routes.get(`/adminDashboard`,userController.getUsers);
routes.get(`/addUser`,userController.addUserPage);
routes.post(`/addUser`,userController.postUser);
routes.get('/viewUser/:id',userController.viewUser);
routes.get(`/editUserPage/:id`,userController.editUserPage);
routes.put(`/editUser/:id`,userController.updateUser);
routes.delete('/deleteUser/:id',userController.deleteUser);

// admin routes  ---------  User -----------

routes.get(`/getProductsPage`,productController.getProductsPage);
routes.get(`/addProductPage`,productController.addProductPage);
routes.post(`/addproduct`,productController.addProduct);
routes.get('/viewProduct/:id',productController.viewProduct);
routes.get(`/editProductPage/:id`,productController.editProductPage);
routes.put(`/editProduct/:id`,productController.updateProduct);
routes.delete(`/deleteProduct/:id`,productController.deleteProduct);


module.exports=routes;
