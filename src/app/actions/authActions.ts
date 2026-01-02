"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { signInSchema, signUpSchema } from "@/lib/validation"
import { APIError } from "better-auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


export async function signUpAction(formData : FormData){
    const rawData = {
        name :String(formData.get("name")),
        email : String(formData.get("email")),
        password : String(formData.get("password")),
    }
    const validatedData = signUpSchema.safeParse(rawData)
    if(!validatedData.success){
        return { 
            success : false,
            message : validatedData.error.issues[0]?.message || "Invalid data"
        }
    }
    const { name , email , password} = validatedData.data

    try {
        const existingUser = await prisma.user.findUnique({
            where : {email},
        })
        if(existingUser) return {
            success : false,
            message : "User already exists with this email"
        }
        const res = await auth.api.signUpEmail({
            headers  : await headers(),
            body : { name , email , password},
            asResponse : true
        })

        if (!res.ok) {
      const err = await res.json().catch(() => null);
      const message =
        err?.message ||
        err?.error ||
        err?.errors?.[0]?.message ||
        (res.status === 422
          ? "User already exists with this email"
          : "Signup failed, please try again");
        
      return { success: false, message };
    }
    return { success: true, message: "Signed Up Successfully" };
    } catch (error) {
        console.error("Signup Error:", error);

    if (error instanceof APIError)
      return { success: false, message: error.message };

    return {
      success: false,
      message: "Oops! Something went wrong while signing up.",
    };
    }
    
}

export async function signInAction(formData:FormData) {
    const rawData = {
        email : String(formData.get("email")),
        password : String(formData.get("password"))
    }
    const validatedData = signInSchema.safeParse(rawData)

    if(!validatedData.success){
        return {
            success : false,
            message : validatedData.error.issues[0]?.message
        }
    }

    const {email , password} = validatedData.data

    try {
        const res = await auth.api.signInEmail({
            headers : await headers(),
            body : {
                email : email,
                password : password
            },
            asResponse : true
        })
        if(!res.ok){
            const err = await res.json().catch(()=>null)
            // console.log(err)
            return {
                success : false,
                message :  err?.message ||err?.error || err?.errors?.[0]?.message || "Invalid Email or Password"
            }
        }
        return {
            success : true,
            message : "Logged in successfully "
        }
    } catch (error) {
        console.log('Sign In error ' , error)
        if(error instanceof APIError){
            return { success : false , message : error.message}
        }
        return { 
            success : false, message : "Internal Server Error"
        }
    }
}