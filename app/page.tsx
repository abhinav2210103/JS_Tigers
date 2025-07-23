"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      {session ? (
        <>
          <p className="cursor-pointer border border-white">Welcome {session.user?.name}</p>
          <button onClick={() => signOut()} className="cursor-pointer border border-white">Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn("google")} className="cursor-pointer border border-white">Sign in with Google</button>
      )}
    </div>
  );
}
