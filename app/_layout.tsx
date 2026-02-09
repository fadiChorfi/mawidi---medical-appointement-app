import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function RootLayout() {
  /* const { isLoggedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter(); */

  /* useEffect(() => {
    const timeout = setTimeout(() => {
      const inAuthGroup = segments[0] === "(auth)";

      if (!isLoggedIn && !inAuthGroup) {
        router.replace("/(auth)/log-in");
      } else if (isLoggedIn && inAuthGroup) {
        router.replace("/(home)");
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [isLoggedIn, segments, router]); */

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(home)" />
        <Stack.Screen name="(onboarding)" />
      </Stack>
    </>
  );
}
