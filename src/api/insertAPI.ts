import supabase from "@/supabase/client";
import { Database } from "../../database.types";

async function insertDeal(userId: string, dealId: number) {
  const data: Database["public"]["Tables"]["likes"]["Insert"] = {
    userId,
    dealId,
  };
  const response = await supabase.from("likes").insert(data);
  return response;
}

const insertAPI = {
  insertDeal,
};

export default insertAPI;
