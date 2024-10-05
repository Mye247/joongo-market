import { create } from "zustand";

type AuthStoreState = {
  isLoggedIn: boolean;

  isLogIn: () => void;
  isLogOut: () => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  isLoggedIn: false,

  isLogIn: () => set({ isLoggedIn: true }),
  isLogOut: () => set({ isLoggedIn: false }),
}));
