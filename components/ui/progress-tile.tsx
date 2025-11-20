// components/Tile.tsx
import { COLORS } from "@/utilities/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TileProps = {
  budget: number;
  consumed: number;
  style?: object;
};

export default function ProgressTile({ budget, consumed, style }: TileProps) {

  return (
    <View style={styles.tile}>
        <View style={styles.barView}>
            <View style={[
                styles.barFilled,
                {
                width: `${Math.min(consumed / budget * 100, 100)}%`,
                },
            ]}/>
        </View>
        <View style={styles.summaryView}>
          <View style={styles.labelView}>
            <Text style={styles.labelTitle}>
              Intake:
            </Text>
            <Text style={styles.labelNumber}>
              {consumed.toLocaleString()} cal.
            </Text>
          </View>
          <View style={styles.labelView}>
            <Text style={styles.labelTitle}>
              Available:
            </Text>
            <Text style={styles.labelNumber}>
              {Math.max((budget-consumed), 0).toLocaleString()} cal.
            </Text>
          </View>
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
    maxHeight: 100,
    flexDirection: "column",
    alignItems: "center"
  },
  barView: {
    width: "95%",
    maxWidth: 350,
    maxHeight: 15,
    height: "10%",
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
  },
  barFilled: {
    position: "absolute",
    backgroundColor: COLORS.highlight,
    height: "100%",
    borderRadius: 10,
  },
  summaryView: {
    flex:1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignSelf: "flex-start"
  },
  labelView: {
    padding: 10,
    justifyContent: "flex-start",
  },
  labelTitle: {
    fontFamily: "Inter_400Regular",
    fontWeight: "regular",
    fontSize: 12,
    color: COLORS.primaryLight,
  },
  labelNumber: {
    paddingLeft: 10,
    paddingTop: 10,
    fontFamily: "Inter_700Bold",
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.highlight,
  }

});
