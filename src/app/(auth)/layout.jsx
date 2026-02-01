export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 relative">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
