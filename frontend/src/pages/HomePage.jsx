import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import { PlusCircleIcon, RefreshCcwDotIcon } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/product/getAll");
      if (res.data.success) setProducts(res.data.products);
      else toast.error("Failed to fetch products");
    } catch (err) {
      toast.error("Failed to fetch products");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product handler
  const addProduct = async (productData) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/product/create",
        productData
      );
      if (res.data.success) {
        toast.success("Product added successfully!");
        setShowAddModal(false);
        fetchProducts();
      } else toast.error("Failed to add product");
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

  // Update product handler
  const refreshProducts = () => fetchProducts();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button
          className="btn btn-primary flex items-center"
          onClick={() => setShowAddModal(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Add Product
        </button>

        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCcwDotIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddProductModal
          addProduct={addProduct}
          closeModal={() => setShowAddModal(false)}
        />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          closeModal={() => setEditingProduct(null)}
          refreshProducts={refreshProducts}
        />
      )}

      {/* Products */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id || product._id}
              product={product}
              onEdit={() => setEditingProduct(product)}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
