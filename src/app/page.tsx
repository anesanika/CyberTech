import { Suspense } from "react";
import Prodcuts from "./components/products/Products";
import db from "./req/axios";

export default async function Home() {
  const { data } = await db.get("/store/products/");

  return (
    <Suspense>
      <Prodcuts product={data} />
    </Suspense>
  );
}
