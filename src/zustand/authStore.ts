import { create } from "zustand";

type AuthStoreState = {
  // 로그인 타입
  isLoggedIn: boolean;
  isLogIn: () => void;
  isLogOut: () => void;

  // 유저 정보 타입
  isUser: boolean;
  setIsUser: () => void;
  setIsNotUser: () => void;

  // 관심 버튼 타입
  isLike: boolean;
  setIsLike: () => void;
  setIsNotLike: () => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  isLoggedIn: false,
  isLogIn: () => set({ isLoggedIn: true }),
  isLogOut: () => set({ isLoggedIn: false }),

  isUser: false,
  setIsUser: () => set({ isUser: true }),
  setIsNotUser: () => set({ isUser: false }),

  isLike: false,
  setIsLike: () => set({ isLike: true }),
  setIsNotLike: () => set({ isLike: false }),
}));
