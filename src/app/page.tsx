import Prodcuts from "./components/products/Products";
import db from "./req/axios";

export default async function Home() {
  try {
    const { data } = await db.get("/store/products/");

    return <Prodcuts product={data} />;
  } catch {
    return (
      <main>
        <h1>Welcome to my app</h1>
        <p>Sorry we couldn&apos;t load the latest data</p>
      </main>
    );
  }
}
