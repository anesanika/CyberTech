import RegisterM from "../components/auth/register/RegisterM";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Regsiter() {
  const session = await getServerSession(options);

  if (session != null) {
    redirect("/");
  }

  return <RegisterM />;
}
