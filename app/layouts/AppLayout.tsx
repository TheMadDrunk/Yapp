import { AppNavBar } from "../components";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div>
      <AppNavBar />
      <Outlet />
    </div>
  );
}
