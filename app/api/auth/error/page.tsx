// app/auth/error/page.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center text-red-600">
      <p>Something went wrong: {error}</p>
    </div>
  );
}
