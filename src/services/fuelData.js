export const defaultFuelPrices = [
  { name: "Gasohol 91", price: 34.68, unit: "บาท/ลิตร" },
  { name: "Gasohol 95", price: 36.15, unit: "บาท/ลิตร" },
  { name: "E20", price: 32.34, unit: "บาท/ลิตร" },
  { name: "Diesel", price: 32.94, unit: "บาท/ลิตร" }
];

export function getBestFuelPrice(fuelPrices = defaultFuelPrices) {
  return fuelPrices.reduce((bestPrice, fuel) => (fuel.price < bestPrice.price ? fuel : bestPrice), fuelPrices[0]);
}
