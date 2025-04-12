import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Settings() {
  const session = await getServerSession(options);

  console.log(session);

  if (!session?.user) {
    redirect("/login"); // Redirect if not logged in
  }

  return (
    <div className="min-h-screen bg-[#fffbea] flex items-center justify-center">
      <div className="bg-[#ffd230] text-black rounded-2xl shadow-lg p-10 w-full max-w-md text-center space-y-4">
        <h1 className="text-3xl font-bold">
          Welcome, {session.user?.name || "User"}!
        </h1>
        <div className="relative w-30 h-30 m-auto">
          <Image
            src={
              session.user.image ||
              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt="Profile"
            fill
            priority
            className="w-24 h-24 rounded-full mx-auto border-4 border-white mt-4"
          />
        </div>
        <p className="text-lg mt-5">Email: {session.user?.email}</p>
      </div>
    </div>
  );
}
