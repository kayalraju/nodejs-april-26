require('dotenv').config()
const express=require('express');
const ejs=require('ejs');
const ConnectDB=require('./app/config/db')
const path=require('path')


ConnectDB();
const app=express();



//setup ejs
app.set('view engine','ejs');
app.set('views','views')

//static folder
app.use(express.static('public'))
app.use('uploads',express.static(path.join(__dirname,'/uploads')))
app.use('/uploads',express.static('uploads'))

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//define routes

const homeRoute=require('./app/routes/homeRoutes')
app.use(homeRoute)
const productRoute=require('./app/routes/api/productRoute')
app.use('/api',productRoute)





const PORT=process.env.PORT


app.listen(PORT,(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("server is running on port ",`http://localhost:${PORT}`);
    }
})