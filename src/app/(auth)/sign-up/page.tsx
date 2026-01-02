import SignUpForm from "@/components/auth/SignUpForm"
import { getUser } from "@/lib/getUser"
import { redirect } from "next/navigation"

const SignUpPage = async() => {
  const user = await getUser()
    if(user) redirect("/dashboard")
  return (
    <div>
        <SignUpForm/>
    </div>
  )
}

export default SignUpPage