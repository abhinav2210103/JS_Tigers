"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <button
        onClick={() => signIn("google", { callbackUrl: "/main" })}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Continue with Google
      </button>
    </div>
  );
}
