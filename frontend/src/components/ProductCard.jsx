import React from "react";
import { EditIcon, Trash2Icon } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductCard = ({ product, onEdit, refreshProducts }) => {
  if (!product) return null;

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/product/delete/${id}`
      );
      if (res.data.success) {
        refreshProducts();
        toast.success("Item deleted Successfully!!!");
      }
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative pt-[56.25%]">
        <img
          src={product.image || "https://via.placeholder.com/300x200"}
          alt={product.name || "Product Image"}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-2xl font-bold text-primary">
          ${product.price ? Number(product.price).toFixed(2) : "0.00"}
        </p>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm btn-info btn-outline" onClick={onEdit}>
            <EditIcon className="w-4 h-4" />
          </button>

          <button
            className="btn btn-sm btn-error btn-outline"
            onClick={() => deleteItem(product.id || product._id)}
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
