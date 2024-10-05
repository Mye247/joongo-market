"use client";

import deleteAPI from "@/api/deleteAPI";
import insertAPI from "@/api/insertAPI";
import { useAuthStore } from "@/zustand/authStore";
import React from "react";

function Button({ dealId }: { dealId: number }) {
  // 유저 정보 체크
  const isUser = useAuthStore((state) => state.isUser);
  console.log(isUser);

  // 글 삭제 (DB)
  const handleClickDelete = async () => {
    const response = await deleteAPI.deleteDeal(dealId);
    console.log(response);
  };

  const handleClickLikeBUtton = async () => {
    const response = await insertAPI.insertDeal(userId, dealId);
    console.log(response);
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
