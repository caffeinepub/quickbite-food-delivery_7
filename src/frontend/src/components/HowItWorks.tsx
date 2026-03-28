import { motion } from "motion/react";

const STEPS = [
  {
    emoji: "📍",
    step: "01",
    title: "Choose Your Location",
    description:
      "Enter your delivery address and we'll show you the best restaurants and dishes available near you.",
  },
  {
    emoji: "🍽️",
    step: "02",
    title: "Pick Your Food",
    description:
      "Browse menus, filter by category, check ratings, and add your favourites to the cart in seconds.",
  },
  {
    emoji: "🚴",
    step: "03",
    title: "Get it Delivered",
    description:
      "Our delivery partners race to your door. Track your order live and enjoy hot, fresh food in minutes.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
            style={{ background: "#FFF7ED", color: "#F97316" }}
          >
            Simple & Fast
          </span>
          <h2 className="text-3xl font-extrabold" style={{ color: "#111827" }}>
            How QuickBite Works
          </h2>
          <p className="mt-2 text-base" style={{ color: "#6B7280" }}>
            Three easy steps to the best meal of your day
          </p>
        </motion.div>

        <div className="relative flex flex-col md:flex-row items-start gap-8">
          {/* Connector line on md+ */}
          <div
            className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-0.5"
            style={{
              background:
                "linear-gradient(to right, #F97316, #F97316 50%, #E5E7EB 50%)",
            }}
            aria-hidden="true"
          />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex-1 flex flex-col items-center text-center relative"
              data-ocid={`howit.step.${i + 1}`}
            >
              {/* Step circle */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-5 relative z-10 shadow-md"
                style={{
                  background: i === 0 ? "#F97316" : "#F3F4F6",
                  border: i === 0 ? "none" : "2px solid #E5E7EB",
                }}
              >
                {s.emoji}
              </div>

              {/* Step badge */}
              <span
                className="text-xs font-extrabold uppercase tracking-widest mb-2"
                style={{ color: i === 0 ? "#F97316" : "#9CA3AF" }}
              >
                Step {s.step}
              </span>

              <h3
                className="text-lg font-bold mb-2"
                style={{ color: "#111827" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: "#6B7280" }}
              >
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
