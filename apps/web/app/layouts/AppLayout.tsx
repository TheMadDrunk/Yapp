import { AppNavBar } from "../components";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="container mx-auto">
      <AppNavBar />
      <Outlet />
      <div className=" flex flex-row items-center justify-center gap-1 mt-8 w-full text-xs text-primary">
        made with <svg width="16" height="16" viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 1h1v1h-1v-1z" />
          <path d="M4 1h1v1h-1v-1z" />
          <path d="M1 2h1v1h-1v-1z" />
          <path d="M2 2h1v1h-1v-1z" />
          <path d="M3 2h1v1h-1v-1z" />
          <path d="M4 2h1v1h-1v-1z" />
          <path d="M5 2h1v1h-1v-1z" />
          <path d="M2 3h1v1h-1v-1z" />
          <path d="M3 3h1v1h-1v-1z" />
          <path d="M4 3h1v1h-1v-1z" />
          <path d="M3 4h1v1h-1v-1z" />
        </svg> by <a href="https://github.com/TheMadDrunk" target="_blank" rel="noopener noreferrer">TheMadDrunk</a>
      </div>
    </div>
  );
}
