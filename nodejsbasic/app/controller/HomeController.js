



class HomeController{

    index(req,res){
        const user={
            name:'webskitters',
            age:20
        }
        res.render('index',{
            title:'home page',
            data:user
        })
    }
    about(req,res){
        res.render('about',{
            title:'about page'
        })
    }
    
}







module.exports=new HomeController()