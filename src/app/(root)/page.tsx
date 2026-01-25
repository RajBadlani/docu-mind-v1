import { PricingSection } from "@/components/landing/Pricing";
import { TestimonialSection } from "@/components/landing/Testimonial";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DocuMind AI - Intelligent PDF Chat Assistant",
};

export default async function Home() {
  const user = await getUser();
  if (user) redirect("/dashboard");
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-start py-2 px-4 md:px-8 lg:px-16">
        <HeroSection />
        <HowItWorks />
        <Features />
        <PricingSection />
        <TestimonialSection />
      </main>
    </div>
  );
}
