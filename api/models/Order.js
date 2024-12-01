const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        productName: {
          type: String, required: true, unique: true
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    name:{type: String},
    phone: {type: Number},
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
    payment:  {type: String },
    customer:  {type: String, default: "check" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);