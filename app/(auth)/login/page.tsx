"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api-services";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginUser(formData);

      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 min-h-screen">
      <div className="bg-white rounded-md p-8 md:p-20 flex flex-col max-w-md w-full shadow-lg">
        <div className="flex items-center justify-center bg-blue-400 p-4 rounded-full w-16 h-16 mx-auto">
          <User size={30} className="text-white" />
        </div>
        <div className="pt-4 pb-2 text-center">
          <h1 className="font-bold text-2xl pb-2">Welcome Back</h1>
          <p className="text-gray-600">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="pt-4 w-full">
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 ring-blue-600/50 rounded-md transition-all duration-300"
              disabled={isLoading}
              required
            />
          </div>

          <div className="pt-4 w-full">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 ring-blue-600/50 rounded-md transition-all duration-300"
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="pt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="underline text-blue-500 font-medium hover:text-blue-600"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
