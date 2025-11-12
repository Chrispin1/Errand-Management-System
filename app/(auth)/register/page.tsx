"use client";
import { registerUser } from "@/actions/auth";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const [isPending, startTransition] = useTransition();

  const handleUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const res = await registerUser({
          ...form,
          phone_number: `+254${form.phone_number}`,
        });

        console.log(res);
        toast.success("Account created successfully!", {
          position: "top-right",
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } catch (error: any) {
        console.error(error);

        // Parse the error response
        if (error.message) {
          try {
            // Try to parse JSON error message
            const errorData = JSON.parse(error.message);

            // Display each error field
            Object.entries(errorData).forEach(([field, messages]) => {
              if (Array.isArray(messages)) {
                messages.forEach((message: string) => {
                  toast.error(message, {
                    position: "top-right",
                  });
                });
              }
            });
          } catch (parseError) {
            // If not JSON, display the raw error message
            toast.error(
              error.message || "Registration failed. Please try again.",
              {
                position: "top-right",
              }
            );
          }
        } else {
          toast.error("Registration failed. Please try again.", {
            position: "top-right",
          });
        }
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-center px-4 min-h-screen">
        <div className="bg-white rounded-md p-8 md:p-20 flex flex-col max-w-xl w-full shadow-lg">
          <div className="flex items-center justify-center bg-blue-400 p-4 rounded-full w-16 h-16 mx-auto">
            <User size={30} className="text-white" />
          </div>
          <div className="pt-4 pb-2 text-center">
            <h1 className="font-bold text-2xl pb-2">Create an account</h1>
            <p className="text-gray-600">Sign up to get started</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="pt-4 w-full">
                <label
                  htmlFor="first_name"
                  className="block mb-1 text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  value={form.first_name}
                  name="first_name"
                  onChange={(e) => handleUserInputChange(e)}
                  placeholder="John"
                  disabled={isPending}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 ring-blue-600/50 rounded-md transition-all duration-300 disabled:bg-gray-100"
                />
              </div>
              <div className="pt-4 w-full">
                <label
                  htmlFor="last_name"
                  className="block mb-1 text-sm font-medium"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  value={form.last_name}
                  name="last_name"
                  onChange={(e) => handleUserInputChange(e)}
                  placeholder="Doe"
                  disabled={isPending}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 ring-blue-600/50 rounded-md transition-all duration-300 disabled:bg-gray-100"
                />
              </div>
            </div>
            <div className="pt-4 w-full">
              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                name="email"
                onChange={(e) => handleUserInputChange(e)}
                placeholder="johndoe@gmail.com"
                disabled={isPending}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 ring-blue-600/50 rounded-md transition-all duration-300 disabled:bg-gray-100"
              />
            </div>
            <div className="pt-4 w-full">
              <label
                htmlFor="phone_number"
                className="block mb-1 text-sm font-medium"
              >
                Phone Number
              </label>
              <div className="flex items-center gap-2">
                <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                  +254
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  id="phone_number"
                  value={form.phone_number}
                  name="phone_number"
                  onChange={(e) => handleUserInputChange(e)}
                  placeholder="705681712"
                  disabled={isPending}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 ring-blue-600/50 rounded-md transition-all duration-300 disabled:bg-gray-100"
                />
              </div>
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
                value={form.password}
                name="password"
                onChange={(e) => handleUserInputChange(e)}
                placeholder="••••••••"
                disabled={isPending}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 ring-blue-600/50 rounded-md transition-all duration-300 disabled:bg-gray-100"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isPending ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="pt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline text-blue-500 font-medium hover:text-blue-600"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
