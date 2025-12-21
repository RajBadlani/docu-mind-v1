import Navbar from "@/components/Navbar";
import { Info } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ShinyButton } from "@/components/ui/shiny-button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex h-screen w-full max-w-5xl flex-col items-center justify-between py-4 px-16">
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

        <section className="border-2 border-red-500"></section>
      </main>
    </div>
  );
}
