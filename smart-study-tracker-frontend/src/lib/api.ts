export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export type SessionPayload = {
  userId: string;
  subject: string;
  category?: string;
  startedAt: string;
  endedAt: string;
  durationMin: number;
  notes?: string;
};

export type StudySession = {
  id: string;
  subject: string;
  category?: string | null;
  startedAt: string;
  endedAt: string;
  durationMin: number;
  notes?: string | null;
};

export type SummaryPoint = {
  date: string;
  minutes: number;
};

export type WeeklySummary = {
  byDay: SummaryPoint[];
  totalThisWeek: number;
  streakDays: number;
};

export async function createSession(payload: SessionPayload): Promise<StudySession> {
  const res = await fetch(`${API_BASE}/api/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create session");
  return res.json();
}

export async function fetchSessions(userId: string): Promise<StudySession[]> {
  const res = await fetch(`${API_BASE}/api/sessions?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error("Failed to fetch sessions");
  return res.json();
}

export async function fetchSummary(userId: string): Promise<WeeklySummary> {
  const res = await fetch(`${API_BASE}/api/analytics/summary?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error("Failed to fetch summary");
  return res.json();
}

export async function deleteSession(id: string) {
  const res = await fetch(`${API_BASE}/api/sessions/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete session");
}
