import { useEffect, useState } from "react";

type TodoItem = { id: string; text: string; done: boolean };
const STORAGE_KEY = "sst-todos";

function LeafIcon(props: { size?: number }) {
  const size = props.size ?? 20;
  // Simple, clean leaf; fill uses currentColor so CSS can change colour
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <path d="M19.8 4.2c-2.7-2.7-8.4-1.8-11.5 1.3C6.6 7.1 6 8.9 6 10.4c0 1.2.4 2.2 1.1 2.9 1 .9 2.3 1.2 3.6 1.1-1.6 1.7-3.1 3.2-4.5 4.5.6.3 1.3.5 2 .5 2.1 0 4.5-.9 6.4-2.8 3.1-3.1 4-8.8 1.2-11.6z"/>
    </svg>
  );
}

export default function Todo() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [text, setText] = useState("");

  // Load saved todos
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // Persist todos
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function add() {
    if (!text.trim()) return;
    setItems([{ id: crypto.randomUUID(), text: text.trim(), done: false }, ...items]);
    setText("");
  }

  function toggle(id: string) {
    setItems(items.map(i => (i.id === id ? { ...i, done: !i.done } : i)));
  }

  function remove(id: string) {
    setItems(items.filter(i => i.id !== id));
  }

  return (
    <>
      {/* Input */}
      <section className="card">
        <h2>To-Do List</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            className="input"
            placeholder="Write your task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
          <button className="btn" onClick={add}>Add</button>
        </div>
      </section>

      {/* List */}
      <section className="card">
        {items.length === 0 && <p style={{ color: "var(--muted)" }}>No tasks yet.</p>}

        <ul style={{ display: "grid", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
          {items.map(i => (
            <li key={i.id} className="session" style={{ alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {/* Leaf “checkbox” */}
                  <button
                    className={`todo-leaf ${i.done ? "checked" : ""}`}
                    onClick={() => toggle(i.id)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(i.id)}
                    role="checkbox"
                    aria-checked={i.done}
                    aria-label={i.done ? "Mark task as not done" : "Mark task as done"}
                  >
                    <LeafIcon />
                  </button>

                  <span
                    style={{
                      textDecoration: i.done ? "line-through" : "none",
                      opacity: i.done ? 0.7 : 1
                    }}
                  >
                    {i.text}
                  </span>
                </div>

                <button className="btn-outline" onClick={() => remove(i.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
