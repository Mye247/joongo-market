import supabase from "@/supabase/client";
import { Deals } from "@/types/type";

// 글 전부 가져오기
async function getDeals() {
  try {
    const response = await supabase.from("deals").select("*").limit(100);
    const deals = response.data as Deals[];

    return deals;
  } catch (e) {
    console.error(e);
  }
}

// 글 상세페이지
async function getDeal(dealsId: number) {
  const response = await supabase
    .from("deals")
    .select("*")
    .eq("id", dealsId)
    .limit(1000000000000000)
    .single();
  const deal = response.data as Deals | null;

  return deal;
}

// 유저
async function getUser() {
  const response = await supabase.auth.getUser();
  const user = response.data;

  return user;
}

// 유저가 만든 글
async function getUserPosts(userId: string) {
  const response = await supabase
    .from("deals")
    .select("*")
    .eq("authorId", userId);
  const likes = response.data;

  return likes;
}

// 유저가 관심누른것들
async function getUserLikePosts(userId: string) {
  const response = await supabase
    .from("deals")
    .select(
      `
      *,
      likes!inner(userId)
    `
    )
    .eq("likes.userId", userId);

  const data = response.data;

  return data;
}

const getAPI = {
  getDeals,
  getDeal,
  getUser,
  getUserPosts,
  getUserLikePosts,
};

export default getAPI;
