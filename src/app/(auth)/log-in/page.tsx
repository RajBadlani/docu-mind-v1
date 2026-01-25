import LogInForm from "@/components/auth/LogInForm";
import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In | DocuMind",
};

const LogInPage = async () => {
  const user = await getUser();
  if (user) redirect("/dashboard");
  return (
    <div>
      {" "}
      <LogInForm />{" "}
    </div>
  );
};

export default LogInPage;
