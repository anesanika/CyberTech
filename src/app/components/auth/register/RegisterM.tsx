"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

const RegisterM = () => {
  return (
    <section className="w-full p-3">
      <div className="content h-screen max-h-[60ch]">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-center font-[Ubuntu] text-4xl font-bold text-[#15141B] ">
            Register
          </h1>
          <form
            className="mt-10 max-w-92 w-full flex flex-col gap-7"
            onSubmit={(e) => e.preventDefault()}
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
              className="rounded-[10px] outline-2 outline-[#FEBF00] border-0 bg-[#e2e2e2] outline-offset-[3px] px-3 py-[7px] focus:outline-offset-[5px] focus:bg-white transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              className="rounded-[10px] outline-2 outline-[#FEBF00] border-0 bg-[#e2e2e2] outline-offset-[3px] px-3 py-[7px] focus:outline-offset-[5px] focus:bg-white transition-all"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="rounded-[10px] outline-2 outline-[#FEBF00] border-0 bg-[#e2e2e2] outline-offset-[3px] px-3 py-[7px] focus:outline-offset-[5px] focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="w-full bg-amber-300 rounded-md py-2 border border-[#15141B] text-[#15141B] cursor-pointer"
            >
              Register
            </button>
          </form>
          <div>
            <div>
              <Link
                className="underline text-[#15141B] text-sm mt-3 block"
                href={"/login"}
              >
                Have an account ?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterM;
