const Product = require("../../models/product");
const StatusCode = require("../../utils/statusCode");

class ProductController {
  async createProduct(req, res) {
    try {
      const { productName, productPrice, desc } = req.body;

      const product = new Product({
        productName,
        productPrice,
        desc,
      });
      const data = await product.save();
      return res.status(StatusCode.CREATED).json({
        status: true,
        message: "Product created successfully",
        data: data,
      });
    } catch (err) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: "something went wrong",
        error: err,
      });
    }
  }

  async getProduct(req, res) {
    try {
      const products = await Product.find();
      return res.status(200).json({
        status: true,
        total: products.length,
        message: "Product fetched successfully",
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "something went wrong",
        error: err,
      });
    }
  }

  async getsingleProduct(req, res) {
    try {
      const id = req.params.id;
      const edit = await Product.findById(id);
      return res.status(200).json({
        status: true,
        message: "get single product",
        data: edit,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "something went wrong",
        error: err,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      //const {productName,productPrice,desc}=req.body
      await Product.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({
        status: true,
        message: "Product updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "something went wrong",
        error: err,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      await Product.findByIdAndDelete(id);
      return res.status(200).json({
        status: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "something went wrong",
        error: err,
      });
    }
  }
}

module.exports = new ProductController();
