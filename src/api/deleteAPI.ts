import supabase from "@/supabase/client";

async function deleteDeal(dealsId: number) {
  const response = await supabase.from("deals").delete().eq("id", dealsId);
  return response;
}

async function deleteLike(dealId: number) {
  const response = await supabase.from("likes").delete().eq("dealId", dealId);
  return response;
}

const deleteAPI = {
  deleteDeal,
  deleteLike,
};

export default deleteAPI;
