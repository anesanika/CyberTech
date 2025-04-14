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
    <main className="content px-2 sm:px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[60%]">
          <div className="flex flex-col sm:flex-row gap-4 p-2 sm:p-5">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-visible border border-gray-300 rounded-lg shadow-md">
              {product.images.map((img, index) => (
                <div
                  className="min-w-[5rem] sm:min-w-0 border-b sm:border-b-0 sm:border-b-gray-200 p-2 cursor-pointer transition-transform hover:scale-105"
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

            {/* Main Image */}
            <div className="border border-gray-300 rounded-md w-full p-3">
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[55ch] rounded-lg overflow-hidden">
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

        <div className="w-full lg:w-[40%] px-2 sm:px-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 text-center mb-4 transition duration-300">
              {product.title}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-4">
              {product.descriptions}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
            <Link
              href={`/?category=${product.category}`}
              className="bg-gray-300 px-4 py-2 rounded-full text-gray-900 hover:bg-gray-400 transition duration-75 w-fit"
            >
              {product.category}
            </Link>
            <h1 className="text-3xl sm:text-4xl font-semibold text-green-700 italic text-end">
              {product.price}$
            </h1>
          </div>

          <div onClick={addToCart} className="w-full flex justify-center mb-4">
            <button className="w-full text-xl sm:text-2xl bg-amber-400 hover:bg-amber-300 flex justify-center py-2 rounded-md text-white transition duration-100 cursor-pointer shadow-lg">
              <CiShoppingCart className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutProduct;
