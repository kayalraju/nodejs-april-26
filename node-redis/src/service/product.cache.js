const {
  getCache,
  setCache,
  deleteCache,
} = require("../utils/redis.cache");

const PRODUCT_CACHE_KEY = "products:all";

const getProductsCache = async () => {
  return await getCache(PRODUCT_CACHE_KEY);
};

const setProductsCache = async (products) => {
  return await setCache(
    PRODUCT_CACHE_KEY,
    products,
    300
  );
};

const clearProductsCache = async () => {
  return await deleteCache(PRODUCT_CACHE_KEY);
};



module.exports = {
  getProductsCache,
  setProductsCache,
  clearProductsCache,
};
