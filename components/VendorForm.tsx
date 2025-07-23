'use client';

import { useState } from "react";
import { VendorType } from "@/models/vendor.model";

export default function VendorForm({
  vendor,
  onClose,
  onSave,
}: {
  vendor: VendorType | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState<VendorType>(
    vendor || {
      vendorName: "",
      bankAccount: "",
      bankName: "",
      addressLine: "",
      city: "",
      country: "",
      pinCode: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async () => {
    const method = vendor ? "PUT" : "POST";
    const url = vendor
      ? `/api/vendor/edit/${vendor._id}`
      : "/api/vendor/create";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        onSave();
      } else {
        const error = await res.json();
        console.error("Failed to save vendor:", error.message);
      }
    } catch (err) {
      console.error("Error submitting vendor form:", err);
    }
  };

  const fields = [
    "vendorName",
    "bankAccount",
    "bankName",
    "addressLine",
    "city",
    "country",
    "pinCode",
  ];

  return (
    <div className="fixed inset-0 bg-white text-black flex justify-center items-start pt-20">
      <div className="w-full max-w-md p-4 border border-gray-300 bg-white space-y-3">
        <h2 className="text-lg font-semibold">
          {vendor ? "Edit Vendor Details" : "Add New Vendor"}
        </h2>

        {fields.map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="text-sm capitalize mb-1">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              id={field}
              name={field}
              value={(form as any)[field]}
              onChange={handleChange}
              className="border px-2 py-1"
              required
            />
          </div>
        ))}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            className="border px-3 py-1 text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="border px-3 py-1 bg-gray-100 text-sm"
            onClick={handleSubmit}
          >
            {vendor ? "Update Vendor" : "Create Vendor"}
          </button>
        </div>
      </div>
    </div>
  );
}
