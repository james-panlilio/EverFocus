export type SessionSummaryInput = {
  startedAt: Date;
  durationMin: number;
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

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function formatLocalDateKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function buildWeeklySummary(
  sessions: SessionSummaryInput[],
  today: Date = new Date(),
): WeeklySummary {
  const from = new Date(today);
  from.setHours(0, 0, 0, 0);
  from.setDate(from.getDate() - 6);

  const byDay: Record<string, number> = {};
  for (let i = 0; i < 7; i += 1) {
    const day = new Date(from);
    day.setDate(from.getDate() + i);
    byDay[formatLocalDateKey(day)] = 0;
  }

  for (const session of sessions) {
    const key = formatLocalDateKey(session.startedAt);
    if (key in byDay) {
      byDay[key] += session.durationMin;
    }
  }

  const series = Object.entries(byDay).map(([date, minutes]) => ({ date, minutes }));
  const totalThisWeek = series.reduce((total, day) => total + day.minutes, 0);

  let streakDays = 0;
  for (let i = series.length - 1; i >= 0; i -= 1) {
    if (series[i].minutes <= 0) {
      break;
    }
    streakDays += 1;
  }

  return { byDay: series, totalThisWeek, streakDays };
}
