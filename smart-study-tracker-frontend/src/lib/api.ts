export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export async function createSession(payload: any) {
  const res = await fetch(`${API_BASE}/api/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create session");
  return res.json();
}

export async function fetchSessions(userId: string) {
  const res = await fetch(`${API_BASE}/api/sessions?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error("Failed to fetch sessions");
  return res.json();
}

export async function fetchSummary(userId: string) {
  const res = await fetch(`${API_BASE}/api/analytics/summary?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error("Failed to fetch summary");
  return res.json();
}

export async function deleteSession(id: string) {
  const res = await fetch(`${API_BASE}/api/sessions/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete session");
}

