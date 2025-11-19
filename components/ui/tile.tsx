// components/Tile.tsx
import { COLORS } from "@/utilities/constants";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type TileProps = {
  title: string;
  description: string;
  onPress: () => void;
  style?: object;
};

export default function Tile({ title, description, onPress, style }: TileProps) {
  return (
    <View style={styles.tile}>
        <View style={styles.tileHeader}>
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
        <View style={styles.tileCTA}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Add Meal</Text>
            </Pressable>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: COLORS.secondaryDark,
    padding: 12,
    borderRadius: 10,
    width: "100%",
    maxWidth: 400,
    height: '33%',
    maxHeight: 400,
    justifyContent: "space-between"
  },
  tileHeader: {
    flexDirection: "column"
  },
  tileCTA: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: { fontSize: 18, fontFamily: "Inter_700Bold", fontWeight: "bold", color: COLORS.primaryLight, marginBottom: 8 },
  description: { fontSize: 14, fontFamily: "Inter_400Regular", color: COLORS.primaryDark, marginBottom: 12 },
  button: {
    backgroundColor: COLORS.highlight,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: { color: COLORS.primaryLight, fontFamily: "Inter_700Bold", fontWeight: "bold" },
});
