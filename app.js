const express=require('express')
const app=express()
const path=require('path')
const port = process.env.PORT || 5000

//Templating Engine
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
//static files
app.use('/assets',express.static('assets'))

//routes
app.get('/',(req,res)=>{
    res.render('index',{})
})
// listen on port 5000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

