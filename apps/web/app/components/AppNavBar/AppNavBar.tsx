import { Link, useLocation } from "react-router";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui";
import { Menu } from "lucide-react";
import { pages } from "~/routes/path";
import { useState, useEffect } from "react";
export function AppNavBar() {

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  return (
    <nav className="bg-background text-primary py-2 w-full">
      <div className="hidden sm:block">
        <div className="flex flex-row items-center px-2">
          <h1 className="text-2xl font-bold">Yapp</h1>
          <div className="flex items-center gap-4 w-full justify-center">
            {Object.entries(pages).map(([key, value]) => (
              <Link
                key={key}
                className={`hover:underline transition duration-300 ${location.pathname === value ? "text-secondary font-semibold" : "text-primary"}`}
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

        <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
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
