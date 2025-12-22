import { Info } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ShinyButton } from "@/components/ui/shiny-button";
import Image from "next/image";
import { FeatureCard } from "@/components/CardComponent";
import { FeatureVariant } from "@/components/CardComponent";
import { BorderBeam } from "@/components/ui/border-beam";

export default function Home() {
  const featureCard: {
    variant: FeatureVariant;
    title: string;
    description: string;
  }[] = [
    {
      variant: "upload",
      title: "Bring Your PDFs In",
      description:
        "Upload reports, notes.Our AI reads every page and builds a searchable knowledge base.",
    },
    {
      variant: "chat",
      title: "Talk to Your Documents",
      description: "Ask questions in plain English and get accurate, contextual answers from your files.",
    },
    {
      variant: "insights",
      title: "Unlock Insights",
      description: "Generate summaries, key points, and answers without digging through pages.",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center font-sans ">
      <main className="flex h-screen w-full max-w-5xl flex-col items-center justify-start py-4 px-16 ">
        <section>
          <div className="flex justify-center items-center mt-10">
            <AnimatedGradientText
              speed={1.8}
              colorFrom="#2563EB"
              colorTo="#38BDF8"
              className="flex items-center justify-center gap-3 font-semibold tracking-tight border-2 border-blue-300 px-8 py-2 rounded-full"
            >
              <Info className="text-blue-400" height={20} width={20} />
              Chat with your PDFs using AI
            </AnimatedGradientText>
          </div>

          <div className="mt-8 text-center relative">
            <div className="absolute inset-0 flex justify-center -z-10">
              <div className="h-28 w-115 rounded-full blur-3xl opacity-25 bg-linear-to-r from-blue-300 via-sky-300 to-cyan-300" />
            </div>

            <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-gray-900">
              Turn silent PDFs into <br />
              <span
                className="
                  block
                  h-[1.3em]
                  min-w-[22ch]
                  overflow-hidden
                  bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500
                  bg-clip-text text-transparent
                "
              >
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

        {/*  Add the screen preview of chatbot */}
        <section className="relative mt-8 w-full ">
          <div className="mx-auto max-w-6xl px-2">
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 -z-10 flex justify-center">
                <div className="h-72 w-96 rounded-full bg-cyan-300/30 blur-3xl" />
              </div>

              <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                </div>

                {/* Image */}
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

        {/* How is works */}
        <section className="relative mt-20 w-full">
          <div className="absolute inset-0 -z-10 flex justify-center">
            <div className="h-72 w-150 rounded-full bg-blue-100/20 blur-3xl" />
          </div>
          <div className="mx-auto max-w-6xl px-4 mb-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                How it works
              </h2>
              <p className="mt-3 text-gray-600">
                From upload to insight in three simple steps
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {featureCard.map((ele, idx) => (
                <div key={idx} className="cursor-pointer">
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
      </main>
    </div>
  );
}
