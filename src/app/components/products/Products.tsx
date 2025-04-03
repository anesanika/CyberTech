"use client";
import Image from "next/image";
import { ProductType } from "@/types/store/ProductType";
import Categories from "../categories/Categories";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Prodcuts({ product }: { product: ProductType[] }) {
  const [allPorduct, setAllProduct] = useState<ProductType[]>(product);
  const param = useSearchParams();

  useEffect(() => {
    const category = param.get("category");
    let filltred = product;

    if (category) {
      filltred = product.filter((prod) => prod.category === category);
      setAllProduct(filltred);
    } else {
      setAllProduct(product);
    }
  }, [param, product]);

  return (
    <section>
      <div className="content">
        <Categories />

        <div>
          {allPorduct.map((prod: ProductType) => (
            <div key={prod.id}>
              <h1>{prod.title}</h1>
              <Image
                src={prod.images[0].image}
                alt={prod.title}
                width={30}
                height={30}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
