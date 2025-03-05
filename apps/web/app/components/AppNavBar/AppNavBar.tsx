import { Link } from "react-router";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/Drawer/Drawer";
import { Menu } from "lucide-react";
import { pages } from "~/routes/path";

export function AppNavBar() {
  return (
    <nav className="bg-background text-primary py-2 w-full">
      <div className="hidden sm:block">
        <div className="flex flex-row items-center px-2">
          <h1 className="text-2xl font-bold">Yapp</h1>
          <div className="flex items-center gap-4 w-full justify-center">
            {Object.entries(pages).map(([key, value]) => (
              <Link
                key={key}
                className="hover:text-secondary hover:underline transition duration-300"
                to={value}
              >
                {key}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between px-2 sm:hidden">
        <h1 className="text-2xl font-bold">Yapp</h1>

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
              {Object.entries(pages).map(([key, value]) => (
                <Link
                  key={key}
                  className="hover:text-primary hover:underline transition duration-300 px-2 py-1 border border-black"
                  to={value}
                >
                  {key}
                </Link>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
}
