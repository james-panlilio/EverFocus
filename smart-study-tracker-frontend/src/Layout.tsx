import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  // helper so NavLink gets "active" class (used by CSS)
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `tab ${isActive ? "active" : ""}`;

  return (
    <div className="container">
      <h1>Smart Study Tracker</h1>

      <nav className="nav">
        <NavLink to="/" className={linkClass} end>
          Home
        </NavLink>
        <NavLink to="/timer" className={linkClass}>
          Pomodoro & Sessions
        </NavLink>
        <NavLink to="/todo" className={linkClass}>
          To-Do
        </NavLink>
        <NavLink to="/summary" className={linkClass}>
          Weekly Summary
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
