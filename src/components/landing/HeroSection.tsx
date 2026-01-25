import { Info } from "lucide-react";
import { AnimatedGradientText } from "../ui/animated-gradient-text";
import { TypingAnimation } from "../ui/typing-animation";
import { ShinyButton } from "../ui/shiny-button";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <section>
        <div className="flex justify-center items-center mt-10">
          <AnimatedGradientText
            speed={1.8}
            colorFrom="#6891e9ff"
            colorTo="#2f6fd4ff"
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

          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-gray-900 px-2">
            Turn silent PDFs into <br />
            <span className="inline-block mt-1 sm:mt-0 h-[1.3em] w-full sm:w-auto sm:min-w-[22ch] overflow-hidden bg-linear-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent align-bottom">
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
          <Link href={"/sign-up"}>
            <ShinyButton className="bg-blue-600 text-white font-bold w-40 h-10">
              Get Started
            </ShinyButton>
          </Link>
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
                src="/heroSection.png"
                alt="PDF Chatbot preview"
                width={1400}
                height={900}
                className="w-full object-cover p-2 "
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
