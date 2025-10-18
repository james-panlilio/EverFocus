import { useEffect, useRef, useState } from "react";

type Props = {
  minutes: number;
  onComplete?: (elapsedSeconds: number, start: Date, end: Date) => void;
};

export default function Timer({ minutes, onComplete }: Props) {
  const initial = Math.max(1, Math.floor(minutes)) * 60;
  const [secondsLeft, setSecondsLeft] = useState(initial);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const startRef = useRef<Date | null>(null);
  const tickRef = useRef<number | null>(null);

  // Update preset if minutes change and we are idle
  useEffect(() => {
    if (!running && !paused) setSecondsLeft(Math.max(1, Math.floor(minutes)) * 60);
  }, [minutes, running, paused]);

  // Tick loop
  useEffect(() => {
    if (!running) return;

    if (!startRef.current) startRef.current = new Date();

    tickRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          if (tickRef.current) clearInterval(tickRef.current);
          tickRef.current = null;
          setRunning(false);
          setPaused(false);
          const end = new Date();
          const start = startRef.current ?? new Date(end.getTime() - initial * 1000);
          startRef.current = null;
          onComplete?.(initial, start, end);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      tickRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  // Actions
  function start() {
    if (secondsLeft <= 0) setSecondsLeft(initial);
    setRunning(true);
    setPaused(false);
  }
  function pause() {
    setRunning(false);
    setPaused(true);
  }
  function resume() {
    setRunning(true);
    setPaused(false);   // <-- important: clear paused so Resume doesn't stick
  }
  function reset() {
    setRunning(false);
    setPaused(false);
    setSecondsLeft(initial);
    startRef.current = null;
  }

  // Format
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="timer-stack">
      <div className="timer-readout">{mm}:{ss}</div>

      <div className="timer-controls">
        {/* Exactly one of Start / Pause / Resume + always Reset */}
        {!running && !paused ? (
          <>
            <button className="btn" onClick={start}>Start</button>
            <button className="btn" onClick={reset}>Reset</button>
          </>
        ) : running ? (
          <>
            <button className="btn" onClick={pause}>Pause</button>
            <button className="btn" onClick={reset}>Reset</button>
          </>
        ) : (
          <>
            <button className="btn" onClick={resume}>Resume</button>
            <button className="btn" onClick={reset}>Reset</button>
          </>
        )}
      </div>
    </div>
  );
}
