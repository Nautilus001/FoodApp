import Tile from "@/components/ui/tile";
import { COLORS } from "@/utilities/constants";
import { GlobalStyles } from "@/utilities/styles";
import Entypo from '@expo/vector-icons/Entypo';

import mealData from "@/assets/mockNutritionalPayload.json";
import ProgressTile from "@/components/ui/progress-tile";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Animated, Dimensions, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const h = Dimensions.get("window").height;
const budget = 2500;
let consumed = 0;

export default function Dashboard() {

    let date = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
    });    
    
    const router = useRouter();
    const fade = useRef(new Animated.Value(1)).current;
    const [showFade, setShowFade] = React.useState(false);

    function navToCapture() {
        router.push("./capture");
    }

    function onScroll(  e: NativeSyntheticEvent<NativeScrollEvent>) {
        const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
        const atBottom = contentOffset.y >= contentSize.height - layoutMeasurement.height - 1;
        setShowFade(!atBottom);
    }

    return (
        <View style={GlobalStyles.container}>
            <View style={styles.headerView}>
                <View style={styles.chevronView} >            
                    <Entypo name="chevron-left" size={60} color = {COLORS.primaryLight} />
                </View>
                <View style={styles.dateView}>
                    <Text style={styles.dateText}>{date}</Text>
                </View>
                <View style={styles.chevronView}>
                    <Entypo name="chevron-right" size={60} color = {COLORS.primaryLight} />
                </View>
            </View>
            <ScrollView style={styles.scrollview} onScroll={onScroll}>
                <View style={styles.scrollPane}>

                    {(() => {
                    let consumed = 0;

                    const tiles = mealData.meals.map((meal, index) => {
                        const totals = meal.ingredients.reduce(
                        (sum, ing) => ({
                            calories: sum.calories + ing.calories,
                            fat: sum.fat + ing.fatGrams,
                            carbs: sum.carbs + ing.carbGrams,
                            protein: sum.protein + ing.proteinGrams,
                        }),
                        { calories: 0, fat: 0, carbs: 0, protein: 0 }
                        );

                        consumed += totals.calories;

                        const mealNames = { B: "Breakfast", L: "Lunch", D: "Dinner", S: "Snack" };

                        const title = mealNames[meal.meal as keyof typeof mealNames] ?? `Meal ${index + 1}`;

                        return (
                        <Tile
                            key={index}
                            title={title}
                            description={`${Math.round(totals.calories)} cal | ${totals.protein.toFixed(1)}g P, ${totals.fat.toFixed(1)}g F, ${totals.carbs.toFixed(1)}g C`}
                            onPress={navToCapture}
                        />
                        );
                    });

                    return (
                        <>
                        <ProgressTile budget={2500} consumed={consumed} />
                        {tiles}
                        </>
                    );
                    })()}

                </View>
            </ScrollView> 
            {showFade &&  (<LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
                style={{
                    position: "absolute",
                    bottom: "12%",
                    left: 0,
                    right: 0,
                    height: "20%",
                }}
                pointerEvents="none"
            /> 
            )}
            <View style={styles.footer}>
                <View>
                    <Pressable style={styles.footerAddButton} onPress={() => router.push("./capture")}>
                        <Entypo name="plus" size={60} color = {COLORS.primaryLight} />
                    </Pressable>
                </View>
            </View>       
        </View>
    );
}

const styles = StyleSheet.create({
    headerView: {
        flexDirection: "row",
        paddingTop: Math.min(h * 0.05, 100),      
        height: "12%",
        alignContent: "center"
    },
    chevronView: {
        justifyContent: "center",
    },
    dateView: {
        justifyContent: "center",
    },
    dateText: {
        fontSize: 24,
        fontFamily: 'Inter_700Bold',
        fontWeight: "regular",
        color: COLORS.highlight,
    },
    scrollPane: {
        flex:1,
        alignItems: "center",
        rowGap: 8,
        margin: 8,
    },
    scrollview: {
        flex:1,
        width: "100%",
        height: "75%",
    },
    footer: {
        height: "12%",
    },
    footerAddButton: {
        marginTop: "-50%",
        width: 75,
        height: 75,
        borderWidth: 5,
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.highlight,
        borderColor: COLORS.primaryDark,
    },
})
