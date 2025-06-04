import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";


export const metadata = {
  title: "NotesApp - Sultan",
  description: "Aplikasi Catatan Sederhana ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={`antialiased flex flex-col min-h-screen`}>
      {/* Pass isLoggedIn to Navbar */}
      <Navbar/>
      <section className="p-4 bg-gray-800 flex-grow">{children}</section>
      <Footer />
      <Toaster />
    </body>
  </html>
  );
}
