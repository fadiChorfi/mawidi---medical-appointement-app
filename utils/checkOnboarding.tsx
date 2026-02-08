import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface OnboardingContextValue {
  hasSeenOnboarding: boolean;
  isLoading: boolean;
  setSeenOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(
  undefined,
);

interface OnboardingProviderProps {
  children: ReactNode;
}

export function OnboardingProvider({
  children,
}: OnboardingProviderProps): React.JSX.Element {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("OnboardingSeen");
        setHasSeenOnboarding(value === "true");
      } catch (error) {
        console.error("Error reading onboarding status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkOnboarding();
  }, []);

  const setSeenOnboarding = async () => {
    try {
      await AsyncStorage.setItem("OnboardingSeen", "true");
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{ hasSeenOnboarding, isLoading, setSeenOnboarding }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
