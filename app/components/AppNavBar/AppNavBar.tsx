import { Link } from "react-router";

export function AppNavBar() {
    return (
        <nav className="bg-background border-b border-secondary">
            <div className="container mx-auto py-2 px-4 flex justify-between items-center max-w-screen-lg">
                <h1 className="text-2xl font-bold">Yapp</h1>
                <div className="flex items-center gap-4">
                    <Link to="/">Home</Link>
                    <Link to="/articles">Articles</Link>
                </div>
            </div>
        </nav>
    );
}
