import { FeatureCard, FeatureVariant } from "../CardComponent"

const HowItWorks = () => {
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
  return (
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
  )
}

export default HowItWorks