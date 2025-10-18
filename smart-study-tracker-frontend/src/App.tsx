import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import TimerSessions from "./pages/TimerSessions";
import Summary from "./pages/Summary";
import Todo from "./pages/Todo";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/timer" element={<TimerSessions />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
