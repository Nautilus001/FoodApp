import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { OpenSans_400Regular, OpenSans_700Bold, useFonts } from '@expo-google-fonts/open-sans';
import { Stack } from "expo-router";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
    OpenSans_400Regular,
    OpenSans_700Bold,
  });

  if (!fontsLoaded) return null;
  
  return <Stack screenOptions={{ headerShown: false }}/>;
}
