"use client";

import getAPI from "@/api/getAPI";
import { deals } from "@/types/type";
import React, { useEffect, useState } from "react";

function MyDealsPage() {
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState<deals[]>([]);

  const [likes, setLikes] = useState<deals[]>([]);

  useEffect(() => {
    (async () => {
      // 유저가 쓴 글 가져오기
      const user = await getAPI.getUser();
      setUserId(String(user.user?.id));
      if (!String(user.user?.id)) return;

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
    <main className="p-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">내 판매글</h2>

        <ul className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-bold mb-3">내가 작성한 판매글</h3>
            {posts &&
              posts.map((post) => (
                <li key={post.id} className="mb-3">
                  <h4>{post.title}</h4>
                  <p>{post.content}</p>
                  <p>{post.price}</p>
                </li>
              ))}
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">내가 관심 누른 판매글</h3>
            {likes &&
              likes.map((like) => (
                <li key={like.id} className="mb-3">
                  <h4>{like.title}</h4>
                  <p>{like.content}</p>
                  <p>{like.price}</p>
                </li>
              ))}
          </div>
        </ul>
      </div>
    </main>
  );
}

export default MyDealsPage;
