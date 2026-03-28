import { Badge } from "@/components/ui/badge";
import type { FoodItem } from "@/data/foodData";
import { Check, Plus, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface FoodCardProps {
  item: FoodItem;
  index: number;
  onAddToCart: (item: FoodItem) => void;
}

export function FoodCard({ item, index, onAddToCart }: FoodCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 6) * 0.07 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col group"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
      data-ocid={`food.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "180px" }}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {item.bestseller && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold text-white"
            style={{ background: "#F97316" }}
          >
            🏆 Bestseller
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="font-bold text-sm leading-tight"
            style={{ color: "#111827" }}
          >
            {item.name}
          </h3>
          <Badge
            className="shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-semibold rounded-full border-0"
            style={{ background: "#DCFCE7", color: "#16A34A" }}
          >
            <Star className="w-2.5 h-2.5 fill-green-600" />
            {item.rating}
          </Badge>
        </div>

        <p className="text-xs line-clamp-2 mb-3" style={{ color: "#6B7280" }}>
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-base" style={{ color: "#111827" }}>
            ₹{item.price}
          </span>
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: added ? "#16A34A" : "#1F2937",
              color: "white",
            }}
            data-ocid={`food.add_button.${index + 1}`}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Added!
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
