import { MapPin, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function Hero() {
  const [address, setAddress] = useState("");

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "520px" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-food-bg.dim_1400x600.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.8) 40%, rgba(15,23,42,0.3) 70%, rgba(15,23,42,0.1) 100%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{
              background: "rgba(249,115,22,0.2)",
              color: "#F97316",
              border: "1px solid rgba(249,115,22,0.3)",
            }}
          >
            🔥 Free delivery on first order!
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Delicious Junk Food,{" "}
            <span style={{ color: "#F97316" }}>Delivered Fast.</span>
          </h1>

          <p className="text-gray-300 text-lg mb-8">
            Order from your favourite restaurants and get it delivered hot,
            fresh, and fast — right to your doorstep.
          </p>

          <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 shadow-xl max-w-md">
            <div className="flex items-center gap-2 flex-1 px-3">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Enter your delivery address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent"
                data-ocid="hero.search_input"
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white shrink-0"
              style={{ background: "#F97316" }}
              data-ocid="hero.search.button"
            >
              <Search className="w-4 h-4" />
              Find Food
            </button>
          </div>

          <div className="flex items-center gap-6 mt-6 text-sm text-gray-400">
            <span>⚡ 20-35 min delivery</span>
            <span>🛡️ Safe &amp; hygienic</span>
            <span>💳 Easy payment</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
