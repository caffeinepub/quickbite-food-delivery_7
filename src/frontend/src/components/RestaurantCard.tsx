import type { Restaurant } from "@/data/foodData";
import { Clock, Star } from "lucide-react";
import { motion } from "motion/react";

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

export function RestaurantCard({ restaurant, index }: RestaurantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer shrink-0"
      style={{ width: "240px" }}
      data-ocid={`restaurant.item.${index + 1}`}
    >
      <div className="relative overflow-hidden h-36">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm" style={{ color: "#111827" }}>
          {restaurant.name}
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
          {restaurant.cuisine}
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-green-500 text-green-500" />
            <span className="text-xs font-semibold text-green-600">
              {restaurant.rating}
            </span>
          </div>
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: "#6B7280" }}
          >
            <Clock className="w-3.5 h-3.5" />
            {restaurant.deliveryTime} mins
          </div>
        </div>
      </div>
    </motion.div>
  );
}
