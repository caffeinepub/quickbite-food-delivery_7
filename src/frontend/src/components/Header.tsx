import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, MapPin, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

export function Header({ cartCount, onCartOpen }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "#0F172A" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Flame className="w-7 h-7" style={{ color: "#F97316" }} />
            <span className="text-xl font-bold text-white">
              Quick<span style={{ color: "#F97316" }}>Bite</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {["Discover", "Restaurants", "Offers", "Support"].map((link) => (
              <a
                key={link}
                href="/"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                data-ocid={`nav.${link.toLowerCase()}.link`}
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 text-gray-300 text-sm">
              <MapPin className="w-4 h-4" style={{ color: "#F97316" }} />
              <span className="truncate max-w-[140px]">
                Mumbai, Maharashtra
              </span>
              <button
                type="button"
                className="text-xs font-semibold"
                style={{ color: "#F97316" }}
              >
                Change
              </button>
            </div>

            <motion.button
              type="button"
              onClick={onCartOpen}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              whileTap={{ scale: 0.9 }}
              data-ocid="cart.open_modal_button"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs font-bold border-0"
                  style={{ background: "#F97316", color: "white" }}
                >
                  {cartCount}
                </Badge>
              )}
            </motion.button>

            <Button
              size="sm"
              className="font-semibold text-sm"
              style={{ background: "#F97316", color: "white" }}
              data-ocid="header.signin.button"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
