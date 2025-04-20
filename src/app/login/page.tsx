import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import LoginM from "../components/auth/login/LoginM";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Login | Cyber Tech",
  description: "Log in to access your account",
};

export default async function Login() {
  const session = await getServerSession(options);
  if (session != null) {
    redirect("/");
  }

  return <LoginM />;
}
