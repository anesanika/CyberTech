"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Productcard } from "../productcard/Productcard";
import { ProductType } from "@/types/store/ProductType";
import { AnimatePresence, motion } from "motion/react";
import { CategoryClient } from "../categoryclient/Categoryclient";
import Link from "next/link";
import { BiReset } from "react-icons/bi";

interface ProductsProps {
  allProducts: ProductType[];
}

export default function Products({ allProducts }: ProductsProps) {
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const param = useSearchParams();
  const router = useRouter();
  const [sort, setSort] = useState(param.get("sort") || "");
  const [minPrice, setMinPrice] = useState(param.get("min") || "");
  const [maxPrice, setMaxPrice] = useState(param.get("max") || "");

  useEffect(() => {
    if (allProducts.length > 0) setLoading(false);
  }, [allProducts]);

  useEffect(() => {
    let filtered = [...allProducts];

    const category = param.get("category");
    const sort = param.get("sort");
    const min = Number(param.get("min")) || 0;
    const max = Number(param.get("max")) || Infinity;

    if (category) {
      filtered = filtered.filter(
        (prod) => prod.category.toLocaleLowerCase() === category
      );
    }

    filtered = filtered.filter(
      (prod) => prod.price >= min && prod.price <= max
    );

    if (sort === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [param, allProducts]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams(param.toString());
    if (sort) params.set("sort", sort);
    else params.delete("sort");

    if (minPrice) params.set("min", minPrice);
    else params.delete("min");

    if (maxPrice) params.set("max", maxPrice);
    else params.delete("max");

    router.push(`?${params.toString()}`);
  };

  return (
    <section className="p-4 sm:p-6">
      <div className="content">
        {loading ? (
          <div className="flex flex-wrap gap-4 justify-center">
            {[...Array(3)].map((_, index) => (
              <div
                className="w-full sm:w-[330px] py-2 bg-white border flex flex-col items-center border-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"
                key={index}
              >
                <div className="relative w-1/2 h-[200px] bg-gray-200 rounded-md"></div>
                <div className="p-5 w-full">
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-5 w-3/5 bg-gray-200 rounded"></div>
                    <div className="h-5 w-1/5 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex items-center justify-between mt-5">
                    <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:max-w-[300px] lg:min-w-[220px] mb-6 lg:mb-0 h-auto lg:h-screen max-h-[90ch] min-h-[40ch] border border-[#ffc83177] p-4 sm:p-5 text-sm bg-white rounded-lg shadow-md">
              <h1 className="font-semibold text-2xl mb-2 text-[#ffc831]">
                Filters
              </h1>

              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Sort by</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ffc831] transition"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="">Relative</option>
                  <option value="asc">Price: Low To High</option>
                  <option value="desc">Price: High To Low</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Price Range</label>
                <input
                  type="number"
                  placeholder="min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#ffc831] transition"
                />
                <input
                  type="number"
                  placeholder="max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ffc831] transition"
                />
              </div>
              <div className="my-3">
                <label>Category</label>

                <CategoryClient />
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handleApplyFilters}
                  className="w-full bg-[#ffc831] text-[#222222] font-semibold py-1.5 rounded hover:bg-[#e6b800] transition cursor-pointer"
                >
                  Apply
                </button>
                <Link
                  href={"/"}
                  className="inline-block p-2 bg-red-600 rounded-md text-white cursor-pointer"
                >
                  <BiReset />
                </Link>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start ml-0 lg:ml-6">
              <AnimatePresence>
                {filteredProducts.map((prod: ProductType) => (
                  <motion.div
                    layout
                    key={prod.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Productcard {...prod} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
