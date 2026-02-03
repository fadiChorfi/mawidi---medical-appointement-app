import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  const logged = true;
  if (logged) {
    return <Redirect href={"/(home)/home"} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
