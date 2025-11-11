import { LogOut } from "lucide-react";

export default function Dashboard() {
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
              <input
                type="text"
                placeholder="Details of the errand"
                className="focus:outline-none placeholder:text-gray-400 focus:ring-2 ring-blue-400/70 block w-full px-2 py-1 rounded-md transition-all duration-300 border border-[#e4e4e4]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
