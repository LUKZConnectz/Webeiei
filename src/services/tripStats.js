const currencyFormatter = new Intl.NumberFormat("th-TH", {
  currency: "THB",
  maximumFractionDigits: 0,
  style: "currency"
});

const numberFormatter = new Intl.NumberFormat("th-TH", { maximumFractionDigits: 1 });

export function formatCurrency(value = 0) {
  return currencyFormatter.format(Number(value) || 0);
}

export function formatDistance(value = 0) {
  return `${numberFormatter.format(Number(value) || 0)} กม.`;
}

export function getTripIncome(trip) {
  return Number(trip?.income) || 0;
}

export function getTripDistance(trip) {
  return Number(trip?.distance) || 0;
}

export function getTripFuelCost(trip) {
  return Number(trip?.fuel_cost) || 0;
}

export function getTripDate(trip) {
  return trip?.created_at ? new Date(trip.created_at) : new Date();
}

export function buildTripSummary(trips = []) {
  const totalIncome = trips.reduce((sum, trip) => sum + getTripIncome(trip), 0);
  const totalFuelCost = trips.reduce((sum, trip) => sum + getTripFuelCost(trip), 0);
  const totalDistance = trips.reduce((sum, trip) => sum + getTripDistance(trip), 0);

  return {
    profit: totalIncome - totalFuelCost,
    totalDistance,
    totalFuelCost,
    totalIncome,
    totalTrips: trips.length
  };
}

export function buildDailyIncome(trips = []) {
  const days = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
  const today = new Date();
  const buckets = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));

    return {
      day: days[date.getDay()],
      income: 0,
      key: date.toISOString().slice(0, 10)
    };
  });

  trips.forEach((trip) => {
    const key = getTripDate(trip).toISOString().slice(0, 10);
    const bucket = buckets.find((item) => item.key === key);
    if (bucket) bucket.income += getTripIncome(trip);
  });

  return buckets;
}

export function buildMonthlyIncome(trips = []) {
  const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  const buckets = new Map();

  trips.forEach((trip) => {
    const date = getTripDate(trip);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const current = buckets.get(key) ?? { income: 0, month: months[date.getMonth()] };
    current.income += getTripIncome(trip);
    buckets.set(key, current);
  });

  return Array.from(buckets.values()).slice(-6);
}
