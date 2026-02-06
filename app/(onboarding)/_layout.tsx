import { Redirect, Stack } from "expo-router";
import { StatusBar } from "react-native";
import { logged } from "./index";

export default function RootLayout() {
  const useLogged = logged;
  if (useLogged) {
    return <Redirect href={"/(home)/home"} />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <StatusBar translucent />
    </Stack>
  );
}
