import { Meal, MEALTYPE } from "@/context/app-context";
import { v4 as uuidv4 } from "uuid";

export const mealTotals = (meal: Meal) => {
    console.log(meal);
    return meal.ingredients.reduce(
        (acc, ing) => ({
            protein: acc.protein + ing.protein,
            fat: acc.fat + ing.fat,
            carbs: acc.carbs + ing.carbs,
            calories: acc.calories + ing.calories,
        }),
        { protein: 0, fat: 0, carbs: 0, calories: 0 }
    );
};

export const buildMealFromServer = (
  mealOfTheDay: MEALTYPE,
  serverResult: any,
  mealPicked?: MEALTYPE | null
): Meal => ({
  id: uuidv4(),
  mealOfTheDay: mealPicked ?? mealOfTheDay,
  ingredients: serverResult.ingredients ?? [],
});

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));