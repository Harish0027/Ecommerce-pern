import React, { useState, useEffect } from "react";
import { Package2Icon, ImageIcon, DollarSignIcon } from "lucide-react";
import axios from "axios";

const EditProductModal = ({ product, closeModal, refreshProducts }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  // Pre-fill form fields with product data
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setImageUrl(product.image || "");
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:4000/api/product/update/${product.id}`,
        { name, price, image: imageUrl }
      );

      if (res.data.success) {
        refreshProducts(); // refresh product list
        closeModal();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* LEFT: IMAGE PREVIEW */}
        <div className="md:w-1/2 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
          <img
            src={imageUrl || "https://via.placeholder.com/300x200"}
            alt="Preview"
            className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-inner"
          />
        </div>

        {/* RIGHT: FORM */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center space-y-5">
          <button
            className="self-end text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            onClick={closeModal}
          >
            ✕
          </button>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center md:text-left">
            Edit Product
          </h3>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Product Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Package2Icon className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                  required
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Image URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <input
                  type="url"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                  required
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <DollarSignIcon className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  placeholder="Enter product price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
