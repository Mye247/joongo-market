"use client";

import getAPI from "@/api/getAPI";
import supabase from "@/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Database } from "../../../../../../../database.types";

function PostEditPage(props: { params: { dealsId: number } }) {
  const { dealsId } = props.params;

  // 글 내용 저장용
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const [deal, setDeal] = useState();
  console.log(deal);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getAPI.getDeal(dealsId);
      if (!response) return;
      setDeal(response[0]);

      setTitle(response[0].title);
      setContent(response[0].content);
      setLocation(response[0].location);
      setPrice(response[0].price);
    })();
  }, [dealsId]);

  // 글 수정하기
  const handleClickModifyDeal = async () => {
    if (!title) return alert("글 제목을 입력해주세요");
    if (!content) return alert("글 내용을 입력해주세요");
    if (!location) return alert("직거래 위치를 입력해주세요");
    if (!price) return alert("물건의 가격을 입력해주세요");

    const data: Database["public"]["Tables"]["deals"]["Update"] = {
      title,
      content,
      location,
      price: Number(price),
    };

    const response = await supabase
      .from("deals")
      .update(data)
      .eq("id", dealsId);
    console.log(response);

    if (!response) return alert("글 수정에 실패했습니다!...");
    if (response) return alert("글 수정에 성공했습니다!...");

    router.push("/");
  };

  return (
    <main className="p-5 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-xl">판매글 수정하기</h2>
      <ul className="flex flex-col gap-y-4 mt-10">
        <li className="flex gap-5 items-center ">
          <label htmlFor="title">글 제목</label>
          <input
            id="title"
            type="text"
            value={title}
            className="border border-black w-[300px] h-[40px] ml-8"
            onChange={(e) => setTitle(e.target.value)}
          />
        </li>

        <li className="flex gap-5 items-center ">
          <label htmlFor="content">글 내용</label>
          <input
            id="content"
            type="text"
            value={content}
            className="border border-black w-[300px] h-[40px] ml-8"
            onChange={(e) => setContent(e.target.value)}
          />
        </li>

        <li className="flex gap-5 items-center ">
          <label htmlFor="location">직거래 위치</label>
          <input
            id="location"
            type="text"
            value={location}
            className="border border-black w-[300px] h-[40px]"
            onChange={(e) => setLocation(e.target.value)}
          />
        </li>

        <li className="flex gap-5 items-center ">
          <label htmlFor="price">판매 가격</label>
          <input
            id="price"
            type="text"
            value={price}
            className="border border-black w-[300px] h-[40px] ml-4"
            onChange={(e) => setPrice(e.target.value)}
          />
        </li>
      </ul>
      <button
        onClick={handleClickModifyDeal}
        className="border border-black w-[300px] h-[35px] bg-cyan-100 rounded-md mt-5"
      >
        판매글 수정하기
      </button>
    </main>
  );
}

export default PostEditPage;
