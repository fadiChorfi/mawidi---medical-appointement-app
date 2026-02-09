import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type AuthState = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        logIn: () => {
          setIsLoggedIn(true);
          router.replace("/(home)");
        },
        logOut: () => {
          setIsLoggedIn(false);
          router.replace("/(auth)/log-in");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
