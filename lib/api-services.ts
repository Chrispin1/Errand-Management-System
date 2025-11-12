import { LoginSchema, RegisterSchema } from "@/schemas/auth-forms"

export const loginUser = async (data: LoginSchema) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Login failed")
  }

  return response.json()
}

export const registerUser = async (data: RegisterSchema) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...data, phone_number:`+254${+data.phone_number}`}),  
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Login failed")
  }

  return response.json()
}
