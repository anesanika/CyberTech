import Aboutproduct from "@/app/components/aboutproduct/Aboutproduct";
import db from "@/app/req/axios";

export default async function Productdetail() {
  const { data } = await db.get(`store/products/${1}/`);

  return (
    <div className="mt-50">
      <Aboutproduct product={data} />
    </div>
  );
}
