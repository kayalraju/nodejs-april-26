const express=require('express');
const ejs=require('ejs');




const app=express();

//setup ejs
app.set('view engine','ejs');
app.set('views','views')

//static folder
app.use(express.static('public'))

//define routes

const homeRoute=require('./app/routes/homeRoutes')

app.use(homeRoute)




const PORT=3006

app.listen(PORT,(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("server is running on port ",`http://localhost:${PORT}`);
    }
})