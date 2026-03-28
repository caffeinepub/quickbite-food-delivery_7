import type { CartItem } from "@/App";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onPlaceOrder: () => void;
}

export function CartPanel({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onPlaceOrder,
}: CartPanelProps) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = items.length > 0 ? 49 : 0;
  const total = subtotal + deliveryFee;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.5)" }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full z-50 flex flex-col bg-white"
            style={{
              width: "380px",
              boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
            }}
            data-ocid="cart.panel"
          >
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{ background: "#0F172A" }}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" style={{ color: "#F97316" }} />
                <span className="font-bold text-white">Your Cart</span>
                {items.length > 0 && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ background: "#F97316" }}
                  >
                    {items.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                data-ocid="cart.close_button"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <ScrollArea className="flex-1">
              {items.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-64 text-center p-6"
                  data-ocid="cart.empty_state"
                >
                  <ShoppingBag className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="font-semibold text-gray-500">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Add items from the menu to get started!
                  </p>
                </div>
              ) : (
                <div className="p-4 flex flex-col gap-3">
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
                      data-ocid={`cart.item.${idx + 1}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-semibold truncate"
                          style={{ color: "#111827" }}
                        >
                          {item.name}
                        </p>
                        <p
                          className="text-sm font-bold mt-0.5"
                          style={{ color: "#F97316" }}
                        >
                          ₹{item.price * item.quantity}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 hover:border-orange-400 transition-colors"
                            data-ocid={`cart.decrease.${idx + 1}`}
                          >
                            <Minus
                              className="w-3 h-3"
                              style={{ color: "#374151" }}
                            />
                          </button>
                          <span
                            className="text-sm font-semibold w-4 text-center"
                            style={{ color: "#111827" }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 hover:border-orange-400 transition-colors"
                            data-ocid={`cart.increase.${idx + 1}`}
                          >
                            <Plus
                              className="w-3 h-3"
                              style={{ color: "#374151" }}
                            />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        data-ocid={`cart.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {items.length > 0 && (
              <div className="p-4 border-t bg-white">
                <div className="space-y-2 mb-3">
                  <div
                    className="flex justify-between text-sm"
                    style={{ color: "#6B7280" }}
                  >
                    <span>Subtotal</span>
                    <span className="font-medium" style={{ color: "#111827" }}>
                      ₹{subtotal}
                    </span>
                  </div>
                  <div
                    className="flex justify-between text-sm"
                    style={{ color: "#6B7280" }}
                  >
                    <span>Delivery Fee</span>
                    <span className="font-medium" style={{ color: "#111827" }}>
                      ₹{deliveryFee}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span style={{ color: "#111827" }}>Total</span>
                    <span style={{ color: "#111827" }}>₹{total}</span>
                  </div>
                </div>
                <Button
                  className="w-full font-bold text-sm py-5"
                  style={{ background: "#F97316", color: "white" }}
                  onClick={onPlaceOrder}
                  data-ocid="cart.place_order.button"
                >
                  Place Order • ₹{total}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
