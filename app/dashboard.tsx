import ProgressTile from '@/components/ui/progress-tile';
import Tile from '@/components/ui/tile';
import { mealTypeValues, useAppContext } from '@/context/app-context';
import { COLORS } from "@/utilities/constants";
import { GlobalStyles } from "@/utilities/styles";
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const h = Dimensions.get("window").height;
const budget = 2500;

export default function Dashboard() {
    const { state, dispatch } = useAppContext();


    let date = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
    });    
    
    const router = useRouter();

    const consumed = state.meals.reduce((sum, meal) =>
        sum + meal.ingredients.reduce((mealSum, ing) => mealSum + ing.calories, 0),
        0
    );

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
            <ScrollView style={styles.scrollview}>
                <View style={styles.scrollPane}>
                    <ProgressTile budget={2500} consumed={consumed}/>
                    
                    {mealTypeValues.map(type => {
                        const mealsForThisType = state.meals.filter(m => m.mealOfTheDay === type);

                        const description =
                            mealsForThisType.length === 0
                                ? "No meals yet"
                                : mealsForThisType
                                    .map(m => m.ingredients.map(i => i.name).join(", "))
                                    .join(" | ");

                        return (
                            <Tile
                                key={type}
                                title={type}
                                description={description}
                                onPress={() => {
                                    dispatch({ type: "SET_PICKED_MEAL", payload: type});
                                    console.log(type);
                                    router.push("/capture",)
                                }}
                            />
                        );
                    })}
                </View>
            </ScrollView>
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
        paddingBottom: 300,
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
