import { useAppContext } from "@/context/app-context";
import { COLORS } from "@/utilities/constants";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function EditIngredientsScreen() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  if (!state.currentMeal) return <View><Text>No meal selected for editing</Text></View>;

  type EditableIngredientKey = "name" | "weight" | "calories";

  const [localIngredients, setLocalIngredients] = useState(
    state.currentMeal.ingredients.map(ing => ({ ...ing }))
  );

  useEffect(() => {
    if (state.currentMeal) {
      setLocalIngredients(state.currentMeal.ingredients.map(ing => ({ ...ing })));
    }
  }, [state.currentMeal]);

  const updateIngredient = (
    index: number,
    key: EditableIngredientKey,
    value: string | number
  ) => {
    setLocalIngredients(prev => {
      const copy = [...prev];
      const updated = { ...copy[index] };

      if (key === "name") updated.name = value as string;
      else if (key === "weight") updated.weight = value as number;
      else if (key === "calories") updated.calories = value as number;

      copy[index] = updated;
      return copy;
    });
  };

  const handleSave = () => {
    if (!state.currentMeal) return;
    const updatedMeal = { ...state.currentMeal, ingredients: localIngredients };

    dispatch({ type: "UPDATE_MEAL", payload: updatedMeal });
    dispatch({ type: "SET_CURRENT_MEAL", payload: updatedMeal });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Ingredients</Text>
      <FlatList
        data={localIngredients}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.ingredientRow}>
            <TextInput
              value={localIngredients[index].name}
              style={styles.input}
              onChangeText={(t) => updateIngredient(index, "name", t)}
            />
            <TextInput
              value={String(localIngredients[index].weight)}
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(b) => updateIngredient(index, "weight", Number(b))}
            />
          </View>
        )}
      />
      <View style={styles.buttonRow}>
        <Pressable style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, maxWidth:400, width: "100%", alignSelf: "center", paddingTop: 60, paddingBottom: 60, paddingLeft: 16, paddingRight: 16, backgroundColor: COLORS.primaryDark },
    title: { fontSize: 24, fontWeight: "bold", color: COLORS.primaryLight, marginBottom: 16, },
    ingredientRow: { flexDirection: "row", marginBottom: 12, columnGap: 8 },
    input: {
        flex: 1,
        padding: 8,
        borderRadius: 6,
        backgroundColor: COLORS.primaryLight,
        color: COLORS.primaryDark,
    },
    buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 24 },
    button: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center", marginHorizontal: 4 },
    saveButton: { backgroundColor: COLORS.highlight },
    cancelButton: { backgroundColor: COLORS.secondaryDark || "#888" },
    buttonText: { color: COLORS.primaryLight, fontWeight: "bold", fontSize: 18 },
});
