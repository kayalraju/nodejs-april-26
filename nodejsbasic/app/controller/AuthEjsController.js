const User = require("../models/user");
const brctpyjs = require("bcryptjs");
const jwt = require("jsonwebtoken");




class AuthEjsController {
    dashboard(req, res) {
        return res.render("dashboard",{
            data:req.user
        });
    }
    login(req, res) {
        return res.render("login");
    }
    register(req, res) {
        return res.render("register");
    }

    async registerstore(req,res){
        try {
              const { name, email, phone, password } = req.body;
              if (!name || !email || !phone || !password) {
                console.log('all filed is required');
                return res.redirect('/register')
              }
              const userExist = await User.findOne({ email });
              if (userExist) {
                 console.log('user already exist');
               return res.redirect('/register')
              }
        
              const salt = await brctpyjs.genSalt(10);
              const hashPassword = await brctpyjs.hash(password, salt);
        
              const userdata = new User({
                name,
                email,
                phone,
                password: hashPassword,
              });
        
              const data = await userdata.save();
              if(data){
                console.log(data);
                return res.redirect('/login')
              }
            } catch (error) {
              console.log(error.message);
              
            }
    }



    async loginstore(req,res){
        try{
            const {email,password}=req.body
            if(!email||!password){
                console.log('all filed is required');
                return res.redirect('/login')
            }
            const userExist=await User.findOne({email})
            console.log(userExist);
            if(!userExist){
                console.log('user does not exist');
                return res.redirect('/login')
            }
            const isMatch=await brctpyjs.compare(password,userExist.password)
            if(!isMatch){
                console.log('invalid credentials');
                return res.redirect('/login')
            }
            if(isMatch && userExist.role=='user'){
                //create token
                const Token=await jwt.sign({
                    id:userExist._id,
                    name:userExist.name,
                    email:userExist.email,
                    role:userExist.role
                },process.env.JWT_SECRET,{expiresIn:'1d'})
               

                if(Token){
                     res.cookie('token',Token,{maxAge: 86400000, httpOnly: true });
                    return res.redirect('/dashboard')
                }else{
                    console.log('something went wrong');
                    return res.redirect('/login')
                }
               
                
            }
            console.log('logon failed');
            return res.redirect('/login')

        }catch(error){
            console.log(error.message)
        }
    }


    async logout(req,res){
        res.clearCookie('token')
        return res.redirect('/login')
    }
}
module.exports = new AuthEjsController();