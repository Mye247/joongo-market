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
      const user = await supabase.auth.getUser();
      if (user.data) {
        setIsUser();
      } else {
        setIsNotUser();
      }
    })();

    (async () => {
      await supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          logIn();
        } else {
          logOut();
        }
      });
    })();
  }, [logIn, logOut, setIsUser]);

  return children;
}

export default AuthProvider;
