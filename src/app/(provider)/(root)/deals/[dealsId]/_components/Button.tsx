"use client";

import deleteAPI from "@/api/deleteAPI";
import React from "react";

function Button({ dealId }: { dealId: number }) {
  const handleClickDelete = async () => {
    const response = await deleteAPI.deleteDeal(dealId);
    console.log(response);
  };
  return (
    <div className="flex justify-end gap-2">
      <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
        관심
      </button>

      <button
        onClick={handleClickDelete}
        className="bg-blue-500 text-white px-3 py-1 rounded-md"
      >
        글 삭제
      </button>
    </div>
  );
}

export default Button;
