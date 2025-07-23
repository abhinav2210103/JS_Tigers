import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db.config";
import Vendor from "@/models/vendor.model";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Not authorized. Please log in." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    await connectDB();
    const vendorsList = await Vendor.find().skip(skip).limit(limit);
    const totalCount = await Vendor.countDocuments();

    return NextResponse.json({
      vendors: vendorsList,
      total: totalCount,
    });
  } catch (err: unknown) {
    console.error("Error while fetching vendors:", err);

    return NextResponse.json(
      {
        message: (err as Error)?.message || "Something went wrong while fetching vendors.",
      },
      { status: 500 }
    );
  }
}
