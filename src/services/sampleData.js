export const sampleTrips = [
  {
    id: "sample-1",
    platform: "Grab",
    distance: 5.2,
    income: 120,
    fuel_cost: 38,
    created_at: new Date().toISOString()
  },
  {
    id: "sample-2",
    platform: "LINE MAN",
    distance: 3.1,
    income: 90,
    fuel_cost: 23,
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "sample-3",
    platform: "ShopeeFood",
    distance: 4.5,
    income: 115,
    fuel_cost: 32,
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
];
