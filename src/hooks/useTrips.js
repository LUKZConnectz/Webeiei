import { useCallback, useEffect, useState } from "react";

import { sampleTrips } from "../services/sampleData";
import { getTrips } from "../services/trips";

export function useTrips() {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSampleData, setIsSampleData] = useState(false);

  const loadTrips = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getTrips();
      setTrips(data ?? []);
      setIsSampleData(false);
    } catch (loadError) {
      setTrips(sampleTrips);
      setIsSampleData(true);
      setError(loadError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  return { error, isLoading, isSampleData, loadTrips, setTrips, trips };
}
