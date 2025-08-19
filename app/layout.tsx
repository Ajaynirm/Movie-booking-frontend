// app/layout.tsx
'use client'

import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import { Header } from "@/components/Header";
import { GlobalProvider } from "@/store/GlobalProvider";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider"; // ✅ import here
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideHeader = pathname === "/search";

  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* ✅ ThemeProvider must wrap everything */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {!hideHeader && <Header />}

            <GlobalProvider>
              {children}
            </GlobalProvider>
            <Analytics />

            <Toaster position="top-center" expand={false} />
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}

