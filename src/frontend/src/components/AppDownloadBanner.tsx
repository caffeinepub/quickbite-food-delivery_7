import { motion } from "motion/react";

export function AppDownloadBanner() {
  return (
    <section
      className="relative overflow-hidden py-14"
      style={{
        background:
          "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "#F97316",
          filter: "blur(80px)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "#F97316",
          filter: "blur(60px)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left"
          >
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ background: "rgba(249,115,22,0.2)", color: "#F97316" }}
            >
              Now on Mobile
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
              Download the <span style={{ color: "#F97316" }}>QuickBite</span>{" "}
              App
            </h2>
            <p className="text-gray-400 text-base mb-6 max-w-md">
              Get exclusive app-only deals, live order tracking, and 1-tap
              reorders. Available on iOS &amp; Android.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              {[
                { value: "2M+", label: "Downloads" },
                { value: "4.8★", label: "App Rating" },
                { value: "500+", label: "Restaurants" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-2xl font-extrabold"
                    style={{ color: "#F97316" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Store buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border transition-colors"
                style={{
                  background: "#FFFFFF0F",
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "white",
                }}
                data-ocid="appdownload.appstore.button"
              >
                <span className="text-2xl leading-none">🍎</span>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                    Download on the
                  </p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border transition-colors"
                style={{
                  background: "#FFFFFF0F",
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "white",
                }}
                data-ocid="appdownload.playstore.button"
              >
                <span className="text-2xl leading-none">▶️</span>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                    Get it on
                  </p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Phone mockup side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex-shrink-0 hidden lg:flex items-center justify-center"
          >
            <div
              className="relative w-52 h-96 rounded-3xl flex items-center justify-center text-center p-4"
              style={{
                background: "linear-gradient(160deg, #1F2937 0%, #111827 100%)",
                border: "2px solid rgba(255,255,255,0.12)",
                boxShadow:
                  "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* Notch */}
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full"
                style={{ background: "#0F172A" }}
              />
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                  style={{ background: "#F97316" }}
                >
                  🔥
                </div>
                <span className="text-white font-extrabold text-lg">
                  QuickBite
                </span>
                <span className="text-gray-400 text-xs">
                  Order. Track. Enjoy.
                </span>
                <div className="w-full mt-2 space-y-2">
                  {[
                    "🍔 Burgers nearby",
                    "🍕 Pizza deals",
                    "🍛 Biryani special",
                  ].map((item) => (
                    <div
                      key={item}
                      className="text-left text-xs px-3 py-2 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        color: "#D1D5DB",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div
                  className="w-full mt-1 py-2.5 rounded-xl text-sm font-bold text-white text-center"
                  style={{ background: "#F97316" }}
                >
                  Order Now
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
