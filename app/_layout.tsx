import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <StatusBar translucent />
      <Stack.Screen
        name="(onboarding)/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(home)/home" options={{ headerShown: false }} />
      <Stack.Screen
        name="doctor/[docID]"
        options={{ headerShown: true, title: "doctor" }}
      />
      <Stack.Screen
        name="notifications"
        options={{ headerShown: true, title: "Notifications", headerTitleAlign: "center" }}
      />
    </Stack>
  );
}
