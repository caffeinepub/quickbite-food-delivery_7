import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FoodItemInput {
    name: string;
    description: string;
    restaurantId: bigint;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export type Time = bigint;
export interface FoodItem {
    id: bigint;
    name: string;
    description: string;
    restaurantId: bigint;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export interface CartItem {
    foodItemId: bigint;
    quantity: bigint;
}
export interface RestaurantInput {
    name: string;
    deliveryTime: bigint;
    imageUrl: string;
    cuisine: string;
    rating: number;
}
export interface Restaurant {
    id: bigint;
    name: string;
    deliveryTime: bigint;
    imageUrl: string;
    cuisine: string;
    rating: number;
}
export interface Order {
    id: bigint;
    status: Variant_cancelled_pending_delivered;
    total: bigint;
    userId: Principal;
    timestamp: Time;
    items: Array<{
        foodItemId: bigint;
        quantity: bigint;
    }>;
}
export interface UserProfile {
    name: string;
    email: string;
    address: string;
    phone: string;
}
export enum Category {
    dessert = "dessert",
    healthy = "healthy",
    sushi = "sushi",
    indian = "indian",
    pizza = "pizza",
    burger = "burger"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_cancelled_pending_delivered {
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered"
}
export interface backendInterface {
    addFoodItem(input: FoodItemInput): Promise<bigint>;
    addRestaurant(input: RestaurantInput): Promise<bigint>;
    addToCart(foodItemId: bigint, quantity: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    getAllFoodItems(): Promise<Array<FoodItem>>;
    getAllRestaurants(): Promise<Array<Restaurant>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getFoodItemsByCategory(category: Category): Promise<Array<FoodItem>>;
    getFoodItemsByRestaurant(restaurantId: bigint): Promise<Array<FoodItem>>;
    getUserOrders(): Promise<Array<Order>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(): Promise<bigint>;
    removeFoodItem(id: bigint): Promise<void>;
    removeFromCart(foodItemId: bigint): Promise<void>;
    removeRestaurant(id: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedSampleData(): Promise<void>;
    updateFoodItem(id: bigint, input: FoodItemInput): Promise<void>;
    updateRestaurant(id: bigint, input: RestaurantInput): Promise<void>;
}
