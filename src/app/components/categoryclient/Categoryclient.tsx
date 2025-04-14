"use client";

import { CategoryType } from "@/types/store/ProductType";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const CategoryClient = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const router = useRouter();

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

  // Function to handle the category click and update the search params in the URL
  const handleCategoryClick = (categoryTitle: string) => {
    // Update the URL with the selected category title
    router.push(`/?category=${categoryTitle.toLocaleLowerCase()}`);
  };

  return (
    <div className="mt-3">
      <ul className="flex flex-wrap gap-4">
        {categories.map((cat: CategoryType) => (
          <li key={cat.id}>
            <button
              onClick={() => handleCategoryClick(cat.title)}
              className="bg-[#ffc831] hover:bg-[#e6b629] text-black font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform cursor-pointer"
            >
              {cat.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
