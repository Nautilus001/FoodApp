// components/IngredientsTile.tsx
import { COLORS } from "@/utilities/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TileProps = {
  protein: number;
  carbs: number;
  fat: number;
  cals: number;
  style?: object;
};

export default function MacroTile({ protein, carbs, fat, cals, style }: TileProps) {
    const biggest = Math.max(protein, fat, carbs);

    const macroBar = (value: number, color: string = COLORS.highlight) => {
        const proportion = value / biggest; // 0–1 scale relative to largest macro
        return (
            <View
                style={{
                    width: 100*proportion,
                    height: 16,
                    backgroundColor: color,
                }}
            />
        );
    };

    return (
        <View style={ styles.tile }>
            <View style={styles.macroRow}>
                <Text style={styles.macroLabel}>P</Text>
                {macroBar(protein)}
            </View>
            <View style={styles.macroRow}>
                <Text style={styles.macroLabel}>F</Text>
                {macroBar(fat)}
            </View>
            <View style={styles.macroRow}>
                <Text style={styles.macroLabel}>C</Text>
                {macroBar(carbs)} 
            </View>
            <View style={styles.calRow}>
                <Text style={styles.calLabel}>kCal:</Text>
                <Text style={styles.calNumber}>{cals}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    tile: {
        flex:1,
        flexDirection: "column",
        justifyContent: "space-around",
        padding: 15,
        borderRadius: 10,
        backgroundColor: COLORS.primaryLight,
    },
    title: {
        flex:1,
        fontFamily: "Inter_700Bold",
        fontWeight: "regular",
        fontSize: 24,
        color: COLORS.highlight,
        paddingBottom: 10,
    },
    macroRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    macroLabel: {
        fontSize: 18,
        fontFamily: "Inter_700Bold",
        fontWeight: "bold",
        color: COLORS.highlight,
        paddingRight: 5,
        minWidth: 20,
    },
    calLabel: {
        fontSize: 18,
        fontFamily: "Inter_700Bold",
        fontWeight: "bold",
        color: COLORS.highlight,
    },
    calNumber: {
        fontSize: 18,
        fontFamily: "Inter_700Bold",
        fontWeight: "bold",
        color: COLORS.highlight,
    },
    calRow: {
        flexDirection: "row",
        justifyContent:"space-between",
    },
});
