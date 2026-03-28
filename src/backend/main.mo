import Array "mo:core/Array";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import List "mo:core/List";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);

  module Category {
    public func compare(category1 : Category, category2 : Category) : Order.Order {
      switch (category1, category2) {
        case (#pizza, #pizza) { #equal };
        case (#pizza, _) { #less };
        case (_, #pizza) { #greater };
        case (#burger, #burger) { #equal };
        case (#burger, _) { #less };
        case (_, #burger) { #greater };
        case (#sushi, #sushi) { #equal };
        case (#sushi, _) { #less };
        case (_, #sushi) { #greater };
        case (#indian, #indian) { #equal };
        case (#indian, _) { #less };
        case (_, #indian) { #greater };
        case (#dessert, #dessert) { #equal };
        case (#dessert, #healthy) { #less };
        case (#healthy, #healthy) { #equal };
        case (_) { #greater };
      };
    };
  };

  type Category = {
    #pizza;
    #burger;
    #sushi;
    #indian;
    #dessert;
    #healthy;
  };

  type FoodItem = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat; // Price in cents
    category : Category;
    restaurantId : Nat;
    imageUrl : Text;
  };

  type Restaurant = {
    id : Nat;
    name : Text;
    cuisine : Text;
    rating : Float;
    deliveryTime : Nat;
    imageUrl : Text;
  };

  type CartItem = {
    foodItemId : Nat;
    quantity : Nat;
  };

  type Order = {
    id : Nat;
    userId : Principal;
    items : [{ foodItemId : Nat; quantity : Nat }];
    total : Nat;
    timestamp : Time.Time;
    status : { #pending; #delivered; #cancelled };
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
  };

  let foodItems = Map.empty<Nat, FoodItem>();
  let restaurants = Map.empty<Nat, Restaurant>();
  let carts = Map.empty<Principal, List.List<CartItem>>();
  let orders = Map.empty<Nat, Order>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextFoodItemId = 1;
  var nextRestaurantId = 1;
  var nextOrderId = 1;

  public type RestaurantInput = {
    name : Text;
    cuisine : Text;
    rating : Float;
    deliveryTime : Nat;
    imageUrl : Text;
  };

  public type FoodItemInput = {
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    restaurantId : Nat;
    imageUrl : Text;
  };

  func getNextFoodItemId() : Nat {
    let id = nextFoodItemId;
    nextFoodItemId += 1;
    id;
  };

  func getNextRestaurantId() : Nat {
    let id = nextRestaurantId;
    nextRestaurantId += 1;
    id;
  };

  func getNextOrderId() : Nat {
    let id = nextOrderId;
    nextOrderId += 1;
    id;
  };

  // Helper function to convert cart to array
  func cartToArray(cart : List.List<CartItem>) : [CartItem] {
    cart.toArray();
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Add food item (Admin only)
  public shared ({ caller }) func addFoodItem(input : FoodItemInput) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add food items");
    };
    let id = getNextFoodItemId();
    let foodItem : FoodItem = { input with id };
    foodItems.add(id, foodItem);
    id;
  };

  // Update food item (Admin only)
  public shared ({ caller }) func updateFoodItem(id : Nat, input : FoodItemInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update food items");
    };
    switch (foodItems.get(id)) {
      case (null) { Runtime.trap("Food item not found") };
      case (?_) {
        let foodItem : FoodItem = { input with id };
        foodItems.add(id, foodItem);
      };
    };
  };

  // Remove food item (Admin only)
  public shared ({ caller }) func removeFoodItem(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove food items");
    };
    switch (foodItems.get(id)) {
      case (null) { Runtime.trap("Food item not found") };
      case (?_) {
        foodItems.remove(id);
      };
    };
  };

  func calculateTotal(cart : List.List<CartItem>) : Nat {
    var total = 0;
    let cartItems = cartToArray(cart);
    for (cartItem in cartItems.values()) {
      switch (foodItems.get(cartItem.foodItemId)) {
        case (?foodItem) {
          total += foodItem.price * cartItem.quantity;
        };
        case (null) {};
      };
    };
    total;
  };

  // Add restaurant (Admin only)
  public shared ({ caller }) func addRestaurant(input : RestaurantInput) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add restaurants");
    };
    let id = getNextRestaurantId();
    let restaurant : Restaurant = { input with id };
    restaurants.add(id, restaurant);
    id;
  };

  // Update restaurant (Admin only)
  public shared ({ caller }) func updateRestaurant(id : Nat, input : RestaurantInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update restaurants");
    };
    switch (restaurants.get(id)) {
      case (null) { Runtime.trap("Restaurant not found") };
      case (?_) {
        let restaurant : Restaurant = { input with id };
        restaurants.add(id, restaurant);
      };
    };
  };

  // Remove restaurant (Admin only)
  public shared ({ caller }) func removeRestaurant(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove restaurants");
    };
    switch (restaurants.get(id)) {
      case (null) { Runtime.trap("Restaurant not found") };
      case (?_) {
        restaurants.remove(id);
      };
    };
  };

  // Add item to cart (Authenticated users only)
  public shared ({ caller }) func addToCart(foodItemId : Nat, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add to cart");
    };
    if (quantity == 0) {
      Runtime.trap("Quantity must be greater than 0");
    };

    switch (foodItems.get(foodItemId)) {
      case (null) { Runtime.trap("Food item not found") };
      case (_) {};
    };

    let cart = switch (carts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?existingCart) { existingCart };
    };

    var itemExists = false;
    let updatedCart = cart.map<CartItem, CartItem>(
      func(item) {
        if (item.foodItemId == foodItemId) {
          itemExists := true;
          { foodItemId; quantity = item.quantity + quantity };
        } else { item };
      }
    );

    if (itemExists) {
      carts.add(caller, updatedCart);
    } else {
      cart.add({ foodItemId; quantity });
      carts.add(caller, cart);
    };
  };

  // Remove item from cart (Authenticated users only)
  public shared ({ caller }) func removeFromCart(foodItemId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove from cart");
    };

    let cart = switch (carts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?existingCart) { existingCart };
    };

    let filteredCart = cart.filter(func(item) { item.foodItemId != foodItemId });
    carts.add(caller, filteredCart);
  };

  // Get cart (Authenticated users only)
  public query ({ caller }) func getCart() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access cart");
    };
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.toArray() };
    };
  };

  // Clear cart (Authenticated users only)
  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear cart");
    };
    carts.add(caller, List.empty<CartItem>());
  };

  // Place order (Authenticated users only)
  public shared ({ caller }) func placeOrder() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) {
        if (cart.size() == 0) {
          Runtime.trap("Cart is empty");
        };
        let orderId = getNextOrderId();
        let order : Order = {
          id = orderId;
          userId = caller;
          items = cartToArray(cart);
          total = calculateTotal(cart);
          timestamp = Time.now();
          status = #pending;
        };
        orders.add(orderId, order);
        carts.add(caller, List.empty<CartItem>());
        orderId;
      };
    };
  };

  // Get user orders (Authenticated users only)
  public query ({ caller }) func getUserOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };
    orders.values().toArray().filter(func(order) { order.userId == caller });
  };

  // Get all food items (Public - no auth required)
  public query ({ caller }) func getAllFoodItems() : async [FoodItem] {
    foodItems.values().toArray();
  };

  // Get food items by restaurant (Public - no auth required)
  public query ({ caller }) func getFoodItemsByRestaurant(restaurantId : Nat) : async [FoodItem] {
    foodItems.values().toArray().filter(func(item) { item.restaurantId == restaurantId });
  };

  // Get all restaurants (Public - no auth required)
  public query ({ caller }) func getAllRestaurants() : async [Restaurant] {
    restaurants.values().toArray();
  };

  // Get food items by category (Public - no auth required)
  public query ({ caller }) func getFoodItemsByCategory(category : Category) : async [FoodItem] {
    foodItems.values().toArray().filter(func(item) { item.category == category });
  };

  // Seed sample data (Admin only)
  public shared ({ caller }) func seedSampleData() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed data");
    };
    if (foodItems.size() > 0 or restaurants.size() > 0) {
      Runtime.trap("Data already seeded");
    };

    let restaurant1Id = await addRestaurant({
      name = "Pasta Palace";
      cuisine = "Italian";
      rating = 4.5;
      deliveryTime = 30;
      imageUrl = "https://example.com/pasta_palace.jpg";
    });

    let restaurant2Id = await addRestaurant({
      name = "Sushi World";
      cuisine = "Japanese";
      rating = 4.7;
      deliveryTime = 25;
      imageUrl = "https://example.com/sushi_world.jpg";
    });

    let restaurant3Id = await addRestaurant({
      name = "Burger Haven";
      cuisine = "American";
      rating = 4.3;
      deliveryTime = 20;
      imageUrl = "https://example.com/burger_haven.jpg";
    });

    let restaurant4Id = await addRestaurant({
      name = "The Spice House";
      cuisine = "Indian";
      rating = 4.6;
      deliveryTime = 35;
      imageUrl = "https://example.com/spice_house.jpg";
    });

    ignore await addFoodItem({
      name = "Margherita Pizza";
      description = "Classic cheese and tomato pizza";
      price = 1200;
      category = #pizza;
      restaurantId = restaurant1Id;
      imageUrl = "https://example.com/margherita_pizza.jpg";
    });

    ignore await addFoodItem({
      name = "Four Cheese Pizza";
      description = "Pizza with four types of cheese";
      price = 1500;
      category = #pizza;
      restaurantId = restaurant1Id;
      imageUrl = "https://example.com/four_cheese_pizza.jpg";
    });

    ignore await addFoodItem({
      name = "Spaghetti Carbonara";
      description = "Classic pasta with bacon and sauce";
      price = 1300;
      category = #healthy;
      restaurantId = restaurant1Id;
      imageUrl = "https://example.com/carbonara.jpg";
    });

    ignore await addFoodItem({
      name = "California Roll";
      description = "Sushi roll with crab and avocado";
      price = 1000;
      category = #sushi;
      restaurantId = restaurant2Id;
      imageUrl = "https://example.com/california_roll.jpg";
    });

    ignore await addFoodItem({
      name = "Salmon Nigiri";
      description = "Sushi rice topped with salmon";
      price = 800;
      category = #sushi;
      restaurantId = restaurant2Id;
      imageUrl = "https://example.com/salmon_nigiri.jpg";
    });

    ignore await addFoodItem({
      name = "Tuna Sashimi";
      description = "Fresh tuna slices";
      price = 1400;
      category = #sushi;
      restaurantId = restaurant2Id;
      imageUrl = "https://example.com/tuna_sashimi.jpg";
    });

    ignore await addFoodItem({
      name = "Classic Burger";
      description = "Beef patty, cheese, lettuce, tomato";
      price = 1100;
      category = #burger;
      restaurantId = restaurant3Id;
      imageUrl = "https://example.com/classic_burger.jpg";
    });

    ignore await addFoodItem({
      name = "Chicken Burger";
      description = "Grilled chicken burger with fries";
      price = 1200;
      category = #burger;
      restaurantId = restaurant3Id;
      imageUrl = "https://example.com/chicken_burger.jpg";
    });

    ignore await addFoodItem({
      name = "Veggie Burger";
      description = "Vegetarian patty with toppings";
      price = 1000;
      category = #burger;
      restaurantId = restaurant3Id;
      imageUrl = "https://example.com/veggie_burger.jpg";
    });

    ignore await addFoodItem({
      name = "Butter Chicken";
      description = "Indian butter chicken with sauce";
      price = 1400;
      category = #indian;
      restaurantId = restaurant4Id;
      imageUrl = "https://example.com/butter_chicken.jpg";
    });

    ignore await addFoodItem({
      name = "Vegetable Curry";
      description = "Mixed vegetable curry";
      price = 1200;
      category = #indian;
      restaurantId = restaurant4Id;
      imageUrl = "https://example.com/vegetable_curry.jpg";
    });

    ignore await addFoodItem({
      name = "Chicken Tikka Masala";
      description = "Grilled chicken in tikka sauce";
      price = 1500;
      category = #indian;
      restaurantId = restaurant4Id;
      imageUrl = "https://example.com/chicken_tikka.jpg";
    });

    ignore await addFoodItem({
      name = "Chocolate Cake";
      description = "Rich chocolate dessert";
      price = 800;
      category = #dessert;
      restaurantId = restaurant1Id;
      imageUrl = "https://example.com/chocolate_cake.jpg";
    });
  };

  func getRestaurant(id : Nat) : ?Restaurant {
    restaurants.get(id);
  };
};
