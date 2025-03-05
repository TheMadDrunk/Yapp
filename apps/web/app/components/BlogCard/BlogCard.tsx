import { NavLink } from "react-router";
import { Button } from "../ui/Button";
interface BlogCardProps {
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
}

export function BlogCard({
  title,
  description,
  slug,
  imageUrl,
}: BlogCardProps) {
  return (
    <div
      className="group relative h-[300px] w-[300px] bg-gray-900 transition-all duration-300"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />

      {/* Content container */}
      <div className="absolute bottom-0 p-6 transition-all duration-300 group-hover:bottom-4">
        <h2 className="mb-2 font-mono text-xl text-white">{title}</h2>

        {/* Description - hidden by default, shown on hover */}
        <p className="mb-4 max-h-0 overflow-hidden text-sm text-gray-300 opacity-0 transition-all duration-300 group-hover:max-h-[100px] group-hover:opacity-100">
          {description}
        </p>

        {/* Read more button - hidden by default, shown on hover */}
        <div className="flex items-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Button variant="link" className="text-white">
            <NavLink to={`/blog/${slug}`}>Read more</NavLink>
          </Button>
          <span className="text-white">→</span>
        </div>
      </div>
    </div>
  );
}
