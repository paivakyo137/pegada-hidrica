export type FoodCategory = "legumes" | "carnes" | "bebidas" | "frutas" | "graos" | "laticinios" | "outros";

export interface FoodItem {
  id: string;
  name: string;
  slug: string;
  category: FoodCategory | string;
  quantity: number;
  unit: string;
  waterUsed: number;
  icon: string;
  description?: string | null;
}

export interface FoodInput {
  name: string;
  quantity: number;
  unit?: string;
  slug?: string;
}

export interface CalculatorResponse {
  totalWater: number;
  monthlyWater: number;
  annualWater: number;
  peopleEquivalent: number;
  comparison: string;
  breakdown: Array<{
    name: string;
    quantity: number;
    unit: string;
    waterUsed: number;
  }>;
}

export interface AiWaterResponse {
  totalWater: number;
  minWater: number;
  maxWater: number;
  comparison: string;
  perDay: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  insight: string;
  litersSaved: number;
}
