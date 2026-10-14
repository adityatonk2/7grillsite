export type Item = { id: string; name: string; price: number; cat: string; tag?: "Best Seller" | "Must Try" | "New" };
const mk = (cat: string, rows: [string, number, Item["tag"]?][]): Item[] =>
  rows.map(([name, price, tag]) => ({ id: (cat + "-" + name).toLowerCase().replace(/[^a-z0-9]+/g, "-"), name, price, cat, tag }));
export const CATS = ["Sandwiches", "Burgers", "Fries", "Quick Bites", "Coffee", "Combos", "Add-ons"] as const;
export const MENU: Item[] = [
  ...mk("Sandwiches", [["Classic Sandwich",18],["Classic Paneer Sandwich",30],["Cheese Corn Sandwich",45,"Best Seller"],["Makhni Paneer Sandwich",55,"Must Try"],["Tandoori Paneer Sandwich",55],["Paneer Zing Sandwich",60,"Must Try"],["Veggie Sandwich",60],["Veggie Cheese Sandwich",80,"Best Seller"],["Veggie Paneer Sandwich",100],["Coleslaw Sandwich",75],["Coleslaw Cheese Sandwich",95],["Coleslaw Paneer Sandwich",115]]),
  ...mk("Burgers", [["Classic Burger",30],["Veggie Burger",45],["Tandoori Burger",45,"Best Seller"],["Makhni Burger",50,"Best Seller"],["Spicy Schezwan Burger",50],["Zing Burger",55],["Veggie Cheese Burger",65,"Best Seller"],["Crispy Nacho Burger",80,"Must Try"],["Double Patty Cheese Burger",90],["Paneer Burger",85,"Best Seller"],["Tandoori Paneer Burger",90],["Makhni Paneer Burger",90],["Cheese Paneer Burger",105]]),
  ...mk("Fries", [["Salted Fries",45],["Peri-Peri Fries",55],["Tandoori Fries",65],["Saucy Fries",75]]),
  ...mk("Quick Bites", [["Spicy Potato Pops",60],["Onion Rings",70],["Veggie Fingers",85],["Crispy Paneer Momo",100,"New"]]),
  ...mk("Coffee", [["Classic Coffee (Hot)",25],["Strong Coffee (Hot)",30],["Flavoured Coffee (Hot)",35],["Classic Cold Coffee",70],["Strong Cold Coffee",75],["Flavoured Cold Coffee",80]]),
  ...mk("Combos", [["Tandoori Burger + Cheese Corn Sandwich",85],["Tandoori Burger + Schezwan Burger",90],["Cheese Corn Sandwich + Salted Fries + Cold Drink",95],["Veggie Cheese Burger + Peri Peri Fries",115],["Cheese Corn Sandwich + Cold Coffee",120],["Veggie Cheese Burger + Cold Coffee",140],["Veggie Sandwich + Peri Peri Fries + Veggie Burger",155],["Peri-Peri Fries + Tandoori Burger + Cold Coffee",175],["Veggie Cheese Sandwich + Peri Peri Fries + Veggie Cheese Burger",195],["Peri-Peri Fries + Veggie Cheese Sandwich + Cold Coffee",210]]),
  ...mk("Add-ons", [["Add-on Cheese",20],["Dip",15]]),
];
export const FLAVOURS = "Flavoured coffee: Butterscotch, Hazelnut or Vanilla";
