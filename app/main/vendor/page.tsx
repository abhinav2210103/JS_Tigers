"use client";

import { useEffect, useState, useCallback } from "react";
import { VendorType } from "@/models/vendor.model";
import VendorForm from "@/components/VendorForm";

export default function VendorsPage() {
  const [vendors, setVendors] = useState<VendorType[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const [selectedVendor, setSelectedVendor] = useState<VendorType | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchVendorList = useCallback(async () => {
    try {
      const res = await fetch(`/api/vendor/get?page=${page}&limit=${limit}`);
      const data = await res.json();
      setVendors(data.vendors || []);
      setTotal(data.total || 0);
    } catch (err: unknown) {
      console.error("Failed to fetch vendors:", err);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchVendorList();
  }, [fetchVendorList]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/vendor/delete/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchVendorList();
      } else {
        const error = await res.json();
        alert(error.message || "Failed to delete vendor.");
      }
    } catch (err: unknown) {
      console.error("Error deleting vendor:", err);
    }
  };

  return (
    <div className="p-4 mx-auto bg-white text-black min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Vendors</h1>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => {
            setSelectedVendor(null);
            setShowForm(true);
          }}
        >
          + Create Vendor
        </button>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Vendor Name</th>
            <th className="border px-2 py-1">Account No.</th>
            <th className="border px-2 py-1">Bank</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No vendors found.
              </td>
            </tr>
          ) : (
            vendors.map((vendor) => (
              <tr key={vendor._id}>
                <td className="border px-2 py-1">{vendor.vendorName}</td>
                <td className="border px-2 py-1">{vendor.bankAccount}</td>
                <td className="border px-2 py-1">{vendor.bankName}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    className="px-2 py-1 border rounded text-blue-600"
                    onClick={() => {
                      setSelectedVendor(vendor);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 border rounded text-red-600"
                    onClick={() => {
                      if (vendor._id) handleDelete(vendor._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-end items-center mt-4 gap-2">
        <button
          className="px-3 py-1 border rounded"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>{page}</span>
        <button
          className="px-3 py-1 border rounded"
          disabled={page * limit >= total}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {showForm && (
        <VendorForm
          vendor={selectedVendor}
          onClose={() => setShowForm(false)}
          onSave={() => {
            fetchVendorList();
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}
