"use client";

import deleteAPI from "@/api/deleteAPI";
import getAPI from "@/api/getAPI";
import insertAPI from "@/api/insertAPI";
import supabase from "@/supabase/client";
import { deal } from "@/types/type";
import { useAuthStore } from "@/zustand/authStore";
import { useModalStore } from "@/zustand/modalStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Button({ dealId }: { dealId: number }) {
  // 홈으로 ~
  const router = useRouter();

  // 유저 정보 체크
  const isUser = useAuthStore((state) => state.isUser);
  const setIsUser = useAuthStore((state) => state.setIsUser);
  const setIsNotUser = useAuthStore((state) => state.setIsNotUser);

  const setIsModal = useModalStore((state) => state.setIsModal);

  const isLike = useAuthStore((state) => state.isLike);
  const setIsLike = useAuthStore((state) => state.setIsLike);
  const setIsNotLike = useAuthStore((state) => state.setIsNotLike);

  // const [user, setUser] = useState<deal | null>(null);
  // console.log(user);

  // 로그인한 계정이 지금 들어와있는 글을 만든 계정인지 체크
  useEffect(() => {
    (async () => {
      const response = (await getAPI.getDeal(dealId)) as deal;
      if (!response) return;
      // setUser(response[0].authorId);

      await supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user.id === response[0].authorId) {
          setIsUser();
        } else {
          setIsNotUser();
        }
      });
    })();
  }, [dealId, setIsNotUser, setIsUser]);

  // 글 삭제 (DB delete)
  const handleClickDelete = async () => {
    const response = await deleteAPI.deleteDeal(dealId);
    console.log(response);
    alert("글이 삭제되었습니다!...");
    router.push("/");
  };

  // 관심 버튼 (DB insert)
  const handleClickLikeBUtton = async () => {
    if (!isLike) {
      await supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const userId = session.user.id;
          console.log(userId);
          const like = await insertAPI.insertDeal(userId, dealId);
          setIsLike();
          if (like) return alert("관심 목록에 추가되었습니다!...");
        } else {
          alert("로그인 후 이용부탁드려용!...");
          setIsModal(true);
        }
      });
    } else {
      await deleteAPI.deleteLike(dealId);
      alert("어쩔티비");
      setIsNotLike();
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={handleClickLikeBUtton}
        className="bg-blue-500 text-white px-3 py-1 rounded-md"
      >
        {isLike ? "관심 취소" : "관심"}
      </button>

      {isUser ? (
        <div className="flex gap-2">
          <button
            onClick={handleClickDelete}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            글 삭제
          </button>

          <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
            <Link href={`/deals/${dealId}/edit`}>글 수정하기</Link>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Button;
