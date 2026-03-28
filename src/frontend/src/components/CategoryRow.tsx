import { CATEGORIES, type FoodCategory } from "@/data/foodData";
import { motion } from "motion/react";

interface CategoryRowProps {
  selected: FoodCategory;
  onSelect: (cat: FoodCategory) => void;
}

export function CategoryRow({ selected, onSelect }: CategoryRowProps) {
  return (
    <section className="py-8" style={{ background: "#F3F4F6" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: "#111827" }}>
          What are you craving?
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.label}
              onClick={() => onSelect(cat.label)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border-2 text-sm font-semibold shrink-0 transition-all ${
                selected === cat.label
                  ? "border-orange-500 bg-orange-50 text-orange-600"
                  : "border-gray-200 bg-white text-gray-700 hover:border-orange-300"
              }`}
              data-ocid={`category.${cat.label.toLowerCase().replace(" ", "-")}.tab`}
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
