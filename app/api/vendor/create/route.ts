import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db.config";
import Vendor from "@/models/vendor.model";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "You must be signed in to perform this action." },
        { status: 401 }
      );
    }

    const body = await req.json();

    await connectDB();

    const vendor = await Vendor.create(body);

    return NextResponse.json({
      message: "Vendor created successfully.",
      vendor,
    });
  } catch (err: unknown) {
    console.error("Failed to create vendor:", err);

    return NextResponse.json(
      {
        message:
          err instanceof Error
            ? err.message
            : "Server ran into an issue while creating vendor.",
      },
      { status: 500 }
    );
  }
}
