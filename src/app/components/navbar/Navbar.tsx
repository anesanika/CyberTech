"use client";

import React from "react";
import Link from "next/link";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export const Navbar = () => {
  const session = useSession();

  return (
    <nav className="w-full p-1 bg-white fixed top-0 left-0">
      <div className="content">
        <div className="flex justify-between p-2">
          <div className="flex relative items-center">
            <span className="pointer-events-none translate-x-6 font-[Ubuntu]">
              <CiSearch />
            </span>
            <input
              type="search"
              className="bg-neutral-200 p-2 rounded-lg text-[14px] w-64 outline-none pl-7 "
              placeholder="Search"
            />
          </div>

          <div className="flex gap-6 items-center">
            <Link
              href={"/"}
              title="Cart"
              className="text-2xl rounded-full transition-all hover:bg-neutral-200 p-2"
            >
              <CiShoppingCart />
            </Link>
            {session.status === "authenticated" ? (
              <button onClick={() => signOut()}>LogOut</button>
            ) : (
              <Link
                href={"/login"}
                className="p-2 px-3 bg-[#FFC831] rounded-md text-[13px] text-[#15141B] hover:bg-[#ffcf31] transition-all"
              >
                Become a buyer
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
