'use client'; // Must be a client component to use hooks like useRouter and useSelector

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import NavBar from "@/components/layout/NavBar";
import { RootState } from "@/store/store"; // RootState from your store
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Get admin login state from Redux
  const isAdminLoggedIn = useSelector(
    (state: RootState) => state.admin.isAdminLoggedIn
  );

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isAdminLoggedIn) {
      router.replace("/admin/login"); // use replace to prevent back navigation
    }
  }, [isAdminLoggedIn, router]);

  // While redirecting, don't render admin content
  if (!isAdminLoggedIn) return null;

  return (
    <div className={`${montserrat.variable} min-h-screen bg-app-bg`}>
      <NavBar />
      <div className="p-5 md:py-10 md:px-25">
        {children}
      </div>
    </div>
  );
}
