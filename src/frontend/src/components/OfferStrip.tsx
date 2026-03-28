import { Tag } from "lucide-react";
import { motion } from "motion/react";

const OFFERS = [
  {
    headline: "50% OFF",
    sub: "on your first order",
    code: "FIRST50",
    gradient: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
    badge: "New User",
  },
  {
    headline: "FREE Delivery",
    sub: "on orders above ₹299",
    code: "FREEDEL",
    gradient: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
    badge: "Limited Time",
  },
  {
    headline: "Buy 1 Get 1",
    sub: "on all Desserts today",
    code: "BOGO50",
    gradient: "linear-gradient(135deg, #9333EA 0%, #EC4899 100%)",
    badge: "Today Only",
  },
];

export function OfferStrip() {
  return (
    <section className="py-10" style={{ background: "#F3F4F6" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="text-2xl font-extrabold"
              style={{ color: "#111827" }}
            >
              🔥 Hot Deals
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "#6B7280" }}>
              Limited-time offers you don&apos;t want to miss
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.code}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl p-5 overflow-hidden cursor-pointer"
              style={{ background: offer.gradient }}
              data-ocid={`offer.card.${i + 1}`}
            >
              {/* Decorative circles */}
              <div
                className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20"
                style={{ background: "rgba(255,255,255,0.4)" }}
              />
              <div
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-10"
                style={{ background: "rgba(255,255,255,0.4)" }}
              />

              <span
                className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3"
                style={{ background: "rgba(255,255,255,0.25)", color: "white" }}
              >
                {offer.badge}
              </span>

              <h3 className="text-2xl font-extrabold text-white leading-tight">
                {offer.headline}
              </h3>
              <p className="text-sm text-white/80 mt-1 mb-4">{offer.sub}</p>

              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-white/70" />
                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                  }}
                >
                  {offer.code}
                </span>
                <span className="text-xs text-white/70 ml-1">tap to copy</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
