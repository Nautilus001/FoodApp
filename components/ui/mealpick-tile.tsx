// components/MealPickTile.tsx
import { mealTypeValues, useAppContext } from "@/context/app-context";
import { COLORS } from "@/utilities/constants";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MealPickTile() {
  const { state, dispatch } = useAppContext();
  const selected = state.currentMeal?.mealOfTheDay ?? state.mealPicked;

  return (
    <View style={styles.tile}>
      <Text style={styles.title}>Select Meal</Text>
      <View style={styles.mealColumn}>
        {mealTypeValues.map((mealName) => (
          <Pressable
            key={mealName}
            style={[
              styles.mealButton,
              selected === mealName && styles.mealButtonSelected,
            ]}
            onPress={() => {
              console.log(mealName);
              dispatch({type: "SET_CURRENT_MEAL_MOTD", payload: mealName});
            }}
          >
            <Text
              style={[
                styles.mealButtonText,
                selected === mealName && styles.mealButtonTextSelected,
              ]}
            >
              {mealName}
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
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.primaryLight,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: COLORS.highlight,
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
