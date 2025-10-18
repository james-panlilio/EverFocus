import { useEffect, useState } from "react";
import WeeklyBar from "../components/WeeklyBar";
import { fetchSummary } from "../lib/api";

export default function Summary() {
  const userId = "demo-user";
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    fetchSummary(userId).then(setSummary).catch(() => setSummary(null));
  }, []);

  return (
    <section className="card">
      <h2>7-day summary</h2>
      <div className="chart-wrap">
        {summary ? <WeeklyBar data={summary.byDay} /> : <p style={{ color: "var(--muted)" }}>Loading chart…</p>}
      </div>
      {summary && (
        <p className="chart-meta" style={{ marginTop: 10 }}>
          <strong>Total:</strong> {summary.totalThisWeek} min · <strong>Streak:</strong> {summary.streakDays} days
        </p>
      )}
    </section>
  );
}
