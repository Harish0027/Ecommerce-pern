const express = require("express");
const ProductController = require("../controllers/ProductController");

const ProductRouter = express.Router();

ProductRouter.get("/getAll", ProductController.getAllProducts);
ProductRouter.get("/get/:id", ProductController.getProduct);
ProductRouter.post("/create", ProductController.createProduct);
ProductRouter.put("/update/:id", ProductController.updateProduct);
ProductRouter.delete("/delete/:id", ProductController.deleteProduct);

module.exports = ProductRouter;
