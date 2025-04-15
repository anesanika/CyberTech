"use client";

import { CategoryType } from "@/types/store/ProductType";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export const CategoryClient = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const router = useRouter();
  const searchParam = useSearchParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/proxy/category");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryTitle: string) => {
    const param = new URLSearchParams(searchParam.toString());

    if (categoryTitle) param.set("category", categoryTitle.toLocaleLowerCase());
    else param.delete("category");

    router.push(`?${param.toString()}`);
  };

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-4">
        {categories.map((cat: CategoryType) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.title)}
            className="bg-[#ffc831] hover:bg-[#e6b629] text-black font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform cursor-pointer"
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
};
