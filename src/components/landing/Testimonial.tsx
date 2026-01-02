import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
];

export function TestimonialSection() {
  return (
    <section
      id="testimonials"
      className="relative mt-16 md:mt-22 w-full px-4 scroll-mt-24"
    >
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="h-56 md:h-72 w-88 md:w-lg rounded-full bg-linear-to-r from-blue-300 via-sky-300 to-cyan-300 opacity-20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          What early users are saying
        </h2>
        <p className="mt-3 md:mt-4 text-gray-700 text-sm md:text-lg">
          Feedback from friends and early testers who’ve been using DocuMind to
          work with their PDFs.
        </p>
      </div>

      <div className=" mx-auto max-w-5xl">
        <Carousel opts={{ align: "start" }}>
          <CarouselContent>
            {testimonials.map((item, idx) => (
              <CarouselItem
                key={idx}
                className="basis-full md:basis-1/2 px-4"
              >
                <div className="h-full min-h-50 md:min-h-55 rounded-2xl bg-white/70 backdrop-blur-md border border-blue-200 p-5 md:p-6 shadow-sm flex flex-col justify-between">
                  <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                    “{item.quote}”
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 text-white flex items-center justify-center font-semibold shrink-0">
                      {item.name[0]}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900 leading-none">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
