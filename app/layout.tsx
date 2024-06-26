import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "5e.no",
  description: "Create short links and sharable contact cards.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-start max-w-md mx-auto px-4 py-8 space-y-8">
          <header className="flex items-center justify-center w-full">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={64} height={64} />
            </Link>
          </header>
          {children}
          <footer className="text-center px-2">
            <p className="text-sm text-muted-foreground">
              Built by{" "}
              <Link
                className="underline underline-offset-4 hover:text-foreground"
                target="_blank"
                href="https://github.com/ebakken"
              >
                ebakken
              </Link>
              . Source code available on{" "}
              <Link
                className="underline underline-offset-4 hover:text-foreground"
                target="_blank"
                href="https://github.com/ebakken/5e.no"
              >
                GitHub
              </Link>
              .
            </p>
          </footer>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
