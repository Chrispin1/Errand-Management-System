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
import { ChevronDown, LogOut, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api-services";
import { toast } from "react-toastify";

interface Task {
  task_type: string;
  details: string;
  description: string;
}

interface ServiceRequest {
  details: string;
  tasks: Task[];
}

interface Error {
  name: string;
  message: string;
  stack?: string | undefined;
  cause?: unknown;
}

export default function Dashboard() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestDetails, setRequestDetails] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    {
      task_type: "",
      details: "",
      description: "",
    },
  ]);

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
    } catch (error: Error) {
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

  const handleTaskTypeChange = (index: number, taskType: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].task_type = taskType;
    setTasks(updatedTasks);
  };

  const handleTaskDetailsChange = (index: number, details: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].details = details;
    setTasks(updatedTasks);
  };

  const handleTaskDescriptionChange = (index: number, description: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].description = description;
    setTasks(updatedTasks);
  };

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        task_type: "",
        details: "",
        description: "",
      },
    ]);
  };

  const removeTask = (index: number) => {
    if (tasks.length > 1) {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!requestDetails.trim()) {
      toast.error("Please enter request details", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (
        !task.task_type.trim() ||
        !task.details.trim() ||
        !task.description.trim()
      ) {
        toast.error(`Please fill in all fields for Task ${i + 1}`, {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const requestData: ServiceRequest = {
        details: requestDetails,
        tasks: tasks.map((task) => ({
          task_type: task.task_type,
          details: task.details,
          description: task.description,
        })),
      };

      console.log("Submitting data:", requestData);
      // retreive user id from session storage
      const userId = sessionStorage.getItem("user_id");
      if (!userId) {
        throw new Error("User not found");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/customers/${userId}/customer-requests/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit request");
      }

      const result = await response.json();
      console.log(result);

      toast.success("Service request submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Reset form
      setRequestDetails("");
      setTasks([
        {
          task_type: "",
          details: "",
          description: "",
        },
      ]);

      console.log("Submission successful:", result);
    } catch (error: Error) {
      console.error("Submission error:", error);
      toast.error(
        error.message || "Failed to submit service request. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
                <h1 className="font-semibold text-xl">Service Request</h1>
              </div>

              {/* Request Details */}
              <div className="pt-3">
                <Label htmlFor="details">Request Details</Label>
                <Input
                  type="text"
                  placeholder="Enter request details..."
                  className="focus:outline-none placeholder:text-gray-400 focus:ring-2 ring-blue-400/70 block w-full px-2 py-1 rounded-md transition-all duration-300 border border-[#e4e4e4]"
                  value={requestDetails}
                  onChange={(e) => setRequestDetails(e.target.value)}
                />
              </div>

              {/* Tasks Section */}
              <h1 className="pt-6 pb-3 font-semibold text-lg">Tasks</h1>

              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="font-medium text-gray-700">
                      Task {index + 1}
                    </h2>
                    {tasks.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTask(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Task Type Dropdown */}
                  <div className="mb-4">
                    <Label htmlFor={`task-type-${index}`}>Task Type</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between mt-1"
                        >
                          {task.task_type || "Select Task Type"}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full bg-white shadow-xl text-center space-y-2 min-w-(--radix-dropdown-menu-trigger-width)">
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="w-full cursor-pointer"
                          onSelect={() =>
                            handleTaskTypeChange(index, "Management")
                          }
                        >
                          Management
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="w-full cursor-pointer"
                          onSelect={() =>
                            handleTaskTypeChange(index, "Development")
                          }
                        >
                          Development
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="w-full cursor-pointer"
                          onSelect={() => handleTaskTypeChange(index, "Design")}
                        >
                          Design
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="w-full cursor-pointer"
                          onSelect={() =>
                            handleTaskTypeChange(index, "Testing")
                          }
                        >
                          Testing
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="w-full cursor-pointer"
                          onSelect={() =>
                            handleTaskTypeChange(index, "Documentation")
                          }
                        >
                          Documentation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor={`details-${index}`}>Details</Label>
                    <Textarea
                      id={`details-${index}`}
                      placeholder="Enter task details"
                      className="focus:outline-none placeholder:text-gray-400 focus:ring-2 ring-blue-400/70 block w-full px-2 py-1 rounded-md transition-all duration-300 border border-[#e4e4e4] mt-1"
                      value={task.details}
                      onChange={(e) =>
                        handleTaskDetailsChange(index, e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      placeholder="Enter task description"
                      className="focus:outline-none placeholder:text-gray-400 focus:ring-2 ring-blue-400/70 block w-full px-2 py-1 rounded-md transition-all duration-300 border border-[#e4e4e4] mt-1"
                      value={task.description}
                      onChange={(e) =>
                        handleTaskDescriptionChange(index, e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}

              <div className="pt-4 flex items-center gap-2 w-full">
                <Button
                  type="button"
                  onClick={addTask}
                  className="flex items-center gap-2 border border-[#e4e4e4] w-1/2 cursor-pointer"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                  Add Task
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-1/2 bg-blue-500 text-white cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
