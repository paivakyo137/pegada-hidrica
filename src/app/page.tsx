import { ChartsSection } from "@/app/components/ChartsSection";
import { DailyWaterCalculator } from "@/app/components/DailyWaterCalculator";
import { DigitalWaterSimulator } from "@/app/components/DigitalWaterSimulator";
import { FoodComparator } from "@/app/components/FoodComparator";
import { FoodTable } from "@/app/components/FoodTable";
import { Hero } from "@/app/components/Hero";
import { Quiz } from "@/app/components/Quiz";
import { WeeklyChallenge } from "@/app/components/WeeklyChallenge";

export default function Home() {
  return (
    <>
      <Hero />
      <DailyWaterCalculator />
      <DigitalWaterSimulator />
      <ChartsSection />
      <FoodComparator />
      <FoodTable />
      <Quiz />
      <WeeklyChallenge />
    </>
  );
}
