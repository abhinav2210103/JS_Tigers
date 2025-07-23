"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => signIn("google", { callbackUrl: "/main" })}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Continue with Google
      </button>
    </div>
  );
}
