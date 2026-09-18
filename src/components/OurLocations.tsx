import Link from "next/link";

type LocationCard = {
  label: string;
  name: string;
  address: string;
  phone?: string;
  mapUrl: string;
  note?: string;
  accent: string;
};

const locations: LocationCard[] = [
  {
    label: "Head Office · South India",
    name: "Chennai, Tamil Nadu",
    address: "10/21, Vasuki Street, Cholapuram, Ambattur, Chennai - 600053, Tamil Nadu, India",
    phone: "+91-81223 78860",
    mapUrl: "https://www.google.com/maps?q=13.122041492078642,80.14473080170454",
    accent: "from-primary-600 to-blue-700",
  },
  {
    label: "Regional Office · North India",
    name: "Hooghly, West Bengal",
    address: "No. 203, Jagannath Apartments, Sheoraphuli, Hooghly - 712223, West Bengal, India",
    phone: "070108 57506",
    mapUrl: "https://www.google.com/maps?q=22.77103758410416,88.322645",
    accent: "from-blue-600 to-primary-800",
  },
  {
    label: "Manufacturing Facility",
    name: "Somangalam, Chennai",
    address: "No. 109, High Tech City, Pazhanallur, Somangalam, Chennai - 600069, Tamil Nadu, India",
    note: "Production facility — for orders and support, please use the office contacts above.",
    mapUrl: "https://www.google.com/maps?q=12.957928570733447,80.0332898772614",
    accent: "from-slate-600 to-slate-800",
  },
];

export default function OurLocations() {
  return (
    <div className="not-prose">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <div
            key={loc.name}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col"
          >
            <div className={`bg-gradient-to-r ${loc.accent} px-5 py-3`}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/90">{loc.label}</p>
              <p className="text-lg font-bold text-white mt-0.5">{loc.name}</p>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{loc.address}</p>
              {loc.phone && (
                <a
                  href={`tel:${loc.phone.replace(/[^\d+]/g, "")}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {loc.phone}
                </a>
              )}
              {loc.note && (
                <p className="mt-3 text-xs text-gray-400 italic">{loc.note}</p>
              )}
              <Link
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-500 hover:text-primary-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                View on Google Maps
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
