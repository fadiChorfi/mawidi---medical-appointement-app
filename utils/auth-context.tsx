import { createContext, PropsWithChildren, useState } from "react";

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

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  /*  const router = useRouter(); */

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        logIn: () => {
          setIsLoggedIn(true);
          /* router.replace("/"); */
        },
        logOut: () => {
          setIsLoggedIn(false);
          /* router.replace("/"); */
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
