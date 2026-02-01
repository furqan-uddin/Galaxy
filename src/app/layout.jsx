import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased text-gray-900 bg-gray-50/30">
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
