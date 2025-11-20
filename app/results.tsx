import MealPickTile from "@/components/ui/mealpick-tile";
import { COLORS } from '@/utilities/constants';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';


export default function ResultsScreen() {  
  const router = useRouter();  
  const { imageUri, meal } = useLocalSearchParams<{ imageUri: string, meal: string }>();  
  const normalizedMeal =
    Array.isArray(meal) ? meal[0] : meal ?? null;
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  // const ingredients = mealData.detectedIngredients;

  // const heaviestIngredient = ingredients.reduce((max, current) =>
  //   current.weightGrams > max.weightGrams ? current : max
  // );

  // const heaviestName = heaviestIngredient.name;
  // const macros = mealData.macros;

  // const protein = macros.protein;
  // const carbs = macros.carbs;     
  // const fat = macros.fat;   
  // const tcal = mealData.totalCalories;      



  return (
    <View style={styles.container}>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{flex:1}}
        />
      )}
      <View style={styles.resultsView}>
        {/* <Text style={styles.resultsTitle}>{heaviestName} Dish</Text> */}
        {/* {<IngredientsTile
          ingredients={mealData.detectedIngredients.map(({ name, weightGrams }) => ({ name, weightGrams }))}
          onPress={() => console.log("Meal added")}
          style={{flex:4}}
        />} */}
        <View style={{flexDirection: "row", flex:3, columnGap:8}}>
          <View style={{flex:1}}>
            {/* <MacroTile protein={protein} carbs={carbs} fat={fat} cals={tcal} /> */}
          </View>
          <View style={{flex:1}}>
            <MealPickTile defaultMeal={normalizedMeal}/>
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
            <Pressable style={[styles.saveButton, {}]}>
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
    maxWidth: 393,
    alignSelf: "center",
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
