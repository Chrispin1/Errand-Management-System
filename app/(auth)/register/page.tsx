"use client";
import { registerUser } from "@/actions/auth";
import { User } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";

export default function Register() {
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
          phone_number: `+254${+form.phone_number}`,
        });
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-white rounded-md p-8 md:p-20 flex flex-col max-w-xl w-full">
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
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 ring-blue-600/50 rounded-md transition-all duration-300"
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
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 ring-blue-600/50 rounded-md transition-all duration-300"
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
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 ring-blue-600/50 rounded-md transition-all duration-300"
            />
          </div>
          <div className="pt-4 w-full">
            <label
              htmlFor="phone_number"
              className="block mb-1 text-sm font-medium"
            >
              Phone Number
            </label>
            <input
              type="text"
              inputMode="numeric"
              id="phone_number"
              value={form.phone_number}
              name="phone_number"
              onChange={(e) => handleUserInputChange(e)}
              placeholder="0705 681 712"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 ring-blue-600/50 rounded-md transition-all duration-300"
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
              value={form.password}
              name="password"
              onChange={(e) => handleUserInputChange(e)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 ring-blue-600/50 rounded-md transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {isPending ? "creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="pt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline text-blue-500 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
