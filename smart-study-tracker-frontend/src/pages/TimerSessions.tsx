import { useEffect, useState } from "react";
import Timer from "../components/Timer";
import {
  createSession,
  deleteSession,
  fetchSessions,
  fetchSummary,
  type StudySession,
} from "../lib/api";
import { getUserId } from "../lib/user";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Failed";
}

export default function TimerSessions() {
  const [userId] = useState(() => getUserId());
  const [subject, setSubject] = useState("Maths");
  const [category, setCategory] = useState("General");
  const [duration, setDuration] = useState(25);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  async function loadSessions() {
    const sessionData = await fetchSessions(userId);
    setSessions(sessionData);
    await fetchSummary(userId).catch(() => undefined);
  }

  useEffect(() => {
    async function initialLoad() {
      const sessionData = await fetchSessions(userId);
      setSessions(sessionData);
      await fetchSummary(userId).catch(() => undefined);
    }

    void initialLoad();
  }, [userId]);

  async function addQuick() {
    try {
      setLoading(true);
      setErr(null);
      setSavedMessage(null);
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
      await loadSessions();
      setSavedMessage("Session saved.");
    } catch (error: unknown) {
      setErr(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    await deleteSession(id);
    await loadSessions();
  }

  return (
    <>
      <section className="card">
        <h2>Pomodoro</h2>

        <div className="pomo-grid" style={{ marginTop: 6 }}>
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
                  await loadSessions();
                  setErr(null);
                  setSavedMessage("Pomodoro session saved.");
                } catch {
                  setSavedMessage(null);
                  setErr("Failed to save session");
                }
              }}
            />
          </div>
        </div>

        <p className="hint" style={{ marginTop: 10 }}>
          When the timer finishes, a session is saved automatically.
        </p>
      </section>

      <section className="card">
        <h2>Add Session</h2>

        {savedMessage && !loading && <span className="flash">{savedMessage}</span>}

        <div className="add-row" style={{ marginTop: 10 }}>
          <div className="field subject">
            <label className="label">Subject</label>
            <input
              className="input input-lg"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Maths, Algorithms, OS..."
            />
          </div>

          <div className="field duration">
            <label className="label">Duration (min)</label>
            <input
              className="number number-lg"
              type="number"
              min={1}
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value || "0", 10))}
            />

            <div className="chips chips-under-duration">
              {[15, 25, 30, 45, 60].map((minutes) => (
                <button
                  key={minutes}
                  type="button"
                  className={`chip ${duration === minutes ? "active" : ""}`}
                  onClick={() => setDuration(minutes)}
                >
                  {minutes} min
                </button>
              ))}
            </div>
          </div>

          <div className="field category">
            <label className="label">Category</label>
            <select
              className="select select-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {["General", "Lectures", "Labs", "Seminars", "Revision"].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="add-actions">
          <button
            className="btn btn-lg"
            onClick={addQuick}
            disabled={loading || !subject.trim()}
          >
            {loading ? "Saving..." : "Add session"}
          </button>
        </div>

        <p className="hint">
          Creates a session ending now using the duration above. Use the timer below for
          real countdown logging.
        </p>

        {err && <p style={{ color: "#b42318", marginTop: 8 }}>{err}</p>}
      </section>

      <section className="card">
        <h2>Recent Sessions</h2>
        {sessions.length === 0 && <p style={{ color: "var(--muted)" }}>No sessions yet.</p>}
        <ul
          style={{
            display: "grid",
            gap: 10,
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {sessions.map((session) => (
            <li key={session.id} className="session">
              <div>
                <div style={{ fontWeight: 700 }}>
                  {session.subject}{" "}
                  {session.category ? (
                    <span style={{ color: "var(--muted)" }}>| {session.category}</span>
                  ) : null}
                </div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>
                  {new Date(session.startedAt).toLocaleString()} to{" "}
                  {new Date(session.endedAt).toLocaleString()} | {session.durationMin} min
                </div>
              </div>
              <button className="btn-danger" onClick={() => remove(session.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
