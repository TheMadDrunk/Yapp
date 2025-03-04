import { Link } from "react-router";

export function AppNavBar() {
  return (
    <nav className="bg-background text-primary py-2 w-full">
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
    </nav>
  );
}
