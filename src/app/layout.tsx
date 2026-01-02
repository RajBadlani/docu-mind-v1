import { Toaster } from "sonner";
import "./globals.css";
import { Victor_Mono } from "next/font/google";

const victorMono = Victor_Mono({
  variable: "--font-victor-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={victorMono.variable}>
      <body className="bg-pattern antialiased">
        {children}
        <Toaster position="top-center" richColors/>
      </body>
    </html>
  );
}
