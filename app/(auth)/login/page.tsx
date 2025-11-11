import { User } from "lucide-react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-white rounded-md p-8 md:p-20 flex flex-col max-w-md w-full">
        <div className="flex items-center justify-center bg-blue-400 p-4 rounded-full w-16 h-16 mx-auto">
          <User size={30} className="text-white" />
        </div>
        <div className="pt-4 pb-2 text-center">
          <h1 className="font-bold text-2xl pb-2">Welcome Back</h1>
          <p className="text-gray-600">Log in to your account</p>
        </div>
        <div className="pt-4 w-full">
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="johndoe@gmail.com"
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 ring-blue-600/50 rounded-md transition-all duration-300"
          />
        </div>
        <div className="pt-4 w-full">
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 ring-blue-600/50 rounded-md transition-all duration-300"
          />
        </div>
        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
          Log In
        </button>
        <p className="pt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="underline text-blue-500 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
