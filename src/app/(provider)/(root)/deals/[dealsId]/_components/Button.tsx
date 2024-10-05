"use client";

import deleteAPI from "@/api/deleteAPI";
import insertAPI from "@/api/insertAPI";
import supabase from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { useModalStore } from "@/zustand/modalStore";
import { useRouter } from "next/navigation";
import React from "react";

function Button({ dealId }: { dealId: number }) {
  // 홈으로 ~
  const router = useRouter();

  // 유저 정보 체크
  const isUser = useAuthStore((state) => state.isUser);
  console.log(isUser);

  const setIsModal = useModalStore((state) => state.setIsModal);

  // 글 삭제 (DB)
  const handleClickDelete = async () => {
    const response = await deleteAPI.deleteDeal(dealId);
    console.log(response);
    alert("글이 삭제되었습니다!...");
    router.push("/");
  };

  const handleClickLikeBUtton = async () => {
    await supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const userId = session.user.id;
        console.log(userId);
        const like = await insertAPI.insertDeal(userId, dealId);
        if (like) return alert("관심 목록에 추가되었습니다!...");
      } else {
        alert("로그인 후 이용부탁드려용!...");
        setIsModal(true);
      }
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={handleClickLikeBUtton}
        className="bg-blue-500 text-white px-3 py-1 rounded-md"
      >
        관심
      </button>

      {isUser ? (
        <button
          onClick={handleClickDelete}
          className="bg-blue-500 text-white px-3 py-1 rounded-md"
        >
          글 삭제
        </button>
      ) : null}
    </div>
  );
}

export default Button;
