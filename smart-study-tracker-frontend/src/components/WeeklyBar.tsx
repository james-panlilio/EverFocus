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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="minutes" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
