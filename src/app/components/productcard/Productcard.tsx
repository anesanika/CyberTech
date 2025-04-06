"use client";

import React from "react";
import Image from "next/image";
import { ProductType } from "@/types/store/ProductType";
import Link from "next/link";

export const Productcard = ({
  id,
  title,
  images,
  price,
  category,
}: ProductType) => {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")!) || [];

    const existing = cart.find((item: ProductType) => item.id === id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id,
        title,
        price,
        category,
        image: images[0].image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${title} item saved`);
  };

  return (
    <div className="w-[280px] max-h-[380px] bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <Link
        href={`product/${title.toLowerCase()}/?id=${id}`}
        className="relative block w-full h-[180px]"
      >
        <Image
          src={images[0].image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="p-4 flex flex-col justify-between h-[190px]">
        <div>
          <h5 className="text-lg font-semibold truncate capitalize">{title}</h5>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{category}</p>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-[#ffc831]">${price}</span>
          </div>

          <button
            onClick={addToCart}
            className="mt-4 w-full cursor-pointer bg-[#ffc831] text-[#15141B] font-medium py-2 px-4 rounded-xl hover:bg-[#e6b920] transition-all active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
