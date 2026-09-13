import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/components/app-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ToastHost } from "@/components/toast";

export const metadata: Metadata = {
  title: "MotoPart - Motorcycle Workshop OS",
  description: "OS bengkel motor Indonesia: catalog parts, fitment matcher, diagnostic decision tree, service interval scheduler, repair cost estimator, price competitiveness index, and shareable garage page. Local-first, offline-capable, free forever.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>
          <SiteHeader />
          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
          <SiteFooter />
          <ToastHost />
        </AppProvider>
      </body>
    </html>
  );
}
