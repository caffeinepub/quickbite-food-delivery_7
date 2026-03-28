import { Star } from "lucide-react";
import { motion } from "motion/react";

const REVIEWS = [
  {
    initials: "RK",
    name: "Rohit Kapoor",
    location: "Mumbai",
    rating: 5,
    text: "QuickBite is the best thing that happened to my weekends! The Chicken Biryani arrived piping hot in under 25 minutes. Absolutely mind-blowing flavour — exactly like my mom's recipe!",
    dish: "Chicken Biryani",
    color: "#F97316",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    location: "Bengaluru",
    rating: 5,
    text: "Ordered the Sushi Platter for a dinner date and it was restaurant quality! Super fresh, beautifully packed. The app is smooth and the delivery guy was super polite. 10/10!",
    dish: "Sushi Platter",
    color: "#2563EB",
  },
  {
    initials: "AM",
    name: "Arjun Mehta",
    location: "Delhi",
    rating: 5,
    text: "Double Smash Burger is pure bliss. The BOGO dessert deal saved me ₹180 on two lava cakes. I've tried Zomato and Swiggy — QuickBite beats them on speed and taste every time.",
    dish: "Double Smash Burger",
    color: "#9333EA",
  },
];

const STAR_POSITIONS = [1, 2, 3, 4, 5] as const;

export function Reviews() {
  return (
    <section className="py-14" style={{ background: "#F3F4F6" }}>
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
            What customers say
          </span>
          <h2 className="text-3xl font-extrabold" style={{ color: "#111827" }}>
            Loved by foodies across India
          </h2>
          <p className="mt-2 text-base" style={{ color: "#6B7280" }}>
            Real reviews from real hungry humans
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
              data-ocid={`review.item.${i + 1}`}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {STAR_POSITIONS.map((pos) => (
                  <Star
                    key={pos}
                    className={`w-4 h-4 ${
                      pos <= r.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "#374151" }}
              >
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Dish chip */}
              <span
                className="self-start text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `${r.color}18`, color: r.color }}
              >
                🍽️ {r.dish}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-1 border-t border-gray-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: r.color }}
                >
                  {r.initials}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#111827" }}>
                    {r.name}
                  </p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>
                    {r.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
