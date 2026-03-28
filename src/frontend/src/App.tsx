import { AppDownloadBanner } from "@/components/AppDownloadBanner";
import { CartPanel } from "@/components/CartPanel";
import { CategoryRow } from "@/components/CategoryRow";
import { FoodCard } from "@/components/FoodCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { OfferStrip } from "@/components/OfferStrip";
import { RestaurantCard } from "@/components/RestaurantCard";
import { Reviews } from "@/components/Reviews";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Toaster } from "@/components/ui/sonner";
import {
  FOOD_ITEMS,
  type FoodCategory,
  type FoodItem,
  RESTAURANTS,
} from "@/data/foodData";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<FoodCategory>("All");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return FOOD_ITEMS;
    return FOOD_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const handleAddToCart = (item: FoodItem) => {
    setCartItems((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
        },
      ];
    });
    toast.success(`${item.name} added to cart!`, { duration: 1500 });
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0),
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((c) => c.id !== id));
    toast.info("Item removed from cart");
  };

  const handlePlaceOrder = () => {
    setCartItems([]);
    setCartOpen(false);
    toast.success(
      "🎉 Order placed successfully! Expected delivery in 30 mins.",
      { duration: 4000 },
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F3F4F6" }}
    >
      <Toaster position="top-right" richColors />

      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main className="flex-1">
        {/* Hero */}
        <Hero />

        {/* Offer Strip */}
        <OfferStrip />

        {/* How It Works */}
        <HowItWorks />

        {/* Categories */}
        <CategoryRow selected={activeCategory} onSelect={setActiveCategory} />

        {/* Restaurants Section */}
        <section className="py-8" style={{ background: "#F3F4F6" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold" style={{ color: "#111827" }}>
                Top Restaurants
              </h2>
              <a
                href="/"
                className="text-sm font-semibold"
                style={{ color: "#F97316" }}
              >
                See all →
              </a>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3">
              {RESTAURANTS.map((r, i) => (
                <RestaurantCard key={r.id} restaurant={r} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Food Items Section */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold" style={{ color: "#111827" }}>
                {activeCategory === "All" ? "All Items" : activeCategory}
              </h2>
              <span className="text-sm" style={{ color: "#6B7280" }}>
                {filteredItems.length} items
              </span>
            </div>

            {/* Category filter tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
              {(
                [
                  "All",
                  "Pizza",
                  "Burgers",
                  "Sushi",
                  "Indian",
                  "Desserts",
                  "Hot Dogs",
                ] as FoodCategory[]
              ).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium shrink-0 transition-all ${
                    activeCategory === cat
                      ? "text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={
                    activeCategory === cat ? { background: "#F97316" } : {}
                  }
                  data-ocid={`food.filter.${cat.toLowerCase().replace(" ", "-")}.tab`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredItems.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16"
                data-ocid="food.empty_state"
              >
                <span className="text-5xl mb-3">🍽️</span>
                <p className="font-semibold text-gray-500">
                  No items in this category
                </p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                layout
              >
                {filteredItems.map((item, i) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    index={i}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Customer Reviews */}
        <Reviews />

        {/* App Download Banner */}
        <AppDownloadBanner />

        {/* Promo Code Banner */}
        <section className="py-10" style={{ background: "#0F172A" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-2">
                Get <span style={{ color: "#F97316" }}>₹100 off</span> on your
                first order!
              </h2>
              <p className="text-gray-400 mb-6">
                Use code{" "}
                <span className="font-mono font-bold text-white">
                  QUICKBITE100
                </span>{" "}
                at checkout
              </p>
              <button
                type="button"
                className="px-8 py-3 rounded-xl font-bold text-white text-base"
                style={{ background: "#F97316" }}
                data-ocid="promo.claim.button"
              >
                Claim Offer
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <CartPanel
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}
