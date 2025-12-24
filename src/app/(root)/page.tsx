import { Info } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ShinyButton } from "@/components/ui/shiny-button";
import Image from "next/image";
import { FeatureCard } from "@/components/CardComponent";
import { FeatureVariant } from "@/components/CardComponent";
import { MagicCard } from "@/components/ui/magic-card";
import { PricingSection } from "@/components/Pricing";
import { TestimonialSection } from "@/components/Testimonial";
import { Footer } from "@/components/Footer";

export default function Home() {
  const howItWorkData: {
    variant: FeatureVariant;
    title: string;
    description: string;
  }[] = [
    {
      variant: "upload",
      title: "Bring Your PDFs In",
      description:
        "Upload reports, notes. Our AI reads every page and builds a searchable knowledge base.",
    },
    {
      variant: "chat",
      title: "Talk to Your Documents",
      description:
        "Ask questions in plain English and get accurate, contextual answers from your files.",
    },
    {
      variant: "insights",
      title: "Unlock Insights",
      description:
        "Generate summaries, key points, and answers without digging through pages.",
    },
  ];

  const featureCard = [
    {
      title: "Your documents, now interactive",
      description:
        "Instead of reading PDFs, talk to them. Explore ideas, clarify details, and uncover insights instantly.",
    },
    {
      title: "Ask questions, get precise answers",
      description:
        "Ask natural questions and receive clear, focused answers directly grounded in your documents.",
    },
    {
      title: "Built for accuracy you can trust",
      description:
        "Every answer is generated from relevant document sections, so responses stay factual and reliable.",
    },
    {
      title: "Understand specific pages in seconds",
      description:
        "Summarize pages, explain sections, or drill into details without scanning the entire document.",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-start py-2 px-4 md:px-8 lg:px-16">
        <section>
          <div className="flex justify-center items-center mt-10">
            <AnimatedGradientText
              speed={1.8}
              colorFrom="#2563EB"
              colorTo="#38BDF8"
              className="flex items-center justify-center gap-3 font-semibold tracking-tight border-2 border-blue-300 px-6 md:px-8 py-2 rounded-full"
            >
              <Info className="text-blue-400" height={20} width={20} />
              Chat with your PDFs using AI
            </AnimatedGradientText>
          </div>

          <div className="mt-8 text-center relative">
            <div className="absolute inset-0 flex justify-center -z-10">
              <div className="h-28 w-96 rounded-full blur-3xl opacity-25 bg-linear-to-r from-blue-300 via-cyan-300 to-blue-300" />
            </div>

            <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-gray-900">
              Turn silent PDFs into <br />
              <span className="block h-[1.3em] min-w-[22ch] overflow-hidden bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
                <TypingAnimation
                  words={[
                    "smart conversations",
                    "instant answers",
                    "searchable knowledge",
                    "clear insights",
                  ]}
                  typeSpeed={50}
                  deleteSpeed={40}
                  pauseDelay={2000}
                  showCursor={false}
                  loop
                />
              </span>
            </h1>

            <p className="mt-3 max-w-2xl mx-auto text-base md:text-lg text-gray-600">
              Upload documents, ask natural questions, and get precise answers
              powered by AI.
            </p>
          </div>

          <div className="flex justify-center items-center mt-7 py-2">
            <ShinyButton className="bg-blue-600 text-white font-bold w-40 h-10">
              Get Started
            </ShinyButton>
          </div>
        </section>

        <section className="relative mt-12 md:mt-18 w-full">
          <div className="mx-auto max-w-6xl px-2">
            <div className="relative mx-auto max-w-5xl">
              <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                </div>

                <Image
                  src="/image.png"
                  alt="PDF Chatbot preview"
                  width={1400}
                  height={900}
                  className="w-full object-cover p-2"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-work"
          className="relative mt-24 md:mt-30 w-full scroll-mt-24"
        >
          <div className="absolute inset-0 flex justify-center -z-10">
            <div className="h-52 w-96 rounded-full blur-3xl opacity-25 bg-linear-to-r from-blue-300 via-sky-300 to-cyan-300" />
          </div>

          <div className="mx-auto max-w-6xl px-4 mb-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                How it works
              </h2>
              <p className="mt-4 text-gray-600 text-base md:text-lg">
                From upload to insight in three simple steps
              </p>
            </div>

            <div className="mt-10 md:mt-12 grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-3">
              {howItWorkData.map((ele, idx) => (
                <div key={idx}>
                  <FeatureCard
                    variant={ele.variant}
                    description={ele.description}
                    title={ele.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="features"
          className="mt-24 relative w-full px-2 scroll-mt-24"
        >
          <div className="absolute inset-0 flex justify-center -z-10">
            <div className="h-64 w-lg rounded-full blur-3xl opacity-15 bg-linear-to-r from-blue-300 via-sky-300 to-cyan-300" />
          </div>

          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Features
            </h2>
            <p className="mt-4 text-gray-600 text-base md:text-lg">
              Built for understanding documents,
              <span className="text-blue-600"> not just searching them</span>
            </p>
          </div>

          <div className="mx-auto max-w-full mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
              <div className="flex justify-center">
                <div className="relative aspect-4/3 lg:aspect-auto h-auto lg:h-full w-full max-w-125 rounded-lg overflow-hidden border-4 border-gray-300">
                  <Image
                    alt="feature-image"
                    src="/image.png"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {featureCard.map((ele, idx) => (
                  <MagicCard
                    key={idx}
                    gradientColor="#e3efff"
                    className="group rounded-2xl bg-white/70 backdrop-blur-sm border border-blue-100 p-5 transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-0.5"
                  >
                    <h3 className="text-base md:text-lg font-semibold tracking-tight text-black mb-1.5">
                      {ele.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {ele.description}
                    </p>
                  </MagicCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="mt-20 md:mt-24 relative w-full px-2 scroll-mt-24"
        >
          <div className="absolute inset-0 flex justify-center -z-10">
            <div className="h-64 w-lg rounded-full blur-3xl opacity-15 bg-linear-to-r from-blue-300 via-sky-300 to-cyan-300" />
          </div>

          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Pricing built for trust
            </h2>
            <p className="mt-4 text-gray-600 text-base md:text-lg">
              Transparent plans with predictable costs, so you always know what
              you&apos;re paying for.
            </p>
          </div>

          <PricingSection />
        </section>

        <TestimonialSection />
        <Footer />
      </main>
    </div>
  );
}
