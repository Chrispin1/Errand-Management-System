"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Label } from "@radix-ui/react-label";
import { ChevronDown, LogOut, Plus } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [selectedTaskType, setSelectedTaskType] = useState("");
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-md shadow-xl pb-4">
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div>
              <h1 className="font-bold text-2xl text-gray-800">
                Submit sevice requests
              </h1>
              <p className="pt-1 text-gray-600">Welcome John Doe</p>
            </div>
            <button className="flex items-center justify-center gap-2 pt-6 hover:text-gray-600 cursor-pointer">
              <LogOut />
              <p className="hidden md:flex ">Logout</p>
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
                  <Button variant="outline" className="w-full justify-between">
                    {selectedTaskType || "Select Task Type"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full bg-white shadow-xl text-center space-y-2  min-w-(--radix-dropdown-menu-trigger-width)">
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
                className="focus:outline-none placeholder:text-gray-400 focus:ring-2 ring-blue-400/70 block w-full  px-2 py-1 rounded-md transition-all duration-300 border border-[#e4e4e4]"
              ></Textarea>
            </div>
            <div className="pt-4">
              <Label htmlFor="details">Details</Label>
              <Textarea
                name="description"
                placeholder="Description"
                id="description"
                className="focus:outline-none placeholder:text-gray-400 focus:ring-2 ring-blue-400/70 block w-full px-2 py-1 rounded-md transition-all duration-300 border border-[#e4e4e4]"
              ></Textarea>
            </div>
            <div className="pt-4 flex  items-center gap-2 w-full">
              <Button className="flex items-center gap-2 border border-[#e4e4e4] w-1/2 cursor-pointer">
                <Plus />
                Add request
              </Button>
              <Button className="w-1/2 bg-blue-500 text-white cursor-pointer">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
