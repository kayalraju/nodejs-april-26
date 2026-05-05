



class HomeController{

    index(req,res){
        res.send("<h1>This is a Home page</h1>")
    }
    
}







module.exports=new HomeController()