"use client";

import getAPI from "@/api/getAPI";
import { baseUrl, deals } from "@/types/type";
import Link from "next/link";
import { useEffect, useState } from "react";

function MyDealsPage() {
  // 상태 모음
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState<deals[]>([]);
  const [likes, setLikes] = useState<deals[]>([]);

  useEffect(() => {
    (async () => {
      // 현재 유저 정보 가져오기
      const user = await getAPI.getUser();
      setUserId(String(user.user?.id));
      if (!String(user.user?.id)) return;

      // 현재 유저가 작성한 글 가져오기
      const post = await getAPI.getUserPosts(userId);
      console.log("post", post);
      setPosts(post!);

      // 유저가 좋아요 누른 글 가져오기
      const likes = await getAPI.getUserLikePosts(userId);
      console.log("likes", likes);
      if (!likes) return;
      setLikes(likes!);
    })();
  }, [userId]);
  console.log(userId);

  return (
    <main className="p-4 flex gap-4 justify-around">
      <h2 className="text-2xl font-bold my-4">내 판매글</h2>

      <div className="ml-5">
        <h3 className="text-lg font-bold mb-3">내가 작성한 판매글</h3>
        <ul className="grid grid-cols-2 gap-4">
          {posts &&
            posts.map((post) => (
              <li key={post.id} className="mb-5">
                <Link href={`/deals/${post.id}`}>
                  <img
                    src={baseUrl + post.imageUrl}
                    alt=""
                    className="w-[200px] h-[200px] rounded-lg"
                  />
                  <h4>{post.title}</h4>
                  <p>{post.content}</p>
                  <p>{post.price}</p>
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-5">내가 관심 누른 판매글</h3>
        <ul>
          {likes &&
            likes.map((like) => (
              <li key={like.id} className="mb-3">
                <img
                  src={baseUrl + like.imageUrl}
                  alt=""
                  className="w-[200px] h-[200px]"
                />
                <h4>{like.title}</h4>
                <p>{like.content}</p>
                <p>{like.price}</p>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}

export default MyDealsPage;
