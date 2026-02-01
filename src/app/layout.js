import "./globals.css";

export const metadata = {
  title: "Galaxy Assignment",
  description: "Technical assignment for Galaxy Weblinks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
