import { useEffect, useRef, useState } from "react";
import { fetchActiveTags } from "../services/gatewayClient";

export default function useActiveTags({ intervalMs = 1000 } = {}) {
  const [scans, setScans] = useState([]);
  const [status, setStatus] = useState("connecting");
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    let alive = true;

    async function tick() {
      try {
        const rows = await fetchActiveTags();
        if (!alive) return;
        setScans(rows ?? []);
        setStatus("live");
        setError(null);
      } catch (e) {
        if (!alive) return;
        setStatus("error");
        setError(e?.message || String(e));
      }
    }

    tick();
    timerRef.current = setInterval(tick, intervalMs);

    return () => {
      alive = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [intervalMs]);

  return { scans, status, error };
}