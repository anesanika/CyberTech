"use client";

import { ProductType } from "../../../types/store/ProductType";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";

const AboutProduct = ({ product }: { product: ProductType }) => {
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
    <div className="content bg-white font-sans">
      <main className=" mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="relative lg:w-3/5 overflow-hidden">
            <div className="relative h-[500px] lg:h-[650px] overflow-hidden">
              <Image
                src={product.images[0]?.image || "/placeholder.jpg"}
                alt={product.title}
                className="object-contain"
                fill
                priority
              />
            </div>
          </div>

          <div className="lg:w-2/5 pt-6 lg:pt-0">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-medium">{product.title}</h1>
                <p className="text-lg font-medium mt-2">£{product.price}</p>
                <p className="text-sm text-gray-600 mt-2">{product.category}</p>
              </div>
              <button className="p-2 hover:text-primary-500 transition-all duration-200"></button>
            </div>

            <div className="mt-4">
              <button
                onClick={addToCart}
                className="mt-4 w-full text-2xl flex items-center justify-center cursor-pointer bg-[#ffc831] text-[#15141B] py-2 rounded-md shadow-sm hover:bg-amber-400 transition-all active:scale-95 outline-none"
              >
                <CiShoppingCart />
              </button>
            </div>
            <div className="mt-6 text-sm text-gray-600">
              {product.descriptions}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutProduct;
