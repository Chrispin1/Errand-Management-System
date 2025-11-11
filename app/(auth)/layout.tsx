export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center pt-12 pb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Errand Management System
          </h1>
          <p className="text-gray-600">
            Streamline your service requests with ease
          </p>
        </div>

        <div className="pb-12">{children}</div>

        <div className="text-center pb-8">
          <p className="text-gray-500 text-sm">
            © 2025 Errand Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
