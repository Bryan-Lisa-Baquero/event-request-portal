import { Outlet } from "react-router-dom";

export default function EntryLayout() {
  return (
    <div className="container mt-4">
      <Outlet />
    </div>
  );
}