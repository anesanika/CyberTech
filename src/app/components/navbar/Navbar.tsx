"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CiSearch, CiShoppingCart, CiUser, CiLogout } from "react-icons/ci";
import { IoIosFlash } from "react-icons/io";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import db from "@/app/req/axios";
import { ProductType } from "@/types/store/ProductType";

export const Navbar = () => {
  const session = useSession();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchProduct, setSearchProduct] = useState<ProductType[]>([]);

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await db.get("/store/products/");

      const searched = data.filter((product: ProductType) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      // setSearchProduct(data);
      setSearchProduct(searched);
    };
    getProduct();
  }, [searchValue]);

  return (
    <nav className="w-full p-1 bg-white fixed top-0 left-0 z-[99] shadow-md shadow-amber-300">
      <div className="content relative">
        {searchValue !== "" && (
          <div className="absolute w-full h-auto bg-white top-full left-0 z-[99] p-2 shadow-lg flex flex-col">
            {searchProduct.map((item) => (
              <Link
                onClick={() => setSearchValue("")}
                href={`/product/${item.title}/?id=${item.id}`}
                className="inline-flex my-3 border border-gray-300 rounded-md p-1"
                key={item.id}
              >
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10">
                      <Image src={item.images[0].image} alt={item.title} fill />
                    </div>
                    <h2 className="text-sm md:text-base">{item.title}</h2>
                  </div>
                  <h1 className="text-sm md:text-base">${item.price}</h1>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 gap-2">
          {/* Logo + Search */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <Link
              title="CyberHub"
              href={"/"}
              className="text-3xl md:text-4xl text-amber-500 bg-amber-300 rounded-full p-1 mr-0 md:mr-5"
            >
              <IoIosFlash />
            </Link>

            <div className="relative w-full md:w-auto">
              <span className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500">
                <CiSearch />
              </span>
              <input
                type="search"
                className="bg-neutral-200 p-2 rounded-lg text-sm md:text-[14px] w-full md:w-64 outline-none pl-8"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex gap-2 md:gap-3 items-center justify-end">
            <Link
              href={"/cart"}
              title="Cart"
              className="text-2xl rounded-full hover:bg-neutral-200 p-2 transition-all"
            >
              <CiShoppingCart />
            </Link>

            {session.status === "authenticated" ? (
              <div className="flex items-center gap-3">
                <Link
                  href={"/settings"}
                  className="relative inline-block"
                  title={session.data.user?.name || ""}
                >
                  <div className="relative w-8 h-8 md:w-12 md:h-12 border overflow-hidden rounded-full">
                    <Image
                      src={
                        session.data.user?.image ||
                        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                      }
                      fill
                      priority
                      alt={session.data.user?.name || "profile image"}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </Link>

                <button
                  className="bg-red-500 rounded-lg p-2 text-lg text-neutral-700 hover:bg-red-400 transition"
                  onClick={() => signOut()}
                >
                  <CiLogout />
                </button>
              </div>
            ) : (
              <Link
                title="Create Profile"
                href={"/login"}
                className="p-2 bg-[#FFC831] rounded-md text-lg text-[#15141B] hover:bg-[#ffcf31] transition"
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
