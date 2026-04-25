import { useEffect, useState } from "react";
import WeeklyBar from "../components/WeeklyBar";
import { fetchSummary, type WeeklySummary } from "../lib/api";
import { getUserId } from "../lib/user";

export default function Summary() {
  const [userId] = useState(() => getUserId());
  const [summary, setSummary] = useState<WeeklySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadSummary() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSummary(userId);
        if (active) {
          setSummary(data);
        }
      } catch {
        if (active) {
          setSummary(null);
          setError("Could not load your weekly summary right now.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadSummary();

    return () => {
      active = false;
    };
  }, [userId]);

  const hasData = summary ? summary.byDay.some((day) => day.minutes > 0) : false;

  return (
    <section className="card">
      <h2>7-day summary</h2>
      <div className="chart-wrap">
        {loading && <p style={{ color: "var(--muted)" }}>Loading chart...</p>}
        {!loading && error && <p style={{ color: "#b42318" }}>{error}</p>}
        {!loading && !error && summary && hasData && <WeeklyBar data={summary.byDay} />}
        {!loading && !error && summary && !hasData && (
          <p style={{ color: "var(--muted)" }}>
            No study sessions logged in the last 7 days yet.
          </p>
        )}
      </div>
      {summary && !loading && !error && (
        <p className="chart-meta" style={{ marginTop: 10 }}>
          <strong>Total:</strong> {summary.totalThisWeek} min | <strong>Streak:</strong>{" "}
          {summary.streakDays} days
        </p>
      )}
    </section>
  );
}
