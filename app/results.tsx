import IngredientsTile from '@/components/ui/ingredients-tile';
import MacroTile from '@/components/ui/macro-tile';
import MealPickTile from '@/components/ui/mealpick-tile';
import { useAppContext } from '@/context/app-context';
import { COLORS } from '@/utilities/constants';
import { mealTotals } from '@/utilities/utils';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';



export default function ResultsScreen() {  
  const router = useRouter();  
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();  
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const { state, dispatch } = useAppContext();
  
  if (!state.currentMeal) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.primaryDark }}>
        <ActivityIndicator size="large" color={COLORS.highlight} />
      </View>
    );
  }

  const heaviestIngredient = state.currentMeal.ingredients.length > 0
    ? state.currentMeal.ingredients.reduce((max, ing) => ing.weight > max.weight ? ing : max, state.currentMeal.ingredients[0])
    : null;

  const nutrition = mealTotals(state.currentMeal!);
  console.log(nutrition);

  const handleSave = () => {
    if (!state.currentMeal) return;

    
    dispatch({ type: "ADD_MEAL", payload: state.currentMeal });
    router.push("/dashboard");
  };


  return (
    <View style={{ flex:1, backgroundColor: COLORS.primaryDark}}>
      <View style={styles.container}>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{flex:1}}
          />
        )}
        <View style={styles.resultsView}>
          <Text style={styles.resultsTitle}>
            {heaviestIngredient ? `${heaviestIngredient.name} Dish` : "Meal"}
          </Text>
          <View style={{flex:4}}>
            <IngredientsTile
              ingredients={state.currentMeal.ingredients.map(({ name, weight }) => ({ name, weight }))}
              onPress={() => {router.push("./editingredients")}}
            />
          </View>
          
          <View style={{flexDirection: "row", flex:3, columnGap:8}}>
            <View style={{flex:1}}>
              <MacroTile protein={nutrition.protein} carbs={nutrition.carbs} fat={nutrition.fat} cals={nutrition.calories} />
            </View>
            <View style={{flex:1}}>
              <MealPickTile/>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignSelf: "center",
    width: "100%",
    maxWidth: 393,
    backgroundColor: COLORS.primaryDark,
  },
  resultsView: {
    flex:2,
    rowGap: 8,
    padding:10,
    borderRadius:10,
    borderColor: COLORS.primaryLight,
    borderTopWidth:0.5,
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


