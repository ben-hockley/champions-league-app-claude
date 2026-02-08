import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "UEFA Champions League Players & Statistics",
  description:
    "Browse UEFA Champions League players and their statistics powered by ESPN data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900 min-h-screen">
        <header className="bg-[#1a1a2e] text-white shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              ⚽ UCL Players
            </Link>
            <div className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-blue-300 transition-colors">
                Home
              </Link>
              <Link
                href="/players"
                className="hover:text-blue-300 transition-colors"
              >
                Players
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-[#1a1a2e] text-gray-400 text-center py-6 mt-12 text-sm">
          <p>
            UEFA Champions League Players &amp; Statistics — Data from ESPN API
          </p>
        </footer>
      </body>
    </html>
  );
}
