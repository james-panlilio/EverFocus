import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="card">
        <h2>Welcome</h2>
        <p style={{ color: "var(--muted)" }}>
          Track focused study with a Pomodoro timer, log sessions, manage tasks, and view weekly progress — all in one place.
        </p>
      </section>

      <section className="card">
        <h2>Get started</h2>
        <div style={{ display: "grid", gap: 12 }}>
          <Link className="btn" to="/timer">Open Pomodoro & Sessions</Link>
          <Link className="btn" to="/todo">Open To-Do</Link>
          <Link className="btn" to="/summary">Open Weekly Summary</Link>
        </div>
      </section>
    </>
  );
}
