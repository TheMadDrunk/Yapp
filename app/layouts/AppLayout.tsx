import { AppNavBar } from "../components";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="container mx-auto">
      <AppNavBar />
      <Outlet />
    </div>
  );
}
