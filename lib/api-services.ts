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

  const result = await response.json()
  
  if (result.token || result.access_token) {
    const authToken = result.token || result.access_token
    localStorage.setItem("authToken", authToken)
    // Force synchronous storage
    await new Promise(resolve => setTimeout(resolve, 0))
  }

  return result
}

export const logoutUser = async () => {
  await new Promise(resolve => setTimeout(resolve, 10));
  
  try {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      console.warn("No authentication token found - user may already be logged out");
      return { success: true }; 
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    });

    localStorage.removeItem("authToken");
    
    if (!response.ok) {
      const error = await response.json();
      console.error("Logout API error:", error);
    }

    return { success: true };
  } catch (error) {
    localStorage.removeItem("authToken");
    console.error("Logout error:", error);
    return { success: true }; 
  }
}