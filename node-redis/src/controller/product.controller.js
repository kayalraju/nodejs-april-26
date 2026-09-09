const Product = require("../models/product.model");
const { clearProductsCache, getProductsCache, setProductsCache } = require("../service/product.cache");
const generateProductSlug = require("../utils/generate.slug");

class ProductController {
  async getProduct(req, res) {
    try {
      const cachedProducts = await getProductsCache();
      if (cachedProducts) {
        return res.status(200).json({
          success: true,
          source: "redis",
          products: cachedProducts,
        });
      }
      const products = await Product.find().sort({ createdAt: -1 }).lean();

      await setProductsCache(products);

      return res.status(200).json({
        success: true,
        source: "mongodb",
        products,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async CreateProduct(req, res) {
    try {
      const { name, description, category, price } = req.body;
      const duplicateProduct = await Product.findOne({ name });
      if (duplicateProduct) {
        return res.status(400).json({
          success: false,
          message: "Product with this name already exists",
        });
      }
      //create slug
      const slug = generateProductSlug(name, category);

      const product = new Product({
        name,
        description,
        category,
        price: Number(price),
        slug,
      });
      const productCreate = await product.save();
      //Redis Product list/cache is now outdated.
      // Delete Redis cache AFTER successful DB save.
      await clearProductsCache();
      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: productCreate,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getsingleProduct(req, res) {
    try {
      const product = await Product.findOne({ slug: req.params.slug }).lean();
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      return res.status(200).json({
        success: true,
        product,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new ProductController();
