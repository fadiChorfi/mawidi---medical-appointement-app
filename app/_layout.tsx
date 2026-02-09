import { AuthContext, AuthProvider } from "@/utils/auth-context";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import "../global.css";

export default function RootLayout() {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  console.log("RootLayout - isLoggedIn:", authContext.isLoggedIn);

  useEffect(() => {
    if (authContext.isLoggedIn) {
      router.replace("/(home)");
    } else {
      router.replace("/(auth)/log-in");
    }
  }, [authContext.isLoggedIn, router]);
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
      </Stack>
    </AuthProvider>
  );
}
