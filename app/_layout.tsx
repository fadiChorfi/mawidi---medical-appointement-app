import { AuthProvider, useAuth } from "@/utils/auth-context";
import { OnboardingProvider, useOnboarding } from "@/utils/onboarding-context";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "../global.css";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { hasSeenOnboarding } = useOnboarding();
  const { isLoggedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const inOnboarding = segments[0] === "(onboarding)";
      const inAuthGroup = segments[0] === "(auth)";
      const inHomeGroup = segments[0] === "(home)";
      const isInDoctorPage = segments[0] === "doctor";

      if (!hasSeenOnboarding && !inOnboarding) {
        router.replace("/(onboarding)");
      } else if (hasSeenOnboarding && !isLoggedIn && !inAuthGroup) {
        router.replace("/(auth)/sign-in");
      } else if (isLoggedIn && !inHomeGroup && !isInDoctorPage) {
        router.replace("/(home)");
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [hasSeenOnboarding, isLoggedIn, segments, router]);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(home)" />
        <Stack.Screen name="[doctorId]" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Aeonik-Air": require("@/assets/fonts/Aeonik/Aeonik-Air.otf"),
    "Aeonik-Thin": require("@/assets/fonts/Aeonik/Aeonik-Thin.otf"),
    "Aeonik-Light": require("@/assets/fonts/Aeonik/Aeonik-Light.otf"),
    "Aeonik-Regular": require("@/assets/fonts/Aeonik/Aeonik-Regular.otf"),
    "Aeonik-Medium": require("@/assets/fonts/Aeonik/Aeonik-Medium.otf"),
    "Aeonik-Bold": require("@/assets/fonts/Aeonik/Aeonik-Bold.otf"),
    "Aeonik-Black": require("@/assets/fonts/Aeonik/Aeonik-Black.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }

  return (
    <OnboardingProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </OnboardingProvider>
  );
}
