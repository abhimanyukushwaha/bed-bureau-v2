'use client'; // Must be client to use useRouter & Redux

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import NavBar from "@/components/layout/NavBar";
import { AdminState } from "@/store/reducerSlice/adminReducer";
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
    (state: { admin: AdminState }) => state.admin.isAdminLoggedIn
  );

  // Redirect to login if not logged in
  if (!isAdminLoggedIn) {
    router.push("/login");
    return null; // Prevent rendering
  }

  return (
    <div className={`${montserrat.variable} h-screen bg-app-bg`}>
      <NavBar />
      <div className="p-5 md:py-10 md:px-25">
        {children}
      </div>
    </div>
  );
}
