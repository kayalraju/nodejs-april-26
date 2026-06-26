require('dotenv').config()
const express=require('express');
const ejs=require('ejs');
const ConnectDB=require('./app/config/db')
const path=require('path')
const cors=require('cors')
const Session=require('express-session')
const cookieParser=require('cookie-parser')
const connectflash=require('connect-flash')
const helmat=require('helmet')
const Limit=require('./app/utils/limite')
const morgan=require('morgan')


ConnectDB();
const app=express();

//cors
app.use(cors())

//helmat
app.use(helmat())

//ratelimit\

app.use(Limit)

app.use(morgan('dev'))
app.use(Session({
    secret:process.env.SESSION_SECRECT || "secrect",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24 //1 day
    }
}))

app.use(cookieParser())

//for flash message
app.use(connectflash())
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

const employeeRoute=require('./app/routes/api/employeeRoute')
app.use('/api',employeeRoute)

const authRoute=require('./app/routes/api/authRoute')
app.use('/api',authRoute)

const AuthEjsRoute=require('./app/routes/authEjsRouter')
app.use(AuthEjsRoute)

const PORT=process.env.PORT


app.listen(PORT,(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("server is running on port ",`http://localhost:${PORT}`);
    }
})

