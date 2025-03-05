import { Link } from "react-router";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/Drawer/Drawer";
import { Menu } from "lucide-react";

export function AppNavBar() {
  return (
    <nav className="bg-background text-primary py-2 w-full">
      <div className="hidden sm:visible">
        <div className="flex flex-row items-center px-2">
          <h1 className="text-2xl font-bold">7amza</h1>
          <div className="flex items-center gap-4 w-full justify-center">
            <Link
              className="hover:text-secondary hover:underline transition duration-300"
              to="/"
            >
              Home
            </Link>
            <Link
              className="hover:text-secondary hover:underline transition duration-300"
              to="/articles"
            >
              Articles
            </Link>
            <Link
              className="hover:text-secondary hover:underline transition duration-300"
              to="/projects"
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between px-2">
        <h1 className="text-2xl font-bold">7amza</h1>

        <Drawer direction="right">
          <DrawerTrigger>
            <Menu />
          </DrawerTrigger>
          <DrawerContent
            id="drawer-right"
            className="bg-secondary max-w-[300px] w-[50%]  pt-10 "
          >
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="hover:text-primary hover:underline transition duration-300 px-2 py-1 border border-black"
              >
                Home
              </Link>
              <Link
                to="/articles"
                className="hover:text-primary hover:underline transition duration-300 px-2 py-1 border border-black"
              >
                Articles
              </Link>
              <Link
                to="/projects"
                className="hover:text-primary hover:underline transition duration-300 px-2 py-1 border border-black"
              >
                Projects
              </Link>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
}
