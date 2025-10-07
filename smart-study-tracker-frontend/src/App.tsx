import { useEffect, useState } from "react";
import { createSession, fetchSessions, fetchSummary, deleteSession } from "./lib/api";
import WeeklyBar from "./components/WeeklyBar";
import Timer from "./components/Timer";

type Session = {
  id: string;
  subject: string;
  startedAt: string;
  endedAt: string;
  durationMin: number;
  notes?: string;
};

function App() {
  const userId = "demo-user"; // hardcoded for now
  const [sessions, setSessions] = useState<Session[]>([]);
  const [subject, setSubject] = useState("Maths");
  const [category, setCategory] = useState<string>("General");
  const [duration, setDuration] = useState(25);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    const s = await fetchSessions(userId);
    setSessions(s);
    const sum = await fetchSummary(userId);
    setSummary(sum);
  }

  useEffect(() => { load(); }, []);

  async function addFakeSession() {
    try {
      setLoading(true); setErr(null);
      const now = new Date();
      const startedAt = new Date(now.getTime() - duration * 60 * 1000);
      await createSession({
        userId,
        subject,
        category,
        startedAt: startedAt.toISOString(),
        endedAt: now.toISOString(),
        durationMin: duration,
        notes: "test via UI",
      });
      await load();
    } catch (e: any) {
      setErr(e.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    await deleteSession(id);
    await load();
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Smart Study Tracker (Prototype)</h1>

      <section style={{ background: "#fff", padding: 16, borderRadius: 12, marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,.08)" }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Quick add</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            style={{ flex: 1, padding: 8, border: "1px solid #ddd", borderRadius: 8 }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: 8, border: "1px solid #ddd", borderRadius: 8 }}
          >
            {["General", "Maths", "CS", "Physics", "Revision"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="number" min={1}
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value || "0", 10))}
            style={{ width: 100, padding: 8, border: "1px solid #ddd", borderRadius: 8 }}
          />
          <button onClick={addFakeSession} disabled={loading}
            style={{ padding: "8px 14px", borderRadius: 8, background: "#2563eb", color: "#fff", border: "none" }}>
            {loading ? "Saving..." : "Add session"}
          </button>
        </div>
        {err && <p style={{ color: "crimson", marginTop: 8 }}>{err}</p>}
        <p style={{ color: "#666", fontSize: 12, marginTop: 6 }}>
          This creates a session ending now (duration = X minutes). We’ll replace this with a real timer later.
        </p>
      </section>

  import Timer from "./components/Timer";
// ...
  <section style={{ background:"#fff", padding:16, borderRadius:12, marginBottom:16, boxShadow:"0 1px 4px rgba(0,0,0,.08)" }}>
    <h2 style={{ fontSize:18, marginBottom:8 }}>Pomodoro</h2>
    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
      <input value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Subject"
            style={{ flex:1, padding:8, border:"1px solid #ddd", borderRadius:8 }} />
      <input type="number" min={1} value={duration} onChange={(e)=>setDuration(parseInt(e.target.value||"0",10))}
            style={{ width:100, padding:8, border:"1px solid #ddd", borderRadius:8 }} />
    </div>
    <Timer
      minutes={duration}
      onComplete={async (_, start, end) => {
        try {
          await createSession({
            userId: "demo-user",
            subject,
            startedAt: start.toISOString(),
            endedAt: end.toISOString(),
            durationMin: duration,
            notes: "pomodoro",
          });
          await load();
        } catch { alert("Failed to save session"); }
      }}
    />
    <p style={{ color:"#666", fontSize:12, marginTop:6 }}>When the timer finishes, a session is saved automatically.</p>
  </section>


      <section style={{ background: "#fff", padding: 16, borderRadius: 12, marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,.08)" }}>
  <h2 style={{ fontSize: 18, marginBottom: 8 }}>Recent Sessions</h2>

    <ul style={{ display: "grid", gap: 8, listStyle: "none", paddingLeft: 0, margin: 0 }}>
      {sessions.length === 0 ? (
        <li style={{ color: "#666" }}>No sessions yet.</li>
      ) : (
        sessions.map((s: Session) => (
          <li
            key={s.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 8,
              padding: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{s.subject}</div>
              <div style={{ color: "#666", fontSize: 13 }}>
                {new Date(s.startedAt).toLocaleString()} → {new Date(s.endedAt).toLocaleString()} · {s.durationMin} min
              </div>
            </div>

            <button
              onClick={() => remove(s.id)}
              style={{ border: "1px solid #ddd", borderRadius: 8, padding: "6px 10px" }}
            >
              Delete
            </button>
          </li>
        ))
      )}
    </ul>
  </section>


import WeeklyBar from "./components/WeeklyBar";
// ...

  <section style={{ background:"#fff", padding:16, borderRadius:12, boxShadow:"0 1px 4px rgba(0,0,0,.08)" }}>
    <h2 style={{ fontSize:18, marginBottom:8 }}>7-day summary</h2>
    {summary ? (
      <>
        <WeeklyBar data={summary.byDay} />
        <div style={{ color:"#444", marginTop:8 }}>
          <strong>Total:</strong> {summary.totalThisWeek} min · <strong>Streak:</strong> {summary.streakDays} days
        </div>
      </>
    ) : (
      <p>Loading…</p>
    )}
  </section>

    </div>
  );
}

export default App;
