"use client";

import React from "react";
import Link from "next/link";
import { CiSearch, CiShoppingCart, CiUser, CiLogout } from "react-icons/ci";
import { IoIosFlash } from "react-icons/io";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export const Navbar = () => {
  const session = useSession();

  console.log(session);

  return (
    <nav className="w-full p-1 bg-white fixed top-0 left-0">
      <div className="content">
        <div className="flex justify-between p-2">
          <div className="flex items-center">
            <Link
              title="CyberHub"
              href={"/"}
              className="text-4xl text-amber-500 bg-amber-300 rounded-full p-1 mr-5"
            >
              <IoIosFlash />
            </Link>
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
          </div>

          <div className="flex gap-3 items-center">
            <Link
              href={"/"}
              title="Cart"
              className="text-2xl rounded-full transition-all hover:bg-neutral-200 p-2"
            >
              <CiShoppingCart />
            </Link>
            {session.status === "authenticated" ? (
              <div className="flex items-center justify-center gap-5">
                <Link href={"/settings"} className="relative inline-block">
                  <div className="w-12 h-12 relative border overflow-hidden rounded-full">
                    <Image
                      src={
                        session.data.user?.image ||
                        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                      }
                      fill
                      alt={session.data.user?.name || "profile Image"}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </Link>
                <button
                  className="bg-red-500 rounded-lg p-2 text-lg text-neutral-700 cursor-pointer hover:bg-red-400"
                  onClick={() => signOut()}
                >
                  <CiLogout />
                </button>
              </div>
            ) : (
              <Link
                title="Create Profile"
                href={"/login"}
                className="p-2 bg-[#FFC831] rounded-md text-lg text-[#15141B] hover:bg-[#ffcf31] transition-all"
              >
                <CiUser />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
