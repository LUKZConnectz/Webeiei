export async function getFuelPrice() {
  const response = await fetch("/api/fuel");

  if (!response.ok) {
    throw new Error("Unable to load fuel price");
  }

  return response.json();
}
