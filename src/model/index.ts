import { Schema, model } from "mongoose";
import mongoose from "mongoose";

export async function connectToDatabase() {
    await mongoose.connect(String(process.env.mongo_uri));
    console.log("Database connection successfully established!\n");
}

export async function closeDatabaseConnection() {
    await mongoose.disconnect();
    console.log("Database connection successfully closed!\n");
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    age: number;
    phoneNumber: string
}

export const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
})

export const User = model<IUser>('User', userSchema);