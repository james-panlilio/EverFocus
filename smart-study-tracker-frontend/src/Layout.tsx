import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  // helper so NavLink gets "active" class (used by CSS)
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `tab ${isActive ? "active" : ""}`;

  return (
    <div className="container">
      <h1>EverFocus</h1>

      <nav className="nav">
        <NavLink to="/" className={linkClass} end>
          Home
        </NavLink>
        <NavLink to="/timer" className={linkClass}>
          Pomodoro & Sessions
        </NavLink>
        <NavLink to="/todo" className={linkClass}>
          To-Do List
        </NavLink>
        <NavLink to="/summary" className={linkClass}>
          Weekly Summary
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
