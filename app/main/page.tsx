import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function MainPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-6 bg-white text-black">
      <h1>Welcome, {session?.user?.name}</h1>
      <p>You are now on a protected route.</p>
    </div>
  );
}
