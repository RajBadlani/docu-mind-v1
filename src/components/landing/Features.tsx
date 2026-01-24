import React from 'react'
import { MagicCard } from '../ui/magic-card'
import Image from 'next/image'

const Features = () => {
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
                        src="/featuresImg.png"
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
  )
}

export default Features