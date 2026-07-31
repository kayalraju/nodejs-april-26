
const Category=require('../models/category')
const SubCategory=require('../models/subcategory')



class LookupController {
    async createCategory(req, res) {
       try {
      const data = await Category.create(req.body);
      return res.status(200).json({
        message: "Category created successfully",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
    }
    }
    async allCategory(req, res) {
       try {
      const data = await Category.find();
      return res.status(200).json({
        message: "Category fetch successfully",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
    }
    }
    async createsubCategory(req, res) {
       try {
      const data = await SubCategory.create(req.body);
      return res.status(200).json({
        message: "subCategory fetch successfully",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
    }
    }

        async allsubCategory(req, res) {
       try {
      const data = await SubCategory.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
            // pipeline: [
            //   {
            //    $lookup: {
            //      from: "subcategories",
            //      localField: "_id",
            //      foreignField: "categoryId",
            //      as: "subCategory",
            //    }
            //   },
            // ],
          },
        },
    //    {
    //         $project: {
    //           subCategoryName: 1,
    //           categoryName: "$category.categoryName",
    //         },
    //     }
        // {
        //   $unwind: "$category",
        // },

        // {
        //     $group:{
        //         _id:"$subCategoryName",
        //         subCategoryName:{$first:"$subCategoryName"},
        //         categoryName:{$first:"$category.categoryName"},
        //     }
        // }


        {
          $group: {
            _id: "$category.categoryName",
            subCategories: {
              $push: {
                subCategoryName: "$subCategoryName",
                categoryName: "$category.categoryName",
              },
            },
            total: {
              $sum: 1,
            },
          },
        },
      ]);
      return res.status(200).json({
        message: "Sub-category fetch successfully",
        toatal:data.length,
        data: data,
        
      });
    } catch (error) {
      console.log(error.message);
    }
    }


}

module.exports = new LookupController