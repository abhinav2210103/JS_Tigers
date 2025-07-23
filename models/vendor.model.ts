import mongoose from "mongoose";

export interface VendorType {
  _id?: string;
  vendorName: string;
  bankAccountNo: string;
  bankName: string;
  addressLine: string;
  city: string;
  country: string;
  pinCode: string;
}

const vendorSchema = new mongoose.Schema<VendorType>(
  {
    vendorName: { type: String, required: true },
    bankAccountNo: { type: String, required: true },
    bankName: { type: String, required: true },
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: String, required: true },
  },
  { timestamps: true }
);

const Vendor =
  mongoose.models.Vendor || mongoose.model<VendorType>("Vendor", vendorSchema);
export default Vendor;
