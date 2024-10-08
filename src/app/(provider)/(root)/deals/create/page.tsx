"use client";

import supabase from "@/supabase/client";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";
import { Database } from "../../../../../../database.types";

function DealsCreatePage() {
  // 글 내용 저장용
  const [image, setImage] = useState<File | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const router = useRouter();

  // 이미지 정보 가져오기
  const handleChangeFileInput: ComponentProps<"input">["onChange"] = (e) => {
    const files = e.target.files;

    if (!files) return;
    if (files.length === 0) return setImage(null);

    const file = files[0];
    setImage(file);
  };

  // 글, 이미지 집어넣기
  const handleClickCreateDeal = async () => {
    if (!image) return alert("이미지를 업로드해주세요!");
    if (!title) return alert("글 제목을 입력해주세요!");
    if (!content) return alert("글 내용을 입력해주세요!");
    if (!location) return alert("직거래 위치를 입력해주세요!");
    if (!price) return alert("물건의 가격을 입력해주세요!");

    const extension = image.name.split(".").slice(-1)[0];
    const filePath = nanoid();
    const path = `${filePath}.${extension}`;

    const img = await supabase.storage
      .from("deals")
      .upload(path, image, { upsert: true });
    console.log(img);

    const imgUrl = String(img.data?.fullPath);

    const data: Database["public"]["Tables"]["deals"]["Insert"] = {
      title,
      content,
      location,
      price: Number(price),
      imageUrl: imgUrl,
    };

    const response = await supabase.from("deals").insert(data);
    console.log(response);

    if (!response) return alert("글 작성에 실패했습니다!...");
    if (response) return alert("글 작성에 성공했습니다!...");

    router.push("/");
  };

  return (
    <main className="p-5 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-xl">판매글 작성하기</h2>
      <ul className="flex flex-col gap-y-4 mt-10">
        <li className="flex gap-5 items-center ">
          <label htmlFor="img">물건 이미지</label>
          <input id="img" type="file" onChange={handleChangeFileInput} />
        </li>

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
          <label htmlFor="title">글 내용</label>
          <input
            id="title"
            type="text"
            value={content}
            className="border border-black w-[300px] h-[40px] ml-8"
            onChange={(e) => setContent(e.target.value)}
          />
        </li>

        <li className="flex gap-5 items-center ">
          <label htmlFor="title">직거래 위치</label>
          <input
            id="title"
            type="text"
            value={location}
            className="border border-black w-[300px] h-[40px]"
            onChange={(e) => setLocation(e.target.value)}
          />
        </li>

        <li className="flex gap-5 items-center ">
          <label htmlFor="title">판매 가격</label>
          <input
            id="title"
            type="text"
            value={price}
            className="border border-black w-[300px] h-[40px] ml-4"
            onChange={(e) => setPrice(e.target.value)}
          />
        </li>
      </ul>
      <button
        onClick={handleClickCreateDeal}
        className="border border-black w-[300px] h-[35px] bg-cyan-100 rounded-md mt-5"
      >
        판매글 작성하기
      </button>
    </main>
  );
}

export default DealsCreatePage;
