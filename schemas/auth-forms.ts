// create schema for reg and login forms
import { z } from "zod"

export const registerSchema = z.object({
    first_name: z.string().min(2, "Too Short!").max(50, "Too Long!"),
    last_name: z.string().min(2, "Too Short!").max(50, "Too Long!"),
    email: z.email({ message: "Must be a valid email address" }),
    phone_number: z.string()
    .regex(/^\d{9,10}$/, { message: "Phone number must be 9 to 10 digits" }),
    password: z.string()
    .min(4, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),

  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type RegisterSchema = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: z.email({ message: "Must be a valid email address" }),
  password: z.string()
    .min(4, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
})

export type LoginSchema = z.infer<typeof loginSchema>

