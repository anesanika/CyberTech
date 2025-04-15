import { Suspense } from "react";
import Prodcuts from "./components/products/Products";
import db from "./req/axios";
import Pagination from "./components/paginations/Paginations";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}
export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;

  const { data } = await db.get(`store/products/?page=${page || 1}`);

  return (
    <Suspense fallback={<h1 className="text-center">...loading</h1>}>
      <Prodcuts allProducts={data.results} />
      <Pagination
        next={data.next}
        previous={data.previous}
        currentPage={parseInt(page || "1")}
        totalPages={data.results.length / data.count}
      />
    </Suspense>
  );
}
