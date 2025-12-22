import { BorderBeam } from "./ui/border-beam";

export type FeatureVariant = "upload" | "chat" | "insights";

interface FeatureCardProps {
  title: string;
  description: string;
  variant: FeatureVariant;
}

export function FeatureCard({ title, description, variant }: FeatureCardProps) {
  return (
    <div
      className="
        relative
        rounded-2xl
        bg-white
        p-6
        border
        border-gray-100
        shadow-sm
        hover:shadow-md
        transition-shadow
        h-full
        flex
        flex-col
        overflow-hidden
      "
    >
      <BorderBeam
        duration={6}
        size={150}
        borderWidth={2}
        className="from-transparent via-sky-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={150}
        borderWidth={2}
        className="from-transparent via-blue-500 to-transparent"
      />

      {/* Title */}
      <h3 className="text-center text-base font-semibold text-gray-900">
        {title}
      </h3>

      {/* Visual */}
      <div className="relative mt-6 flex-1 rounded-xl bg-linear-to-b from-gray-50 to-white flex items-center justify-center">
        {variant === "upload" && <UploadVisual />}
        {variant === "chat" && <ChatVisual />}
        {variant === "insights" && <InsightsVisual />}
      </div>

      {/* Description */}
      <p className="mt-6 text-sm text-gray-600 leading-relaxed text-center">
        {description}
      </p>
    </div>
  );
}

const VISUAL_CLASS =
  "w-[200px] h-[140px] rounded-xl bg-white border border-gray-100 shadow-sm p-4 flex flex-col justify-between";

function UploadVisual() {
  return (
    <div className={VISUAL_CLASS}>
      <div className="h-8 rounded-md bg-blue-50 flex items-center justify-center text-xs font-semibold text-blue-600">
        Upload PDF
      </div>

      <div className="space-y-2">
        <div className="h-2 w-full rounded bg-gray-200" />
        <div className="h-2 w-5/6 rounded bg-gray-100" />
        <div className="h-2 w-2/3 rounded bg-gray-100" />
      </div>
    </div>
  );
}

function ChatVisual() {
  return (
    <div className={VISUAL_CLASS}>
      <div className="h-5 w-3/4 rounded-md bg-gray-100" />
      <div className="h-5 w-2/3 rounded-md bg-blue-100 self-end" />
      <div className="h-5 w-4/5 rounded-md bg-gray-100" />
      <div className="h-5 w-1/2 rounded-md bg-blue-100 self-end" />
    </div>
  );
}

function InsightsVisual() {
  return (
    <div className={VISUAL_CLASS}>
      <div className="h-3 w-1/3 rounded bg-green-200" />

      <div className="space-y-2">
        <div className="h-2 w-full rounded bg-gray-200" />
        <div className="h-2 w-5/6 rounded bg-gray-100" />
        <div className="h-2 w-4/6 rounded bg-gray-100" />
      </div>

      <div className="h-6 rounded-md bg-green-50 flex items-center justify-center text-xs font-semibold text-green-700">
        Insight Ready
      </div>
    </div>
  );
}
