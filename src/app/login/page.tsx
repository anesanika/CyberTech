import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import LoginM from "../components/auth/login/LoginM";
import { getServerSession } from "next-auth";

export default async function Login() {
  const session = await getServerSession(options);

  console.log(session);

  if (session != null) {
    redirect("/");
  }

  return <LoginM />;
}
