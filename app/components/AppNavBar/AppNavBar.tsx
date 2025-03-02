import { Link } from "react-router";

export function AppNavBar() {
  return (
    <nav className="bg-background text-primary py-2">
      <div className="flex flex-row items-center px-2">
        <h1 className="text-2xl font-bold">7amza</h1>
        <div className="flex items-center gap-4 ml-22">
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
        </div>
      </div>
    </nav>
  );
}
