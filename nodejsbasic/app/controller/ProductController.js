


const Product=require('../models/product')

class ProductController {
    

    async addView(req,res){
        res.render('product/add')
    }
    async createProduct(req,res){
       try{
        const {productName,productPrice,desc}=req.body


        const data=new Product({
            productName,
            productPrice,
            desc
        })
       const result= await data.save()
       if(result){
        console.log(result)

        res.redirect('/list')
       }else{
           console.log('something went wrong')
           return res.redirect('/add')
       }
       }catch(err){
           console.log(err)
       }
    }
    async listView(req,res){
        try{
            const products=await Product.find()
            return res.render('product/list',{
                data:products
            })
        }catch(error){
             console.log(error)
        }
       
    }
}




module.exports = new ProductController();   