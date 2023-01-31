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