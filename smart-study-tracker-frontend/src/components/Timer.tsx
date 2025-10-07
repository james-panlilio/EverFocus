import { useEffect, useRef, useState } from "react";

export default function Timer({
  minutes = 25,
  onComplete,
}: { minutes?: number; onComplete: (actualMinutes: number, startedAt: Date, endedAt: Date) => void }) {
  const [remaining, setRemaining] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const startedAtRef = useRef<Date | null>(null);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    if (!startedAtRef.current) startedAtRef.current = new Date();
    tickRef.current = window.setInterval(() => {
      setRemaining(s => {
        if (s <= 1) {
          const end = new Date();
          const start = startedAtRef.current ?? new Date(end.getTime() - minutes * 60000);
          onComplete(Math.round(minutes), start, end);
          clearInterval(tickRef.current!);
          startedAtRef.current = null;
          return minutes * 60; // reset
        }
        return s - 1;
      });
    }, 1000);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [running, minutes, onComplete]);

  const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
  const secs = String(remaining % 60).padStart(2, "0");

  return (
    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
      <div style={{ fontSize:32, fontWeight:700 }}>{mins}:{secs}</div>
      <button onClick={() => setRunning(r => !r)} style={{ padding:"8px 14px", borderRadius:8, border:"1px solid #ddd" }}>
        {running ? "Pause" : "Start"}
      </button>
      <button onClick={() => { setRunning(false); setRemaining(minutes*60); startedAtRef.current=null; }} style={{ padding:"8px 14px", borderRadius:8, border:"1px solid #ddd" }}>
        Reset
      </button>
    </div>
  );
}
