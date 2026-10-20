import {
  IconBadgeCheck,
  IconBarChart,
  IconCoin,
  IconDroplet,
  IconFactory,
  IconHospital,
  IconLandmark,
  IconLeaf,
  IconPackage,
  IconRecycle,
  IconScale,
  IconShield,
  IconSmartphone,
  IconSparkle,
  IconThermometer,
  IconTrendDown,
  IconTruck,
  IconVolumeOff,
  IconWrench,
} from "@/components/store/icons";

/** Maps the emoji icons older page data uses onto the site's line-icon set. */
const EMOJI: Record<string, (p: { className?: string }) => JSX.Element> = {
  "📉": IconTrendDown,
  "🇮🇳": IconBadgeCheck,
  "🏛️": IconLandmark,
  "♻️": IconRecycle,
  "🔧": IconWrench,
  "💰": IconCoin,
  "🏭": IconFactory,
  "⚖️": IconScale,
  "✅": IconBadgeCheck,
  "🧹": IconSparkle,
  "🚚": IconTruck,
  "🔇": IconVolumeOff,
  "📱": IconSmartphone,
  "📦": IconPackage,
  "📊": IconBarChart,
  "💧": IconDroplet,
  "🏥": IconHospital,
  "🌿": IconLeaf,
  "🌡️": IconThermometer,
};

export function FeatureIcon({ icon, className = "h-5 w-5" }: { icon?: string; className?: string }) {
  const Icon = (icon && EMOJI[icon]) || IconShield;
  return <Icon className={className} />;
}

type Item = { icon?: string; title: React.ReactNode; body: React.ReactNode };

/** Hairline-divided feature grid ("spec sheet" look) with line icons. */
export default function FeatureGrid({ items, columns = 3 }: { items: Item[]; columns?: 2 | 3 | 4 }) {
  const cols = columns === 4 ? "lg:grid-cols-4" : columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return (
    <ul className={`grid overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 ${cols} [&>li]:bg-surface`} style={{ gap: 1 }}>
      {items.map((f, k) => (
        <li key={k} className="spotlight group relative p-7 transition-colors hover:bg-subtle sm:p-8">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-canvas text-brand transition-colors group-hover:border-primary-200">
              <FeatureIcon icon={f.icon} />
            </span>
            <span className="font-mono text-xs text-muted/70">{String(k + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="mt-6 font-display text-[17px] font-semibold leading-snug text-ink">{f.title}</h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-body">{f.body}</p>
        </li>
      ))}
    </ul>
  );
}
