import { Navbarclient } from "../navbarclient/Navbarclient";
import db from "@/app/req/axios";
import { ProductType } from "@/types/store/ProductType";

export default async function NavbarWrapper() {
  const res = await db.get("/store/products/");

  const products: ProductType[] = res.data;

  return <Navbarclient products={products} />;
}
