// context/AppContext.tsx
import initialMealsJSON from "@/assets/mockMeals.json";
import React, { createContext, ReactNode, useContext, useReducer } from "react";

export type Ingredient = { 
    name: string; 
    weight: number 
    macros: { protein: number; fat: number; carbs: number };
    calories: number;
};

export type Meal = {
    ingredients: Ingredient[];
    type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
};

type State = {
    meals: Meal[];
};

type Action =
  | { type: "SET_MEALS"; payload: Meal[] }
  | { type: "ADD_MEAL"; payload: Meal }
  | { type: "UPDATE_MEAL"; index: number; payload: Meal }
  | { type: "REMOVE_MEAL"; index: number };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_MEALS":
            return { ...state, meals: action.payload };

        case "ADD_MEAL":
            return { ...state, meals: [...state.meals, action.payload] };

        case "UPDATE_MEAL":
            return {
                ...state,
                meals: state.meals.map((meal, i) =>
                i === action.index ? action.payload : meal
                ),
            };

        case "REMOVE_MEAL":
            return {
                ...state,
                meals: state.meals.filter((_, i) => i !== action.index),
            };

        default:
            return state;
    }
};

const calculateMacros = (ingredients: Ingredient[]) => ({
    protein: ingredients.reduce((sum, i) => sum + i.weight * 0.2, 0),
    fat: ingredients.reduce((sum, i) => sum + i.weight * 0.1, 0),
    carbs: ingredients.reduce((sum, i) => sum + i.weight * 0.3, 0),
});

const calculateCalories = (ingredients: Ingredient[]) =>
    ingredients.reduce((sum, i) => sum + i.weight * 2, 0);

const mealTotals = (meal: Meal) => {
  return meal.ingredients.reduce(
    (acc, ing) => ({
        protein: acc.protein + ing.macros.protein,
        fat: acc.fat + ing.macros.fat,
        carbs: acc.carbs + ing.macros.carbs,
        calories: acc.calories + ing.calories,
    }),
    { protein: 0, fat: 0, carbs: 0, calories: 0 }
  );
};

const initialState: State = {
    meals: [],
};

const initialMeals: Meal[] = initialMealsJSON.meals.map(m => ({
    type: m.meal as "Breakfast" | "Lunch" | "Dinner" | "Snack",
    ingredients: m.ingredients.map(ing => ({
        name: ing.name,
        weight: ing.weight,
        macros: { protein: ing.protein, fat: ing.fat, carbs: ing.carb },
        calories: ing.calories,
    })),
}));

const AppContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, { meals: initialMeals });    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
