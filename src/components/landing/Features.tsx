import React from "react";
import { MagicCard } from "../ui/magic-card";
import {
  BookOpenText,
  MessageCircleQuestion,
  ShieldCheck,
  Zap,
} from "lucide-react";

const Features = () => {
  const featureCard = [
    {
      title: "Your documents, now interactive",
      description:
        "Instead of reading PDFs, talk to them. Explore ideas, clarify details, and uncover insights instantly.",
      icon: <BookOpenText className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Ask questions, get precise answers",
      description:
        "Ask natural questions and receive clear, focused answers directly grounded in your documents.",
      icon: <MessageCircleQuestion className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Built for accuracy you can trust",
      description:
        "Every answer is generated from relevant document sections, so responses stay factual and reliable.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Understand specific pages in seconds",
      description:
        "Summarize pages, explain sections, or drill into details without scanning the entire document.",
      icon: <Zap className="w-6 h-6 text-blue-600" />,
    },
  ];

  return (
    <section
      id="features"
      className="mt-24 relative w-full px-4 sm:px-6 lg:px-8 scroll-mt-24"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 flex justify-center -z-10 overflow-hidden">
        <div className="h-64 w-96 rounded-full blur-[100px] opacity-20 bg-blue-200/50" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Features
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Built for understanding documents,
            <span className="text-blue-600 font-medium">
              {" "}
              not just searching them
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featureCard.map((ele, idx) => (
            <MagicCard
              key={idx}
              gradientColor="#e3efff"
              className="group relative flex flex-col items-start gap-4 rounded-2xl bg-white/60 backdrop-blur-md border border-gray-100 p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200"
            >
              <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                {ele.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {ele.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {ele.description}
                </p>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
