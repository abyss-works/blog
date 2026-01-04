import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import { UserNav } from "@/components/layout/user-nav";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Abyssworks Studio",
  description: "Exploring the depths of engineering and design.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch profile for additional data like avatar/username/role
  let profile = null;
  if (user) {
    profile = await prisma.profile.findUnique({
      where: { id: user.id }
    });
  }

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#050505] text-zinc-100`}>
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-[#050505]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight text-zinc-100">
              ABYSSWORKS
            </Link>
            
            <nav className="flex items-center gap-6">
              {/* Add more nav links here if needed */}
              <UserNav user={user} profile={profile} />
            </nav>
          </div>
        </header>

        <div className="pt-16 min-h-screen flex flex-col">
           {children}
        </div>
        
        <footer className="border-t border-zinc-900 py-12 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6 text-center text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} Abyssworks Studio. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
