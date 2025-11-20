// components/IngredientsTile.tsx
import { COLORS } from "@/utilities/constants";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Ingredient = {
  name: string;
  weight: number;
};

type TileProps = {
  ingredients: Ingredient[];
  onPress: () => void;
  style?: object;
};

export default function IngredientTile({ ingredients, onPress, style }: TileProps) {
  return (
    <View style={[styles.tile, style]}>
        <Text style={styles.title}>Ingredients</Text>
        <View style={{flexDirection: "row"}}>
            <View style={styles.ingredientList}>
                {ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientRow}>
                        <Text style={styles.ingredientName}>{ingredient.name}</Text>
                        <Text style={styles.ingredientWeight}>{ingredient.weight} g</Text>
                    </View>
                ))}
            </View>
            <View style={styles.tileCTA}>
                <Pressable style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Edit</Text>
                </Pressable>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    tile: {
        backgroundColor: COLORS.primaryLight,
        padding: 12,
        borderRadius: 10,
        flex:1,
        flexDirection: "column"
    },
    title: {
        fontFamily: "Inter_700Bold",
        fontWeight: "regular",
        fontSize: 24,
        color: COLORS.highlight,
        paddingBottom: 10,
    },
    ingredientList: {
        flex:2,
        flexDirection: "column",
    },
    ingredientRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        paddingLeft:8
    },
    ingredientName: {
        fontSize: 16,
        fontFamily: "Inter_400Regular",
        color: COLORS.highlight,
    },
    ingredientWeight: {
        fontSize: 14,
        fontFamily: "Inter_400Regular",
        color: COLORS.primaryDark,
    },
    tileCTA: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    button: {
        backgroundColor: COLORS.highlight,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        height: "50%",
        justifyContent: "center",
    },
    buttonText: {
        color: COLORS.primaryLight,
        fontFamily: "Inter_700Bold",
        fontWeight: "bold",
        fontSize: 18,
    },
});
