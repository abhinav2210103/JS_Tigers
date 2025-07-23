"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-white text-black flex items-center justify-center flex-col px-4">
      {session && (
        <button
          onClick={() => signOut()}
          className="absolute top-4 right-4 text-sm cursor-pointer border-2 px-4 py-2 rounded-lg shadow transition"
        >
          Sign out
        </button>
      )}

      {session ? (
        <>
          <p className="border-black p-2 border-2 rounded-2xl mb-6">
            Welcome {session.user?.name}
          </p>
          <button
            onClick={() => router.push("/main")}
            className="cursor-pointer border-black p-2 border-2 rounded-2xl mt-6"
          >
            Go to Main Page
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => signIn("google")}
            className="cursor-pointer border-2 border-black p-2 rounded-2xl "
          >
            Sign in with Google
          </button>
          <button
            onClick={() => router.push("/main")}
            className="cursor-pointer border-black p-2 border-2 rounded-2xl mt-6"
          >
            Go to Main Page
          </button>
        </>
      )}
    </div>
  );
}
