import { Check, X } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import Link from "next/link";

const pricingPlans = [
  {
    id: "free",
    label: "Basic",
    price: "Free",
    period: "/ forever",
    description: "For trying things out and small documents",
    popular: true,
    highlight: true,
    ctaText: "Get Started",
    ctaDisabled: false,
    features: [
      { text: "Upload up to 3 PDFs per user", available: true },
      { text: "Each PDF up to 20 pages", available: true },
      { text: "Text-based PDFs only", available: true },
      { text: "Chat & ask questions", available: true },
      { text: "Images & tables are ignored", available: false },
    ],
  },
  {
    id: "pro",
    label: "Pro",
    price: "$5",
    period: "/ month",
    description: "For power users and serious documents",
    popular: false,
    highlight: false,
    ctaText: "Coming Soon",
    badge: "Coming Soon",
    ctaDisabled: true,
    features: [
      { text: "Unlimited PDFs", available: true },
      { text: "Each PDF up to 100 pages", available: true },
      { text: "Supports images & tables", available: true },
      { text: "Faster & more accurate responses", available: true },
      { text: "Priority feature updates", available: true },
    ],
  },
];

export function PricingSection() {
  return (
    <section
      className="relative w-full px-4 sm:px-6 lg:px-8 mt-24 mb-20 scroll-mt-24"
      id="pricing"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-blue-100/30 blur-[100px] rounded-full -z-10" />

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Start for free, upgrade when you need more power.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative flex flex-col p-8 rounded-3xl transition-all duration-300
              ${
                plan.highlight
                  ? "bg-white border-2 border-blue-500 shadow-xl shadow-blue-500/10 scale-100 md:scale-105 z-10"
                  : "bg-white/60 border border-gray-200 backdrop-blur-sm hover:border-blue-200 hover:shadow-lg"
              }
            `}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute top-0 right-0 -mr-2 -mt-2">
                <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md">
                  Most Popular
                </span>
              </div>
            )}

            {/* Coming Soon Badge (Overlay for Pro) */}
            {plan.badge && (
              <span className="absolute top-4 right-4 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                {plan.badge}
              </span>
            )}

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {plan.label}
              </h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-gray-500 font-medium">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {plan.description}
              </p>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  {feature.available ? (
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <Check size={12} className="text-blue-600" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                      <X size={12} className="text-gray-400" />
                    </div>
                  )}
                  <span
                    className={`text-sm ${
                      feature.available
                        ? "text-gray-700"
                        : "text-gray-400 line-through"
                    }`}
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              {plan.ctaDisabled ? (
                <button
                  disabled
                  className="
                   w-full py-3 px-6 rounded-xl border border-gray-200
                   bg-gray-50 text-sm font-semibold
                   text-gray-400 cursor-not-allowed
                 "
                >
                  {plan.ctaText}
                </button>
              ) : (
                <Link href="/log-in" className="block w-full">
                  <ShinyButton className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 py-3 rounded-xl">
                    {plan.ctaText}
                  </ShinyButton>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
