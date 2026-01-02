import Navbar from "@/components/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}
