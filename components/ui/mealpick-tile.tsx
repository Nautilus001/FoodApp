// components/MealPickTile.tsx
import { COLORS } from "@/utilities/constants";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const MEALS = ["Breakfast", "Lunch", "Dinner", "Snack"];

export default function MealPickTile({ defaultMeal }: {defaultMeal?: string}) {
    const normalizedMeal = Array.isArray(defaultMeal) ? defaultMeal[0] :    defaultMeal ?? null;
    const [selectedMeal, setSelectedMeal] = useState(normalizedMeal);
    
    return (
    <View style={styles.tile}>
      <Text style={styles.title}>Select Meal</Text>
      <View style={styles.mealColumn}>
        {MEALS.map((meal) => (
          <Pressable
            key={meal}
            style={[
              styles.mealButton,
              selectedMeal === meal && styles.mealButtonSelected,
            ]}
            onPress={() => setSelectedMeal(meal)}
          >
            <Text
              style={[
                styles.mealButtonText,
                selectedMeal === meal && styles.mealButtonTextSelected,
              ]}
            >
              {meal}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex:1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.primaryLight,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: COLORS.highlight,
    marginBottom: 12,
  },
  mealColumn: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  mealButton: {
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 2,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
  },
  mealButtonSelected: {
    borderWidth: 2,
    borderColor: COLORS.highlight
  },
  mealButtonText: {
    color: COLORS.primaryDark,
    fontFamily: "Inter_700Bold",
    fontSize: 16,
  },
  mealButtonTextSelected: {
    color: COLORS.highlight,
  },
})
