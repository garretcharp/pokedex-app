import "./globals.css";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const metadata = {
  title: "Pokedex",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-slate-700 dark:text-white">
        <nav className="mt-5 flex h-5 items-center justify-center space-x-4 text-lg">
          <Link href="/">Home</Link>
          <Separator orientation="vertical" />
          <Link href="/pokedex">Pokedex</Link>
        </nav>

        <main className="flex min-h-screen items-center mx-auto flex-col p-5">
          {children}
        </main>
      </body>
    </html>
  );
}
