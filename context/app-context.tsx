// context/AppContext.tsx
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

export enum MEALTYPE {
  BREAKFAST = 'Breakfast', 
  LUNCH = 'Lunch',   
  DINNER = 'Dinner',
  SNACK = 'Snack'
}

export const mealTypeValues = Object.values(MEALTYPE);

export type Ingredient = { 
    name: string; 
    weight: number 
    protein: number,
    fat: number,
    carbs: number,
    calories: number;
};

export type Meal = {
    id: string;
    ingredients: Ingredient[];
    mealOfTheDay: MEALTYPE;
};

type State = {
    meals: Meal[];
    currentMeal: Meal | null;
    loading: true;
    mealPicked: MEALTYPE | null;
};

type Action =
    | { type: "SET_PICKED_MEAL", payload: MEALTYPE | null}
    | { type: "SET_MEALS"; payload: Meal[] }
    | { type: "SET_CURRENT_MEAL"; payload: Meal}
    | { type: "SET_CURRENT_MEAL_MOTD"; payload: MEALTYPE }
    | { type: "ADD_MEAL"; payload: Meal };

const initialState: State = {
    meals: [],
    currentMeal: null,
    loading: true,
    mealPicked: null,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PICKED_MEAL":
            return { ...state, mealPicked: action.payload};

        case "SET_MEALS":
            return { ...state, meals: action.payload };

        case "SET_CURRENT_MEAL":
            return { ...state, currentMeal: action.payload};

        case "ADD_MEAL":
            return { ...state, meals: [...state.meals, action.payload], };

        case "SET_CURRENT_MEAL_MOTD":
            return {
                ...state,
                currentMeal: {
                ...state.currentMeal!,
                mealOfTheDay: action.payload
                }
            };

        default:
            return state;
    }
};

const AppContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState );  
    
    useEffect(() => {
        const loadInitialMeals = async () => {
            try {
                const res = await fetch ("http://192.168.1.67:3000/initialMeals");
                const data = await res.json();
                console.log("Raw server response:", data);
                const mealsWithId = data.result.meals.map((meal: any) => ({
                    ...meal,
                    id: uuidv4(),
                }));

                dispatch({type: "SET_MEALS", payload: mealsWithId });
            } catch (err) {
                console.error("Failed to load meals:", err);
            }
        };
        console.log("Loading init meals.");
        loadInitialMeals();
    }, []);


    useEffect(() => {
        console.log("App state:", state);
    }, [state]);

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
