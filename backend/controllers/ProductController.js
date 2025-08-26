const sql = require("../config/db");

const ProductController = {
  // GET all products
  getAllProducts: async (req, res) => {
    try {
      const products = await sql`
        SELECT * FROM PRODUCTS
        ORDER BY CREATED_AT DESC
      `;
      res.status(200).json({ success: true, products });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET single product by id
  getProduct: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "Product ID is required" });
      }

      const product = await sql`
        SELECT * FROM PRODUCTS
        WHERE ID = ${id}
      `;

      if (product.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      res.status(200).json({ success: true, product: product[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // CREATE new product
  createProduct: async (req, res) => {
    try {
      const { name, image, price } = req.body;

      if (!name || !image || !price) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required!!!" });
      }

      const newProduct = await sql`
        INSERT INTO PRODUCTS (NAME, IMAGE, PRICE)
        VALUES (${name}, ${image}, ${price})
        RETURNING *
      `;

      res.status(201).json({ success: true, product: newProduct[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // UPDATE product
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, image, price } = req.body;

      const updatedProduct = await sql`
        UPDATE PRODUCTS
        SET NAME = COALESCE(${name}, NAME),
            IMAGE = COALESCE(${image}, IMAGE),
            PRICE = COALESCE(${price}, PRICE)
        WHERE ID = ${id}
        RETURNING *
      `;

      if (updatedProduct.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      res.status(200).json({ success: true, product: updatedProduct[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE product
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedProduct = await sql`
      DELETE FROM PRODUCTS
      WHERE ID = ${id}
      RETURNING *
    `;

      if (deletedProduct.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res
        .status(500)
        .json({ success: false, message: "Error deleting product" });
    }
  },
};

module.exports = ProductController;
