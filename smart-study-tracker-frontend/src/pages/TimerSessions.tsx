import { useEffect, useState } from "react";
import Timer from "../components/Timer";
import { createSession, fetchSessions, fetchSummary, deleteSession } from "../lib/api";

type Session = {
  id: string;
  subject: string;
  category?: string | null;
  startedAt: string;
  endedAt: string;
  durationMin: number;
  notes?: string | null;
};

export default function TimerSessions() {
  const userId = "demo-user";
  const [subject, setSubject] = useState("Maths");
  const [category, setCategory] = useState("General");
  const [duration, setDuration] = useState(25);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    const s = await fetchSessions(userId);
    setSessions(s);
    // prime summary cache (optional)
    await fetchSummary(userId).catch(() => {});
  }
  useEffect(() => { load(); }, []);

  async function addQuick() {
    try {
      setLoading(true);
      setErr(null);
      const end = new Date();
      const start = new Date(end.getTime() - duration * 60000);
      await createSession({
        userId,
        subject,
        category,
        startedAt: start.toISOString(),
        endedAt: end.toISOString(),
        durationMin: duration,
        notes: "quick add",
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
    <>

{/* Pomodoro */}
<section className="card">
  <h2>Pomodoro</h2>

  <div className="pomo-grid" style={{ marginTop: 6 }}>
    {/* Left Column: Subject + Minutes stacked */}
    <div className="left-stack">
      <div className="labeled-field">
        <label className="label-left">Subject</label>
        <input
          className="input input-lg"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="What are you focusing on?"
        />
      </div>

      <div className="labeled-field">
        <label className="label-left">Minutes</label>
        <input
          className="number number-lg"
          type="number"
          min={1}
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value || "0", 10))}
        />
      </div>
    </div>

    {/* Right Column: Timer */}
    <div className="field timer-center">
      <Timer
        minutes={duration}
        onComplete={async (_, start, end) => {
          try {
            await createSession({
              userId,
              subject,
              category,
              startedAt: start.toISOString(),
              endedAt: end.toISOString(),
              durationMin: duration,
              notes: "pomodoro",
            });
            await load();
            alert("Session saved!");
          } catch {
            alert("Failed to save session");
          }
        }}
      />
    </div>
  </div>

  <p className="hint" style={{ marginTop: 10 }}>
    When the timer finishes, a session is saved automatically.
  </p>
</section>



{/* Add Session */}
<section className="card">
  <h2>Add Session</h2>

  {/* success flash */}
  {err === null && !loading && sessions.length > 0 && (
    <span className="flash">Saved!</span>
  )}

  {/* Top row: Subject | Category | Duration */}
  <div className="add-row" style={{ marginTop: 10 }}>
    {/* Subject */}
    <div className="field subject">
      <label className="label">Subject</label>
      <input
        className="input input-lg"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="e.g. Maths, Algorithms, OS…"
      />
    </div>

    {/* Duration + chips under it */}
    <div className="field duration">
      <label className="label">Duration (min)</label>
      <input
        className="number number-lg"
        type="number"
        min={1}
        value={duration}
        onChange={(e) => setDuration(parseInt(e.target.value || "0", 10))}
      />

      {/* chips under duration */}
      <div className="chips chips-under-duration">
        {[15, 25, 30, 45, 60].map((m) => (
          <button
            key={m}
            type="button"
            className={`chip ${duration === m ? "active" : ""}`}
            onClick={() => setDuration(m)}
          >
            {m} min
          </button>
        ))}
      </div>
    </div>

    {/* Category */}
    <div className="field category">
      <label className="label">Category</label>
      <select
        className="select select-lg"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {["General", "Lectures", "Labs", "Seminars", "Revision"].map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </div>
  </div>

  {/* CTA centered on its own row */}
  <div className="add-actions">
    <button
      className="btn btn-lg"
      onClick={addQuick}
      disabled={loading || !subject.trim()}
    >
      {loading ? "Saving…" : "Add session"}
    </button>
  </div>

  <p className="hint">
    Creates a session ending now using the duration above. Use the timer below for
    real countdown logging.
  </p>

  {err && <p style={{ color: "#b42318", marginTop: 8 }}>⚠ {err}</p>}
</section>



      {/* Recent Sessions */}
      <section className="card">
        <h2>Recent Sessions</h2>
        {sessions.length === 0 && (
          <p style={{ color: "var(--muted)" }}>No sessions yet.</p>
        )}
        <ul
          style={{
            display: "grid",
            gap: 10,
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {sessions.map((s) => (
            <li key={s.id} className="session">
              <div>
                <div style={{ fontWeight: 700 }}>
                  {s.subject}{" "}
                  {s.category ? (
                    <span style={{ color: "var(--muted)" }}>· {s.category}</span>
                  ) : null}
                </div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>
                  {new Date(s.startedAt).toLocaleString()} →{" "}
                  {new Date(s.endedAt).toLocaleString()} · {s.durationMin} min
                </div>
              </div>
              <button className="btn-danger" onClick={() => remove(s.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
