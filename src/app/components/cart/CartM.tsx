"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CiTrash } from "react-icons/ci";
import { ImageType } from "@/types/store/ProductType";

interface cartType {
  id: number;
  title: string;
  descriptions: string;
  price: number;
  category: string;
  image: string;
  images: ImageType[];
}

export const CartM = () => {
  const [cart, setCart] = useState<cartType[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const removeFromCart = (product: cartType) => {
    const newCart = cart.filter((item: cartType) => item.id !== product.id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    alert(`"${product.title.toUpperCase()}" is removed`);
  };

  return (
    <div className="mt-20">
      <div className="content">
        <h1 className="text-3xl font-semibold text-center mb-6">Your Cart</h1>
        <div className="space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                className="flex justify-between items-center p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                key={item.id}
              >
                <div className="flex gap-4 items-center">
                  <div className="w-[100px] h-[100px] relative">
                    <Image
                      src={item.images ? item.images[0].image : item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-gray-500">{item.category}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <h2 className="font-semibold text-xl text-[#ffc831]">
                    ${item.price}
                  </h2>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="mt-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-400 transition-all"
                  >
                    <CiTrash size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-500">
              Your cart is empty.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
