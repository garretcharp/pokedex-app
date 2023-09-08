import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next on Cloudflare",
  description: "D1, KV in NextJS on Cloudflare Workers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <main className="flex min-h-screen items-center mx-auto flex-col p-24">
          {children}
        </main>
      </body>
    </html>
  );
}
