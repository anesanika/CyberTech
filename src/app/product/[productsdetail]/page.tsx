import Aboutproduct from "@/app/components/aboutproduct/Aboutproduct";
import db from "@/app/req/axios";

interface Props {
  searchParams: {
    id?: string;
  };
}

export default async function Productdetail({ searchParams }: Props) {
  const { id } = await searchParams;

  console.log(id);

  const { data } = await db.get(`store/products/${id}/`);

  return (
    <div className="mt-50">
      <Aboutproduct product={data} />
    </div>
  );
}
