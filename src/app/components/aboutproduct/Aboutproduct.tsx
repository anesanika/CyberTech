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
    <main className="content px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-2/3">
          <div className="flex flex-col-reverse sm:flex-row gap-6">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-visible gap-3 sm:gap-4 border border-gray-200 rounded-xl shadow-sm p-3 bg-white">
              {product.images.map((img, index) => (
                <div
                  key={img.id}
                  onClick={() => setImageIndex(index)}
                  className={`min-w-[4rem] sm:min-w-0 border p-1 rounded-md cursor-pointer transition-transform duration-150 hover:scale-105 ${
                    index === imageIndx ? "ring-2 ring-amber-400" : ""
                  }`}
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden">
                    <Image
                      src={img.image}
                      fill
                      alt={`Thumbnail-${img.id}`}
                      className="object-contain pointer-events-none select-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-1 border border-gray-200 rounded-xl bg-white p-4 shadow-sm">
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src={product.images[imageIndx].image}
                  fill
                  priority
                  alt={`${product.title}-main-image`}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full lg:w-1/3 px-2 sm:px-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center lg:text-left">
              {product.title}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
              {product.descriptions}
            </p>
          </div>

          {/* Category and Price */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
            <Link
              href={`/?category=${product.category}`}
              className="bg-gray-100 hover:bg-gray-200 text-sm sm:text-base px-4 py-2 rounded-full text-gray-800 transition-colors duration-200 w-fit"
            >
              {product.category}
            </Link>
            <h2 className="text-2xl sm:text-3xl font-semibold text-green-600 italic text-end">
              ${product.price}
            </h2>
          </div>

          <div onClick={addToCart} className="w-full">
            <button className="w-full text-lg sm:text-xl bg-amber-400 hover:bg-amber-400 text-white flex items-center justify-center gap-2 py-2 rounded-lg shadow-md transition-all duration-150 font-[ubuntu]">
              <CiShoppingCart size={24} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutProduct;
