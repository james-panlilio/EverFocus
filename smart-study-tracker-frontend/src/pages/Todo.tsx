import { useEffect, useState } from "react";

type TodoItem = { id: string; text: string; done: boolean };

const STORAGE_KEY = "sst-todos";

export default function Todo() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function add() {
    if (!text.trim()) return;
    setItems([{ id: crypto.randomUUID(), text: text.trim(), done: false }, ...items]);
    setText("");
  }

  function toggle(id: string) {
    setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i));
  }

  function remove(id: string) {
    setItems(items.filter(i => i.id !== id));
  }

  return (
    <>
      <section className="card">
        <h2>To-Do List</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input className="input" placeholder="Write your task…" value={text}
                 onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
          <button className="btn" onClick={add}>Add</button>
        </div>
      </section>

      <section className="card">
        {items.length === 0 && <p style={{ color: "var(--muted)" }}>No tasks yet.</p>}
        <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
          {items.map(i => (
            <li key={i.id} className="session" style={{ alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="checkbox" checked={i.done} onChange={() => toggle(i.id)} />
                <span style={{ textDecoration: i.done ? "line-through" : "none" }}>{i.text}</span>
              </label>
              <button className="btn-outline" onClick={() => remove(i.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
