import { Users, Dot, X } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShinyButton } from "@/components/ui/shiny-button";

const pricingPlans = [
  {
    id: "free",
    label: "Basic",
    price: "Free",
    description: "For trying things out and small documents",
    badge: null,
    highlight: true,
    ctaText: "Get Started",
    ctaDisabled: false,
    features: [
      { text: "Upload up to 5 PDFs per user", available: true },
      { text: "Each PDF up to 20 pages", available: true },
      { text: "Text-based PDFs only", available: true },
      { text: "Chat & ask questions", available: true },
      { text: "Images & tables are ignored", available: false },
    ],
  },
  {
    id: "pro",
    label: "Pro",
    price: "$5 / month",
    description: "For power users and serious documents",
    badge: "Coming soon",
    highlight: false,
    ctaText: "Coming Soon",
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
    <section className="mx-auto max-w-5xl mt-24 mb-20 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative rounded-2xl p-6
              ${
                plan.highlight
                  ? "bg-white border border-blue-200 shadow-sm"
                  : "bg-gray-50 border border-gray-300"
              }
            `}
          >
            {plan.highlight && <BorderBeam colorFrom="#598CF7" colorTo="#618AE8" size={100} borderWidth={2}/>}

            {/* Badge */}
            {plan.badge && (
              <span className="absolute top-4 right-4 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                {plan.badge}
              </span>
            )}

            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <Users
                size={20}
                className={plan.highlight ? "text-blue-600" : "text-gray-600"}
              />
              <p className="text-sm font-medium text-gray-800">{plan.label}</p>
            </div>

            {/* Price */}
            <h3 className="text-3xl font-extrabold text-gray-900 mb-1">
              {plan.price}
            </h3>
            <p className="text-sm text-gray-700 mb-6">{plan.description}</p>

            {/* Features */}
            <ul className="space-y-3 text-sm mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  {feature.available ? (
                    <Dot size={18} className="mt-0.5 text-blue-500" />
                  ) : (
                    <X size={16} className="mt-0.5 text-gray-400" />
                  )}
                  <span
                    className={
                      feature.available ? "text-gray-800" : "text-gray-600"
                    }
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            {plan.ctaDisabled ? (
              <button
                disabled
                className="
                  w-full rounded-full border border-gray-300
                  bg-gray-200 py-2 text-sm font-semibold
                  text-gray-600 cursor-not-allowed
                "
              >
                {plan.ctaText}
              </button>
            ) : (
              <ShinyButton className="w-full bg-blue-600 text-white">
                {plan.ctaText}
              </ShinyButton>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
