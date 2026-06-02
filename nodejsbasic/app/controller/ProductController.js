


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
    async editView(req,res){
        try{
            const id=req.params.id
            const product=await Product.findById(id)
            return res.render('product/edit',{
                data:product
            })
        }catch(error){
             console.log(error)
        }
       
    }
    async update(req,res){
        try{
            const id=req.params.id
            const product=await Product.findByIdAndUpdate(id,req.body,{new:true})
            return res.redirect('/list')
        }catch(error){
             console.log(error)
        }
       
    }

    async delete(req,res){
        try{
            const id=req.params.id
            const product=await Product.findByIdAndDelete(id)
            return res.redirect('/list')
        }catch(error){
             console.log(error)
        }
       
    }
}




module.exports = new ProductController();   