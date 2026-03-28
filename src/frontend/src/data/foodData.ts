export type FoodCategory =
  | "All"
  | "Pizza"
  | "Burgers"
  | "Sushi"
  | "Indian"
  | "Desserts"
  | "Hot Dogs";

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: FoodCategory;
  image: string;
  bestseller: boolean;
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: number;
  image: string;
}

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    description: "Double-loaded pepperoni, mozzarella, tangy tomato base",
    price: 349,
    rating: 4.5,
    category: "Pizza",
    image: "/assets/generated/pizza-pepperoni.dim_400x300.jpg",
    bestseller: false,
  },
  {
    id: 2,
    name: "Four Cheese Pizza",
    description: "Mozzarella, cheddar, parmesan, gorgonzola",
    price: 379,
    rating: 4.4,
    category: "Pizza",
    image: "/assets/generated/four-cheese-pizza.dim_400x300.jpg",
    bestseller: false,
  },
  {
    id: 3,
    name: "Double Smash Burger",
    description: "Two smashed patties, American cheese, caramelized onions",
    price: 299,
    rating: 4.6,
    category: "Burgers",
    image: "/assets/generated/smash-burger.dim_400x300.jpg",
    bestseller: true,
  },
  {
    id: 4,
    name: "Buffalo Chicken Wings",
    description: "Crispy wings tossed in fiery buffalo sauce",
    price: 279,
    rating: 4.5,
    category: "Burgers",
    image: "/assets/generated/chicken-wings.dim_400x300.jpg",
    bestseller: false,
  },
  {
    id: 5,
    name: "Loaded Cheese Fries",
    description: "Waffle fries, cheddar sauce, jalapeños, bacon",
    price: 199,
    rating: 4.3,
    category: "Burgers",
    image: "/assets/generated/cheese-fries.dim_400x300.jpg",
    bestseller: false,
  },
  {
    id: 6,
    name: "BBQ Hot Dog",
    description: "Juicy frank, pulled pork, BBQ sauce, crispy onions",
    price: 189,
    rating: 4.2,
    category: "Hot Dogs",
    image: "/assets/generated/hotdog.dim_400x300.jpg",
    bestseller: false,
  },
  {
    id: 7,
    name: "Crispy Onion Rings",
    description: "Beer-battered golden rings with chipotle dip",
    price: 149,
    rating: 4.1,
    category: "Burgers",
    image: "/assets/generated/onion-rings.dim_400x300.jpg",
    bestseller: false,
  },
  {
    id: 8,
    name: "Paneer Tikka Masala",
    description: "Chargrilled paneer in spicy masala gravy with naan",
    price: 319,
    rating: 4.7,
    category: "Indian",
    image: "/assets/generated/paneer-tikka.dim_400x300.jpg",
    bestseller: true,
  },
  {
    id: 9,
    name: "Chicken Biryani",
    description: "Dum-cooked basmati rice with juicy chicken, saffron",
    price: 349,
    rating: 4.8,
    category: "Indian",
    image: "/assets/generated/chicken-biryani.dim_400x300.jpg",
    bestseller: true,
  },
  {
    id: 10,
    name: "Sushi Platter",
    description: "12-piece assorted sushi with salmon, tuna, avocado",
    price: 449,
    rating: 4.6,
    category: "Sushi",
    image: "/assets/generated/sushi-platter.dim_400x300.jpg",
    bestseller: true,
  },
  {
    id: 11,
    name: "Chocolate Lava Cake",
    description: "Warm molten chocolate cake with vanilla ice cream",
    price: 179,
    rating: 4.7,
    category: "Desserts",
    image: "/assets/generated/lava-cake.dim_400x300.jpg",
    bestseller: true,
  },
  {
    id: 12,
    name: "Chocolate Milkshake",
    description: "Thick oreo milkshake with whipped cream",
    price: 159,
    rating: 4.4,
    category: "Desserts",
    image: "/assets/generated/choco-milkshake.dim_400x300.jpg",
    bestseller: false,
  },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: "BurgerBros",
    cuisine: "Burgers & Fast Food",
    rating: 4.5,
    deliveryTime: 20,
    image: "/assets/generated/restaurant-burgers.dim_400x250.jpg",
  },
  {
    id: 2,
    name: "Pizza Palace",
    cuisine: "Pizzas & Italian",
    rating: 4.4,
    deliveryTime: 25,
    image: "/assets/generated/restaurant-pizza.dim_400x250.jpg",
  },
  {
    id: 3,
    name: "Spice Garden",
    cuisine: "Indian & Biryani",
    rating: 4.7,
    deliveryTime: 30,
    image: "/assets/generated/restaurant-indian.dim_400x250.jpg",
  },
  {
    id: 4,
    name: "Tokyo Bites",
    cuisine: "Sushi & Japanese",
    rating: 4.6,
    deliveryTime: 35,
    image: "/assets/generated/restaurant-sushi.dim_400x250.jpg",
  },
];

export const CATEGORIES: { label: FoodCategory; emoji: string }[] = [
  { label: "All", emoji: "🍽️" },
  { label: "Pizza", emoji: "🍕" },
  { label: "Burgers", emoji: "🍔" },
  { label: "Sushi", emoji: "🍣" },
  { label: "Indian", emoji: "🍛" },
  { label: "Desserts", emoji: "🍫" },
  { label: "Hot Dogs", emoji: "🌭" },
];
