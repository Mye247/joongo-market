import supabase from "@/supabase/client";
import { deals } from "@/types/type";

async function getDeals() {
  try {
    const response = await supabase.from("deals").select("*");
    const deals = response.data as deals[];

    return deals;
  } catch (e) {
    console.error(e);
  }
}

async function getDeal(dealsId: number) {
  const response = await supabase.from("deals").select("*").eq("id", dealsId);
  const deal = response.data as deals | null;

  return deal;
}

async function getUser() {
  const response = await supabase.auth.getUser();
  const user = response.data;

  return user;
}

const getAPI = {
  getDeals,
  getDeal,
  getUser,
};

export default getAPI;
