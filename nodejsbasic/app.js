const express=require('express');




const app=express();



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