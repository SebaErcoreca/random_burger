import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import paginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    thumbnail: {
        type: String,
        required: true,
        default: "https://images.unsplash.com/photo-1584178639036-613ba57e5e39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    }
  },
  {
    timestamps: true,
  },
);

productSchema.plugin(paginate);
productSchema.plugin(mongooseDelete, { deletedAt: true });

const ProductModel = mongoose.model("Products", productSchema);

export default ProductModel;