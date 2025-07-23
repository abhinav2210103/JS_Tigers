import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db.config";
import Vendor from "@/models/vendor.model";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Vendor ID is required." },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Please log in to update a vendor." },
        { status: 401 }
      );
    }

    const updateData = await req.json();

    await connectDB();

    const vendor = await Vendor.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!vendor) {
      return NextResponse.json(
        { message: "Vendor not found. Nothing was updated." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Vendor updated successfully.",
      vendor,
    });
  } catch (err: unknown) {
    console.error("Something went wrong while updating vendor:", err);

    return NextResponse.json(
      {
        message:
          err instanceof Error
            ? err.message
            : "Unable to update vendor at the moment.",
      },
      { status: 500 }
    );
  }
}
