import mongoose from "mongoose";
import type { Document, InferSchemaType } from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: String, required: true },
  amount: { type: Number, required: true },
  credits: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });

export type TransactionDocument = InferSchemaType<typeof transactionSchema> & Document & {
  _id: mongoose.Types.ObjectId;
};

const Transaction = mongoose.model<TransactionDocument>("Transaction", transactionSchema);

export default Transaction;