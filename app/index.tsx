import Spacer from "@/components/ui/spacer";
import { COLORS } from "@/utilities/constants";
import { GlobalStyles } from "@/utilities/styles";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function HomeScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View>
                <Text style={GlobalStyles.title}>Welcome!</Text>
            </View>
            
            <View>
                <Spacer size={100} />
            </View>
            <View>\
              <Pressable style={GlobalStyles.primaryButton} onPress={() => router.push("./dashboard")}>
                  <Text style={GlobalStyles.primaryButtonText}>START</Text>
              </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: "10%",
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-around",
      backgroundColor: COLORS.primaryDark,
      alignItems: "center",
    }
});
