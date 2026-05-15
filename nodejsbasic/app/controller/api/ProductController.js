const Product=require('../../models/product');



class ProductController{
    async createProduct(req,res){
      try{
        const {productName,productPrice,desc}=req.body;

        const product= new Product({
            productName,
            productPrice,
            desc
        })
        const data=await product.save();
        return res.status(201).json({
            status:true,
            message:"Product created successfully",
            data:data
        })
     

      }catch(err){
        return res.status(500).json({
            status:false,
            message:"something went wrong",
            error:err
        })
      }
    }

    async getProduct(req,res){
        try{

            const products=await Product.find();
            return res.status(200).json({
                status:true,
                total:products.length,
                message:"Product fetched successfully",
                data:products
            })

        }catch(error){
            return res.status(500).json({
                status:false,
                message:"something went wrong",
                error:err
            })
        }

    }

}

module.exports=new ProductController();