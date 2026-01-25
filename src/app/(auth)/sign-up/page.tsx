import SignUpForm from "@/components/auth/SignUpForm";
import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | DocuMind",
};

const SignUpPage = async () => {
  const user = await getUser();
  if (user) redirect("/dashboard");
  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
