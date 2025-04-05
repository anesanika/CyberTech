"use client";
import { useEffect, useState } from "react";
import { CategoryType } from "@/types/store/ProductType";
import db from "@/app/req/axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CiUndo } from "react-icons/ci";

export default function Categories() {
  const [Categories, setCategories] = useState<CategoryType[]>([]);
  const route = useRouter();
  const param = useSearchParams();

  useEffect(() => {
    const getAllCat = async () => {
      const { data } = await db.get("/store/category");

      setCategories(data);
    };
    getAllCat();
  }, []);

  const setCategoryParam = (title: string) => {
    const urlParams = new URLSearchParams();
    urlParams.set("category", title);
    route.push(`?${urlParams.toString()}`);
  };

  return (
    <div className="p-1 flex gap-2">
      {Categories.map((item: CategoryType) => (
        <button
          key={item.id}
          onClick={() => setCategoryParam(item.title)}
          className={`${
            param.get("category") === item.title
              ? "bg-neutral-300"
              : "bg-neutral-200"
          }  p-2 px-4 text-sm rounded-full cursor-pointer text-neutral-700`}
        >
          {item.title}
        </button>
      ))}
      <Link
        href={"/"}
        className="p-1 px-3 text-[20px] rounded-full flex items-center justify-center cursor-pointer text-neutral-700 border border-yellow-400 bg-yellow-200 active:bg-neutral-300"
      >
        <CiUndo />
      </Link>
    </div>
  );
}
