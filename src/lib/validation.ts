import z from "zod";

export const signUpSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  name: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username must be at most 30 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers and underscores",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password must be at most 50 characters" })
    .regex(/(?=.*[a-z])/, {
      message: "Password must contain a lowercase letter",
    })
    .regex(/(?=.*[A-Z])/, {
      message: "Password must contain an uppercase letter",
    })
    .regex(/(?=.*\d)/, { message: "Password must contain a number" })

    .regex(/(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])/, {
      message: "Password must contain a special character",
    }),
});


export const signInSchema = z.object({
    email: z.string().trim().email({ message: "Invalid email address" }),
    password: z.string(),
})