import { supabase } from "../lib/supabase";

export async function createTrip(trip) {
  const { data, error } = await supabase.from("trips").insert([trip]).select();

  if (error) throw error;

  return data;
}

export async function getTrips() {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function deleteTrip(id) {
  const { error } = await supabase.from("trips").delete().eq("id", id);

  if (error) throw error;
}

export async function updateTrip(id, values) {
  const { data, error } = await supabase.from("trips").update(values).eq("id", id).select();

  if (error) throw error;

  return data;
}
