"use client";
import Image from "next/image";
import { ProductType } from "@/types/store/ProductType";
import Categories from "../categories/Categories";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import db from "@/app/req/axios";

export default function Products() {
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const param = useSearchParams();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const { data } = await db.get("/store/products/");
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("We Got Error", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const category = param.get("category");
    if (category) {
      setFilteredProducts(
        allProducts.filter((prod) => prod.category === category)
      );
    } else {
      setFilteredProducts(allProducts);
    }
  }, [param, allProducts]);

  return (
    <section className="p-6">
      <div className="content">
        <Categories />

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full h-40 bg-gray-300 animate-pulse rounded-md"
                />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((prod: ProductType) => (
              <div key={prod.id} className="p-4 border rounded-md">
                <h1 className="text-lg font-semibold">{prod.title}</h1>
                <Image
                  src={prod.images[0].image}
                  alt={prod.title}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
