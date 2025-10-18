import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function WeeklyBar({ data }: { data: { date: string; minutes: number }[] }) {
  const formatted = data.map(d => ({
    day: new Date(d.date).toLocaleDateString(undefined, { weekday: "short" }),
    minutes: d.minutes,
  }));

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eadfcd" />
          <XAxis dataKey="day" stroke="#2a3a20" />
          <YAxis stroke="#2a3a20" />
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--line)", background: "#fffaf1" }} />
          <Bar dataKey="minutes" fill="var(--accent)" radius={[8,8,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
