const express=require('express')
const path=require('path')
const methodOverride = require('method-override');
const connectDB=require('./server/config/db')

require('dotenv').config()

const app=express()
const port = process.env.PORT || 5000
const api=process.env.API_URL || '/api/v1'
//database connection
connectDB();

//To pass data through forms + parse links and json data etc
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

//Templating Engine
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

// Use the layout middleware
// app.use(expressLayouts);
// app.set("layout", "index");

//static files
app.use('/assets',express.static('assets'))

// root route
app.use(`/`,require('./server/routes/routes'))
// listen on port 5000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

