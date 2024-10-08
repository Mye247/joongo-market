"use client";

import supabase from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { useModalStore } from "@/zustand/modalStore";
import Link from "next/link";
import { PropsWithChildren } from "react";

function Header({ children }: PropsWithChildren) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logOut = useAuthStore((state) => state.isLogOut);

  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  const setIsModal = useModalStore((state) => state.setIsModal);

  const handleClickLogout = async () => {
    const response = await supabase.auth.signOut();
    console.log(response);

    logOut();
  };

  const handleClickLogin = () => {
    setIsModal(true);
  };

  return (
    <>
      <header className=" p-5 border-b border-black flex gap-5 items-center">
        <Link href={"/"}>
          <h1 className="font-bold text-2xl">중고마켓</h1>
        </Link>

        <nav>
          <ul className="flex gap-x-3">
            <li className="line-through">구입하기</li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link href={"/deals/create"}>판매하기</Link>
                </li>

                <li>
                  <Link href={"/my/deals"}>내 판매글</Link>
                </li>
              </>
            ) : null}
          </ul>
        </nav>

        {isAuthInitialized &&
          (isLoggedIn ? (
            <div className="ml-auto">
              <ul className="flex items-center gap-x-3">
                <li>
                  <button onClick={handleClickLogout}>로그아웃</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="ml-auto">
              <ul className="flex items-center gap-x-3">
                <li>
                  <Link href={"/auth/sign-up"}>회원가입</Link>
                </li>
                <li>
                  <button onClick={handleClickLogin}>로그인</button>
                </li>
              </ul>
            </div>
          ))}
      </header>

      {children}
    </>
  );
}

export default Header;
