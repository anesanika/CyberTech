import RegisterM from "../components/auth/register/RegisterM";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Regsiter() {
  const session = await getServerSession(options);

  // if (!session) {
  //   redirect("http://localhost:3000/api/auth/signin/google");
  // }

  return <RegisterM />;
}
