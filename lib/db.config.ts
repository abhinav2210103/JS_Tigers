import mongoose from "mongoose";
import "server-only";
import { NextResponse } from "next/server";

const DB_URI = process.env.DB_URI as string;

export default async function connectDB() {
  try {
    await mongoose.connect(DB_URI);
    return NextResponse.json({ message: "MongoDB Connected" });
  } catch (error) {
    if (error instanceof Error)
      console.error("Database connection error:", error.message);
    console.log("Error connecting to the database", error);
  }
}
