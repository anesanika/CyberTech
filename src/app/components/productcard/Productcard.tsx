import React from "react";
import Image from "next/image";
import { ProductType } from "@/types/store/ProductType";

export const Productcard = ({
  title,
  images,
  price,
  category,
}: ProductType) => {
  return (
    <div className="w-[280px] bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative w-full h-[180px]">
        <Image
          src={images[0].image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-[190px]">
        <div>
          <h5 className="text-lg font-semibold truncate capitalize">{title}</h5>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{category}</p>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-[#ffc831]">${price}</span>
          </div>

          <button className="mt-4 w-full cursor-pointer bg-[#ffc831] text-[#15141B] font-medium py-2 px-4 rounded-xl hover:bg-[#e6b920] transition-all active:scale-95">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
