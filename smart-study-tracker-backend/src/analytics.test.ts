import assert from "node:assert/strict";
import test from "node:test";
import { buildWeeklySummary, formatLocalDateKey } from "./analytics";

test("buildWeeklySummary keeps a stable 7-day local window and streak", () => {
  const today = new Date(2026, 3, 25, 12, 0, 0);
  const sessions = [
    { startedAt: new Date(2026, 3, 19, 9, 15, 0), durationMin: 25 },
    { startedAt: new Date(2026, 3, 22, 18, 30, 0), durationMin: 40 },
    { startedAt: new Date(2026, 3, 24, 7, 45, 0), durationMin: 30 },
    { startedAt: new Date(2026, 3, 25, 23, 10, 0), durationMin: 35 },
  ];

  const summary = buildWeeklySummary(sessions, today);

  assert.deepEqual(summary.byDay, [
    { date: "2026-04-19", minutes: 25 },
    { date: "2026-04-20", minutes: 0 },
    { date: "2026-04-21", minutes: 0 },
    { date: "2026-04-22", minutes: 40 },
    { date: "2026-04-23", minutes: 0 },
    { date: "2026-04-24", minutes: 30 },
    { date: "2026-04-25", minutes: 35 },
  ]);
  assert.equal(summary.totalThisWeek, 130);
  assert.equal(summary.streakDays, 2);
});

test("formatLocalDateKey uses local calendar dates", () => {
  const date = new Date(2026, 0, 5, 0, 30, 0);
  assert.equal(formatLocalDateKey(date), "2026-01-05");
});
