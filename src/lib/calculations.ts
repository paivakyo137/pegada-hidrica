import type { AiWaterResponse, CalculatorResponse, FoodInput } from "@/types";
import { FOOD_CATALOG, PERSON_DAILY_LITERS, WATER_CONSUMPTION } from "@/lib/constants";
import { formatLiters, formatNumber } from "@/lib/utils";

const AI_MIN = WATER_CONSUMPTION.ai.chatgpt_command.min;
const AI_MAX = WATER_CONSUMPTION.ai.chatgpt_command.max;
const AI_AVG = (AI_MIN + AI_MAX) / 2;

export function findFood(nameOrSlug: string) {
  const key = nameOrSlug.trim().toLowerCase();
  return FOOD_CATALOG.find(
    (item) =>
      item.slug === key ||
      item.name.toLowerCase() === key ||
      item.id === key,
  );
}

export function waterForFood(name: string, quantity: number): number {
  const item = findFood(name);
  if (!item) return 0;
  return item.waterUsed * quantity;
}

export function peopleEquivalent(liters: number): number {
  if (liters <= 0) return 0;
  return liters / PERSON_DAILY_LITERS;
}

export function comparisonPhrase(liters: number): string {
  const people = peopleEquivalent(liters);
  const jeans = liters / WATER_CONSUMPTION.clothing.jeans;
  const coffee = liters / WATER_CONSUMPTION.food.coffee_cup;

  if (liters >= WATER_CONSUMPTION.clothing.jeans) {
    return `${formatLiters(liters)} — equivalente à água diária de ${formatNumber(people, 1)} pessoas, ou ${formatNumber(jeans, 1)} calça(s) jeans.`;
  }
  if (coffee >= 1) {
    return `${formatLiters(liters)} — água diária de ${formatNumber(people, 1)} pessoas, ou cerca de ${formatNumber(coffee, 1)} xícaras de café.`;
  }
  return `${formatLiters(liters)} — cerca de ${formatNumber(people, 2)} pessoa(s) no consumo doméstico diário de ${PERSON_DAILY_LITERS} L.`;
}

export function calculateFoodFootprint(foodItems: FoodInput[]): CalculatorResponse {
  const breakdown = foodItems.map((entry) => {
    const catalog = findFood(entry.slug ?? entry.name);
    const quantity = Number(entry.quantity) || 0;
    const waterUsed = catalog ? catalog.waterUsed * quantity : 0;
    return {
      name: catalog?.name ?? entry.name,
      quantity,
      unit: entry.unit ?? catalog?.unit ?? "un",
      waterUsed,
    };
  });

  const totalWater = breakdown.reduce((sum, item) => sum + item.waterUsed, 0);
  const people = peopleEquivalent(totalWater);

  return {
    totalWater,
    monthlyWater: totalWater * 30,
    annualWater: totalWater * 365,
    peopleEquivalent: people,
    comparison: `Sua pegada diária equivale à água de ${formatNumber(people, 1)} pessoas (${PERSON_DAILY_LITERS} L/dia).`,
    breakdown,
  };
}

export function calculateAiWater(commands: number, days = 1): AiWaterResponse {
  const safeCommands = Math.max(0, commands);
  const safeDays = Math.max(1, days);
  const minWater = safeCommands * AI_MIN * safeDays;
  const maxWater = safeCommands * AI_MAX * safeDays;
  const totalWater = safeCommands * AI_AVG * safeDays;
  const tomatoes = totalWater / WATER_CONSUMPTION.food.tomato;
  const coffeeFraction = totalWater / WATER_CONSUMPTION.food.coffee_cup;

  return {
    totalWater,
    minWater,
    maxWater,
    perDay: safeCommands * AI_AVG,
    comparison:
      totalWater >= 0.5
        ? `Você usou ${formatLiters(totalWater)} só em buscas de IA — cerca de ${formatNumber(tomatoes, 1)} tomates, ou ${formatNumber(coffeeFraction, 2)} xícara de café.`
        : `Estimativa: ${formatLiters(totalWater)} (${formatLiters(minWater)} a ${formatLiters(maxWater)}). Aproximadamente 0,5 L a cada 20–50 comandos.`,
  };
}

export function quizLitersSaved(correctCount: number, total: number): number {
  const ratio = total === 0 ? 0 : correctCount / total;
  return Math.round(ratio * 4200);
}
