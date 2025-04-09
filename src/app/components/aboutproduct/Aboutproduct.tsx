"use client";

import { ProductType } from "../../../types/store/ProductType";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";

const AboutProduct = ({ product }: { product: ProductType }) => {
  const [imageIndx, setImageIndex] = useState<number>(0);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")!) || [];
    const existing = cart.find((item: ProductType) => item.id === product?.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product?.title} item saved`);
  };

  if (!product) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="content">
      <div className="flex flex-col lg:flex-row">
        <div className="w-[60%] mb-6 lg:mb-0">
          <div className="flex p-5">
            <div className="h-full border border-gray-300 rounded-lg shadow-md">
              {product.images.map((img, index) => (
                <div
                  className="border-b border-gray-200 p-2 cursor-pointer transition transform hover:scale-105"
                  key={img.id}
                  onClick={() => setImageIndex(index)}
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={img.image}
                      fill
                      alt={`${img.id}-image`}
                      className="object-contain pointer-events-none select-none"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="border border-gray-300 ml-1 rounded-md w-full p-3">
              <div className="relative w-full h-[55ch] rounded-lg overflow-hidden">
                <Image
                  src={product.images[imageIndx].image}
                  fill
                  priority
                  alt={`${product.title}-image`}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-[40%] px-4">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800 text-center mb-4  transition duration-300">
              {product.title}
            </h1>
            <p className="text-gray-600 text-lg mb-4">{product.descriptions}</p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <Link
              href={`/?category=${product.category}`}
              className="bg-gray-300 px-4 py-2 rounded-full text-gray-900 hover:bg-gray-400 transition duration-75"
            >
              {product.category}
            </Link>
            <h1 className="text-4xl font-semibold text-green-700 italic text-end">
              {product.price}$
            </h1>
          </div>

          <div onClick={addToCart} className="w-full flex justify-center mb-4">
            <button className="w-full text-2xl bg-amber-400 hover:bg-amber-300 flex justify-center py-2 rounded-md text-white transition duration-100 cursor-pointer shadow-lg transform ">
              <CiShoppingCart className="mr-2" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutProduct;
