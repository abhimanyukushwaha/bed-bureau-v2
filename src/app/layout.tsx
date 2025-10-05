import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import AppInitializer from "@/middleware/AppInitializer";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "My App",
  description: "Next.js with Montserrat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="h-full">
        <Providers>
          <AppInitializer />
          {children}
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 2000,
              style: {
                padding: "16px",
                borderRadius: "12px",
                fontWeight: "bold",
                color: "#fff",
                fontSize: "14px",
              },
              success: {
                style: {
                  background: "linear-gradient(90deg, #4ade80, #16a34a)", // green gradient
                },
              },
              error: {
                style: {
                  background: "linear-gradient(90deg, #f87171, #b91c1c)", // red gradient
                },
              },
              loading: {
                style: {
                  background: "linear-gradient(90deg, #60a5fa, #1e3a8a)", // blue gradient
                },
              },
              custom: {
                style: {
                  background: "linear-gradient(90deg, #facc15, #b45309)", // amber/orange
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
