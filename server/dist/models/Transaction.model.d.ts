import mongoose from "mongoose";
import type { Document, InferSchemaType } from "mongoose";
declare const transactionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    credits: number;
    userId: mongoose.Types.ObjectId;
    planId: string;
    amount: number;
    isPaid: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    credits: number;
    userId: mongoose.Types.ObjectId;
    planId: string;
    amount: number;
    isPaid: boolean;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    credits: number;
    userId: mongoose.Types.ObjectId;
    planId: string;
    amount: number;
    isPaid: boolean;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type TransactionDocument = InferSchemaType<typeof transactionSchema> & Document & {
    _id: mongoose.Types.ObjectId;
};
declare const Transaction: mongoose.Model<TransactionDocument, {}, {}, {}, mongoose.Document<unknown, {}, TransactionDocument, {}, {}> & {
    credits: number;
    userId: mongoose.Types.ObjectId;
    planId: string;
    amount: number;
    isPaid: boolean;
} & mongoose.DefaultTimestampProps & mongoose.Document<unknown, any, any, Record<string, any>, {}> & {
    _id: mongoose.Types.ObjectId;
} & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Transaction;
//# sourceMappingURL=Transaction.model.d.ts.map