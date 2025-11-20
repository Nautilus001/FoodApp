import mockMealPayload from '@/assets/mockMealPayload.json';
import IngredientsTile from '@/components/ui/ingredients-tile';
import MacroTile from '@/components/ui/macro-tile';
import MealPickTile from "@/components/ui/mealpick-tile";
import { Meal, useAppContext } from '@/context/app-context';
import { COLORS } from '@/utilities/constants';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';



export default function ResultsScreen() {  
  const router = useRouter();  
  const { imageUri, mealPicked } = useLocalSearchParams<{ imageUri: string, mealPicked: string }>();  
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<"Breakfast" | "Lunch" | "Dinner" | "Snack" | null>(mealPicked as "Breakfast" | "Lunch" | "Dinner" | "Snack" | null);
  const { dispatch } = useAppContext();
  
  const meal = {
    type: mealPicked,
    ingredients: mockMealPayload.ingredients.map(ing => ({
      name: ing.name,
      weight: ing.weight,
      calories: ing.calories,
      macros: { protein: ing.protein, fat: ing.fat, carbs: ing.carb },
    })),
  };

  const heaviestIngredient = meal.ingredients.reduce((max, ing) => {
    return ing.weight > max.weight ? ing : max;
  }, meal.ingredients[0]);

  const totalMacros = meal.ingredients.reduce(
    (acc, ing) => ({
      protein: acc.protein + ing.macros.protein,
      fat: acc.fat + ing.macros.fat,
      carbs: acc.carbs + ing.macros.carbs
    }),
    { protein: 0, fat: 0, carbs: 0 }
  );

  const totalCalories = meal.ingredients.reduce((sum, ing) => sum + ing.calories, 0);

  const handleSave = () => {
    if (!selectedMeal) return;

    const newMeal: Meal = {
      type: selectedMeal,
      ingredients: meal.ingredients,
    };

    dispatch({ type: "ADD_MEAL", payload: newMeal });
    router.push("/dashboard");
  };


  return (
    <View style={styles.container}>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{flex:1}}
        />
      )}
      <View style={styles.resultsView}>
        <Text style={styles.resultsTitle}>{heaviestIngredient.name} Dish</Text>
        <View style={{flex:4}}>
          <IngredientsTile
            ingredients={meal.ingredients.map(({ name, weight }) => ({ name, weight }))}
            onPress={() => console.log("Meal added")}
          />
        </View>
        
        <View style={{flexDirection: "row", flex:3, columnGap:8}}>
          <View style={{flex:1}}>
            <MacroTile protein={totalMacros.protein} carbs={totalMacros.carbs} fat={totalMacros.fat} cals={totalCalories} />
          </View>
          <View style={{flex:1}}>
            <MealPickTile defaultMeal={mealPicked} onSelect={mealType => setSelectedMeal(mealType)} />
          </View>
        </View>
        <View style={styles.feedbackRow}>
          <View style={{flexDirection: "row", columnGap:8,}}>
            <Pressable
              style={[
                styles.feedbackButton,
                feedback === "up" && { backgroundColor: COLORS.primaryLight}
              ]}
              onPress={() => setFeedback(feedback === "up" ? null : "up")}
            >
              <Feather name="thumbs-up" size={50} color={feedback === "up" ? COLORS.highlight : COLORS.primaryDark} />
            </Pressable>
            <Pressable
              style={[
                styles.feedbackButton,
                feedback === "down" && { backgroundColor: COLORS.primaryLight }
              ]}
              onPress={() => setFeedback(feedback === "down" ? null : "down")}
            >              
              <Feather name="thumbs-down" size={50} color={feedback === "down" ? COLORS.highlight : COLORS.primaryDark} />
            </Pressable>
          </View>
          <View style={{flex:1}}>
            <Pressable style={[styles.saveButton, {}]} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignSelf: "center",
    width: "100%",
    maxWidth: 393,
  },
  resultsView: {
    flex:2,
    rowGap: 8,
    padding:10,
    borderRadius:10,
    marginTop:-10,
    backgroundColor: COLORS.primaryDark,
  },
  resultsTitle: {
    fontFamily: "Inter_700Regular",
    fontSize: 30,
    fontWeight: "regular",
    color: COLORS.primaryLight,
    alignSelf: "center"
  },
  feedbackRow: {
    flex:2,
    flexDirection: "row",
    columnGap:8,
  },
  feedbackButton: {
    width: 65,
    height: 65,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.highlight,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    maxHeight: 65,
  },
  buttonText: {
    color: COLORS.primaryLight,
    fontFamily: "Inter_700Bold",
    fontWeight: "bold",
    fontSize: 24,

  },
})
