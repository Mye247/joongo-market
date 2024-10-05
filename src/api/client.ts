import supabase from "@/supabase/client";
import { deals } from "@/types/type";

async function getDeals() {
  try {
    const response = await supabase.from("deals").select("*");
    const deals = response.data;

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

const dealsAPI = {
  getDeals,
  getDeal,
};

export default dealsAPI;
