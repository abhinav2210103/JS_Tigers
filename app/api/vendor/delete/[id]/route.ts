import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db.config";
import Vendor from "@/models/vendor.model";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }

    await connectDB();

    const vendor = await Vendor.findByIdAndDelete(params.id);

    if (!vendor) {
      return NextResponse.json(
        { message: "Vendor not found with the provided ID." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Vendor deleted successfully." });
  } catch (err: any) {
    console.error("Failed to delete vendor:", err);

    return NextResponse.json(
      {
        message:
          err?.message ||
          "An unexpected error occurred while deleting the vendor.",
      },
      { status: 500 }
    );
  }
}
