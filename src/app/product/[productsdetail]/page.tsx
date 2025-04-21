import Aboutproduct from "@/app/components/aboutproduct/Aboutproduct";
import db from "@/app/req/axios";
import { Props } from "@/types/store/ProductType";

export async function generateMetadata({ searchParams }: Props) {
  const { id } = await searchParams;

  if (!id) {
    return {
      title: "Product Not Found | Cyber Tech",
    };
  }

  try {
    const { data } = await db.get(`store/products/${id}/`);
    return {
      title: `${data.title} | Cyber Tech`,
      description: data.description || "View product details",
    };
  } catch {
    return {
      title: "Product | Cyber Tech",
    };
  }
}

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
    <div>
      <Aboutproduct product={data} />
    </div>
  );
}
