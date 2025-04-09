import Aboutproduct from "@/app/components/aboutproduct/Aboutproduct";
import db from "@/app/req/axios";
import { Props } from "@/types/store/ProductType";

export default async function Productdetail({ searchParams }: Props) {
  const { id } = await searchParams;

  if (!id)
    return (
      <div className="text-4xl text-center text-red-600">
        Product Id Not Found
      </div>
    );

  const { data } = await db.get(`store/products/${id}/`);

  return (
    <div className="mt-50">
      <Aboutproduct product={data} />
    </div>
  );
}
