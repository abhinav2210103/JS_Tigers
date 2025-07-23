import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db.config";
import Vendor from "@/models/vendor.model";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Vendor ID is required" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }

    await connectDB();

    const vendor = await Vendor.findByIdAndDelete(id);

    if (!vendor) {
      return NextResponse.json(
        { message: "Vendor not found with the provided ID." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Vendor deleted successfully." });
  } catch (err: unknown) {
    console.error("Failed to delete vendor:", err);

    return NextResponse.json(
      {
        message:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while deleting the vendor.",
      },
      { status: 500 }
    );
  }
}
