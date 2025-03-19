import { Button } from "../ui/Button";
import { Github } from "lucide-react";

export interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl?: string;
    technologies: string[];
    githubLink?: string;
}

// This component is now simpler since most functionality has moved to ProjectsListing
export function ProjectCard({
    title,
    description,
    imageUrl,
    technologies,
    githubLink,
}: ProjectCardProps) {
    return (
        <div className="flex flex-col h-full border-0 overflow-hidden bg-background">
            {/* Project Image */}
            {imageUrl && (
                <div
                    className="h-48 w-full bg-primary/5 relative"
                    style={{
                        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
                </div>
            )}

            {/* Content */}
            <div className="flex flex-col flex-grow pt-6 pb-4 px-0">
                <h2 className="text-2xl font-bold text-primary mb-3">{title}</h2>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium border border-primary/20 text-primary"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <p className="text-sm text-primary/70 mb-6 flex-grow">{description}</p>

                {/* GitHub Link */}
                {githubLink && (
                    <div className="mt-auto flex">
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
                        >
                            <Button
                                variant="outline"
                                className="border border-primary/20 hover:border-primary px-4 py-2 rounded-none"
                            >
                                <Github className="w-4 h-4 mr-2" />
                                View on GitHub
                            </Button>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
} 