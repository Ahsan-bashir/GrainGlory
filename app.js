const express=require('express')
const path=require('path')
const methodOverride = require('method-override');
const flash=require('connect-flash')
const session = require('express-session');
const connectDB=require('./server/config/db')
const authJwt=require('./server/helpers/jwt')

require('dotenv').config()

const app=express()
const port = process.env.PORT || 5000
const api=process.env.API_URL || '/api/v1'
//database connection
connectDB();

//To pass data through forms + parse links and json data etc
app.use(express.urlencoded({ extended: true }));
// convert to json data 
app.use(express.json());
app.use(methodOverride('_method'))
app.use(authJwt());  

//Templating Engine
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

// Use the layout middleware
// app.use(expressLayouts);
// app.set("layout", "index");

//static files
app.use('/assets',express.static('assets'))

// Express Session
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized:true,
        cookie: { maxAge: 60 * 60 * 24 * 7 } // 1 week

    })
)

// Flash Message 
app.use(flash());

// root route
app.use(`/`,require('./server/routes/routes'))
// listen on port 5000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

