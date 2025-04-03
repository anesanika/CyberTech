import { Suspense } from "react";
import Prodcuts from "./components/products/Products";

export default async function Home() {
  return (
    <Suspense fallback={<h1>...loading</h1>}>
      <Prodcuts />
    </Suspense>
  );
}
