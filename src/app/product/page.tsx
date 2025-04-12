import { redirect } from "next/navigation";

export default function Product() {
  redirect("/");

  return <h1>...loading</h1>;
}
