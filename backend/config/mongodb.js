import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Connection events
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });

        // Connect with options
        await mongoose.connect(`${process.env.MONGODB_URI}/docspot`, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;
