"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

const LoginM = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError("Invalid username or password");
    }
    setLoading(false);
    // redirect("/");
  };

  return (
    <section className="w-full p-3">
      <div className="content h-screen max-h-[60ch]">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-center font-[Ubuntu] text-4xl font-bold text-[#15141B]">
            Login
          </h1>
          <form
            className="mt-10 max-w-92 w-full flex flex-col gap-7"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full">
              <button
                onClick={() => signIn("google")}
                className="p-3 bg rounded-full border border-amber-400 text-amber-500 text-2xl transition-all hover:bg-amber-400 hover:text-black cursor-pointer"
              >
                <FaGoogle />
              </button>
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-[10px] outline-2 outline-[#FEBF00] border-0 bg-[#e2e2e2] outline-offset-[3px] px-3 py-[7px] focus:outline-offset-[5px] focus:bg-white transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-[10px] outline-2 outline-[#FEBF00] border-0 bg-[#e2e2e2] outline-offset-[3px] px-3 py-[7px] focus:outline-offset-[5px] focus:bg-white transition-all"
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full bg-amber-300 rounded-md py-2 border border-[#15141B] text-[#15141B] cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div>
            <div>
              <Link
                className="underline text-[#15141B] text-sm mt-3 block"
                href={"/register"}
              >
                Don&apos;t have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginM;
