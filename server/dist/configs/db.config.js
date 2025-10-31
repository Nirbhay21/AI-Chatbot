import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME || "test"
        });
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
export default connectDB;
//# sourceMappingURL=db.config.js.map