const {Product}=require('../models/index')


class ProductController{

    async getProduct(req,res){
        try{
            const product=await Product.findAll()
            return res.status(200).json({
                data:product
            })
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    }
    async storeProduct(req,res){
       try{
        const {name,price,description}=req.body
        const product=await Product.create({name,price,description})
        return res.status(201).json({
            message:'Product created successfully',
            data:product
        })

       }catch(error){
        return res.status(500).json({message:error.message})
       }
    }

}




module.exports=new ProductController()