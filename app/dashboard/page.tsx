"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Label } from "@radix-ui/react-label";
import { ChevronDown, LogOut, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api-services";
import { toast } from "react-toastify";
import ProtectedRoute from "@/components/ui/ProtectedRoute";

export default function Dashboard() {
  const router = useRouter();
  const [selectedTaskType, setSelectedTaskType] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      toast.success("Logged out successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error.message || "Logout failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <ProtectedRoute>
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-md shadow-xl pb-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h1 className="font-bold text-2xl text-gray-800">
                    Submit service requests
                  </h1>
                  <p className="pt-1 text-gray-600">Welcome John Doe</p>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center justify-center gap-2 hover:text-gray-600 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogOut className={isLoggingOut ? "animate-spin" : ""} />
                  <p className="hidden md:flex">
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </p>
                </button>
              </div>
              <div className="px-6 py-6">
                <div>
                  <h1 className="font-semibold text-xl">Request #1</h1>
                </div>
                <div className="pt-3">
                  <label htmlFor="title">Details</label>
                  <Input
                    type="text"
                    placeholder="Request details..."
                    className="focus:outline-none placeholder:text-gray-400 focus:ring-2 ring-blue-400/70 block w-full px-2 py-1 rounded-md transition-all duration-300 border border-[#e4e4e4]"
                  />
                </div>
                <h1 className="pt-4">Tasks</h1>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        {selectedTaskType || "Select Task Type"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-white shadow-xl text-center space-y-2 min-w-(--radix-dropdown-menu-trigger-width)">
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="w-full cursor-pointer"
                        onSelect={() => setSelectedTaskType("Development")}
                      >
                        Development
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="w-full cursor-pointer"
                        onSelect={() => setSelectedTaskType("Design")}
                      >
                        Design
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="w-full cursor-pointer"
                        onSelect={() => setSelectedTaskType("Testing")}
                      >
                        Testing
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="w-full cursor-pointer"
                        onSelect={() => setSelectedTaskType("Documentation")}
                      >
                        Documentation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="pt-4">
                  <Label htmlFor="details">Details</Label>
                  <Textarea
                    name="details"
                    id="details"
                    placeholder="Details"
                    className="focus:outline-none placeholder:text-gray-400 focus:ring-2 ring-blue-400/70 block w-full px-2 py-1 rounded-md transition-all duration-300 border border-[#e4e4e4]"
                  ></Textarea>
                </div>
                <div className="pt-4">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    placeholder="Description"
                    id="description"
                    className="focus:outline-none placeholder:text-gray-400 focus:ring-2 ring-blue-400/70 block w-full px-2 py-1 rounded-md transition-all duration-300 border border-[#e4e4e4]"
                  ></Textarea>
                </div>
                <div className="pt-4 flex items-center gap-2 w-full">
                  <Button className="flex items-center gap-2 border border-[#e4e4e4] w-1/2 cursor-pointer">
                    <Plus />
                    Add request
                  </Button>
                  <Button className="w-1/2 bg-blue-500 text-white cursor-pointer hover:bg-blue-600">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}
