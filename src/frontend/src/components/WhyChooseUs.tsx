import { motion } from "motion/react";

const FEATURES = [
  {
    icon: "⚡",
    title: "30-Min Delivery",
    description:
      "Hot food at your door in 30 minutes or less, guaranteed. No cold plates, ever.",
    bg: "#FFF7ED",
    border: "#FED7AA",
    iconBg: "#F97316",
  },
  {
    icon: "🛡️",
    title: "Hygienic & Safe",
    description:
      "All restaurant partners follow strict hygiene protocols. Tamper-proof packaging on every order.",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    iconBg: "#16A34A",
  },
  {
    icon: "💳",
    title: "Easy Payments",
    description:
      "UPI, cards, wallets, COD — pay your way. 100% secure checkout with instant confirmation.",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    iconBg: "#2563EB",
  },
  {
    icon: "🎁",
    title: "Daily Offers",
    description:
      "New deals every single day. Exclusive discounts for loyal customers and first-time users.",
    bg: "#FDF4FF",
    border: "#E9D5FF",
    iconBg: "#9333EA",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
            style={{ background: "#FFF7ED", color: "#F97316" }}
          >
            Why QuickBite?
          </span>
          <h2 className="text-3xl font-extrabold" style={{ color: "#111827" }}>
            Food delivery, done right
          </h2>
          <p
            className="mt-2 text-base max-w-xl mx-auto"
            style={{ color: "#6B7280" }}
          >
            We obsess over every detail so your meal arrives perfect, every
            time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl p-6 border-2 transition-shadow"
              style={{ background: f.bg, borderColor: f.border }}
              data-ocid={`why.feature.${i + 1}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 shadow-sm"
                style={{ background: f.iconBg }}
              >
                {f.icon}
              </div>
              <h3
                className="font-bold text-base mb-2"
                style={{ color: "#111827" }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#6B7280" }}
              >
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
