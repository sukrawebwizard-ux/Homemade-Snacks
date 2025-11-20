import { supabase } from "./lib/supabaseClient";

export type Frequency = "bi-weekly" | "monthly" | "sample";

export type DeliveryDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface PlanItem {
  product_id: number;
  product_name: string;
  quantity: number;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  default_frequency: Frequency;
  delivery_days_available: DeliveryDay[];
  items: PlanItem[];
  is_active: boolean;
}

export interface Snack {
  id: number;
  name: string;
  description: string;
  unit: string;
  price: number;
  category: "sweets" | "spicy" | "salt";
  image: string;
}

export const MOCK_PLANS: Plan[] = [
  {
    id: 1,
    name: "Monthly Snack Box",
    description: "A fresh selection of homemade snacks every month.",
    price: 15.0,
    default_frequency: "monthly",
    delivery_days_available: ["wednesday", "saturday"],
    items: [
      { product_id: 1, product_name: "Unniyappam", quantity: 10 },
      { product_id: 2, product_name: "Banana Chips (Sweet)", quantity: 1 },
    ],
    is_active: true,
  },
  {
    id: 2,
    name: "Bi-Weekly Family Box",
    description: "Perfect for families, delivered every two weeks.",
    price: 25.0,
    default_frequency: "bi-weekly",
    delivery_days_available: ["saturday"],
    items: [
      { product_id: 1, product_name: "Unniyappam", quantity: 15 },
      { product_id: 7, product_name: "Mixture", quantity: 1 },
    ],
    is_active: true,
  },
  {
    id: 3,
    name: "Sample Snack Box (One-time)",
    description:
      "One-time sample box with a curated mix of sweet, spicy and salted snacks. No recurring subscription.",
    price: 10.0,
    default_frequency: "sample", // used just to satisfy the type; user sees it's one-time in the description
    delivery_days_available: ["wednesday", "saturday"],
    items: [
      { product_id: 1, product_name: "Unniyappam", quantity: 6 },
      { product_id: 2, product_name: "Banana Chips (Sweet)", quantity: 1 },
      { product_id: 9, product_name: "Banana Chips (Salt)", quantity: 1 },
      { product_id: 7, product_name: "Mixture", quantity: 1 },
    ],
    is_active: true,
  },
];

export const SNACKS: Snack[] = [
  {
    id: 1,
    name: "Unniyappam",
    description: "Traditional Kerala sweet made with rice flour, banana & jaggery.",
    unit: "10 pcs",
    price: 3.0,
    category: "sweets",
    image: new URL("/snacks/unniyappam.png", import.meta.url).href
  },
  {
    id: 2,
    name: "Banana Chips (Sweet)",
    description: "Crispy sweet banana chips made Kerala-style.",
    unit: "150g",
    price: 3.0,
    category: "sweets",
    image: new URL("/snacks/banana-chips.jpg", import.meta.url).href
  },
  {
    id: 3,
    name: "Achappam",
    description: "Rose cookies – crispy, lightly sweet Kerala snack.",
    unit: "10 pcs",
    price: 3.0,
    category: "sweets",
    image: new URL("/snacks/achappam.jpg", import.meta.url).href
  },
  {
    id: 4,
    name: "Cutlets (Chicken)",
    description: "Spicy Kerala-style chicken cutlets.",
    unit: "3 pcs",
    price: 5.0,
    category: "spicy",
    image: new URL("/snacks/cutlets.jpg", import.meta.url).href
  },
  {
    id: 5,
    name: "Cutlets (Beef)",
    description: "Homemade beef cutlets with spices.",
    unit: "3 pcs",
    price: 5.0,
    category: "spicy",
    image: new URL("/snacks/cutlets.jpg", import.meta.url).href
  },
  {
    id: 6,
    name: "Cutlets (Veg)",
    description: "Mixed vegetable Kerala cutlets.",
    unit: "3 pcs",
    price: 5.0,
    category: "spicy",
    image: new URL("/snacks/cutlets.jpg", import.meta.url).href
  },
  {
    id: 7,
    name: "Mixture",
    description: "Spicy Kerala mixture made with sev, peanuts & curry leaves.",
    unit: "170g",
    price: 3.0,
    category: "spicy",
    image: new URL("/snacks/mixture.png", import.meta.url).href
  },
  {
    id: 8,
    name: "Pakkavada",
    description: "Fried spicy ribbon pakkavada.",
    unit: "150g",
    price: 3.0,
    category: "spicy",
    image: new URL("/snacks/pakkavada.png", import.meta.url).href
  },
  {
    id: 9,
    name: "Banana Chips (Salt)",
    description: "Crispy salted Kerala banana chips.",
    unit: "150g",
    price: 3.0,
    category: "salt",
    image: new URL("/snacks/banana-chips.jpg", import.meta.url).href
  },
  {
    id: 10,
    name: "Bombe Mixture",
    description: "Salted version of Kerala mixture with mild spices.",
    unit: "170g",
    price: 3.0,
    category: "salt",
    image: new URL("/snacks/bombe-mixture.jpg", import.meta.url).href
  }
];


export const SNACK_CUSTOMIZATION = {
  sweets: [
    "Unniyappam - 10 pcs / €3",
    "Banana chips (sweet) - 150g / €3",
    "Achappam - 10 pcs / €3",
  ],
  spicy: [
    "Cutlets (Chicken) - 3 pcs / €5",
    "Cutlets (Beef) - 3 pcs / €5",
    "Cutlets (Veg) - 3 pcs / €5",
    "Mixture - 170g / €3",
    "Pakkavada - 150g / €3",
  ],
  salt: [
    "Banana chips (salt) - 150g / €3",
    "Bombe mixture - 170g / €3",
  ],
} as const;
