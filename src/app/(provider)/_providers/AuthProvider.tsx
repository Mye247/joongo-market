"use client";

import supabase from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: PropsWithChildren) {
  const logIn = useAuthStore((state) => state.isLogIn);
  const logOut = useAuthStore((state) => state.isLogOut);

  const setIsUser = useAuthStore((state) => state.setIsUser);
  const setIsNotUser = useAuthStore((state) => state.setIsNotUser);

  useEffect(() => {
    (async () => {
      await supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          setIsUser();
          logIn();
        } else {
          setIsNotUser();
          logOut();
        }
      });
    })();
  }, [logIn, logOut, setIsNotUser, setIsUser]);

  return children;
}

export default AuthProvider;
