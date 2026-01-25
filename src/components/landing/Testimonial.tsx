import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "DocuMind completely changed how I work with long PDFs. I get answers in seconds instead of scrolling endlessly.",
    name: "Aarav Sharma",
    role: "Student",
  },
  {
    quote:
      "This feels like talking to my documents. The accuracy and speed are honestly impressive.",
    name: "Neha Verma",
    role: "Content Researcher",
  },
  {
    quote:
      "I use it daily for reports and notes. Clean UI, no distractions, just answers.",
    name: "Rahul Mehta",
    role: "Startup Founder",
  },
  {
    quote:
      "Finally a tool that understands context. It helps me summarize legal contracts without missing the fine print.",
    name: "Priya Patel",
    role: "Legal Consultant",
  },
];

export function TestimonialSection() {
  return (
    <section
      id="testimonials"
      className="relative mt-24 md:mt-32 w-full px-4 scroll-mt-24 mb-20"
    >
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="h-56 md:h-96 w-full max-w-4xl rounded-full bg-blue-100/30 opacity-60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          What early users are saying
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Feedback from friends and early testers who’ve been using DocuMind to
          work with their PDFs.
        </p>
      </div>

      <div className="mx-auto max-w-6xl">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {testimonials.map((item, idx) => (
              <CarouselItem
                key={idx}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="mb-6">
                    <Quote className="text-blue-200 w-8 h-8 mb-4" />
                    <p className="text-gray-700 text-base leading-relaxed font-medium">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-gray-50 pt-6">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-200">
                      {item.name[0]}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-none mb-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 hover:bg-blue-50 hover:text-blue-600 border-gray-200" />
            <CarouselNext className="static translate-y-0 hover:bg-blue-50 hover:text-blue-600 border-gray-200" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
