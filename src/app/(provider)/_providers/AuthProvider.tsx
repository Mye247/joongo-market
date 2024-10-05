"use client";

import supabase from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: PropsWithChildren) {
  const logIn = useAuthStore((state) => state.isLogIn);
  const logOut = useAuthStore((state) => state.isLogOut);

  useEffect(() => {
    (async () => {
      await supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          logIn();
        } else {
          logOut();
        }
      });
    })();
  }, [logIn, logOut]);

  return children;
}

export default AuthProvider;
