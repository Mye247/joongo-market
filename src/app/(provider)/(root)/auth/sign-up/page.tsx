"use client";

import supabase from "@/supabase/client";
import { useState } from "react";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const handleClickSignUpButton = async () => {
    if (!email) return alert("이메일을 입력해주세요!");
    if (!email.includes("@") || !email.includes("."))
      return alert("이메일형식을 지켜주세요!");
    if (!password) return alert("비밀번호를 입력해주세요!");
    if (password !== checkPassword)
      return alert("비밀번호를 다시한번 확인 후 입력해주세요!");

    const response = await supabase.auth.signUp({ email, password });
    console.log(response);

    if (response) return alert("회원가입에 성공하셨습니다!");
  };

  return (
    <main className="p-5 text-center">
      <h2 className="text-xl font-semibold mb-5">회원으로 가입하기</h2>
      <div className="flex justify-center flex-col items-center">
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="이메일을 입력해주세요!"
            className="border border-black w-[300px] h-[40px] rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="비밀번호를 입력해주세요!"
            className="border border-black w-[300px] h-[40px] rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="passwordC">비밀번호 확인</label>
          <input
            id="passwordC"
            type="password"
            value={checkPassword}
            placeholder="비밀번호 확인!!"
            className="border border-black w-[300px] h-[40px] rounded-xl"
            onChange={(e) => setCheckPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleClickSignUpButton}
          className="border border-black w-[250px] h-[40px] bg-black text-white mt-10"
        >
          가입하기
        </button>
      </div>
    </main>
  );
}

export default SignUpPage;
