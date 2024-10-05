import supabase from "@/supabase/client";

async function deleteDeal(dealsId: number) {
  const response = await supabase.from("deals").delete().eq("id", dealsId);
  return response;
}



const deleteAPI = {
  deleteDeal,
};

export default deleteAPI;
