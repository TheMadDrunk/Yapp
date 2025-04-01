import { Github, PlayCircle } from "lucide-react";
import { Button } from "../ui/Button";
import type { Project } from "~/graphql/types";
import env from "~/config/env";
import { useAnalytics } from "~/hooks";

interface ProjectsListingProps {
    projects: Project[];
}

export function ProjectsListing({ projects }: ProjectsListingProps) {
    // Create a project-specific event tracker
    const gaEventTracker = useAnalytics("Project");

    if (projects.length === 0) {
        return (
            <div className="py-8 text-center text-primary/70">
                <p>No projects found.</p>
            </div>
        );
    }
    return (
        <div className="w-full">
            {projects.map((project, index) => (
                <div
                    key={index}
                    className={`border-t border-primary/10 py-16 ${index === projects.length - 1 ? 'border-b' : ''}`}
                >
                    <div className="flex flex-col lg:flex-row">
                        {/* Project details column */}
                        <div className="w-full lg:w-1/2 pr-0 lg:pr-16">
                            <h2 className="text-3xl font-bold text-primary mb-4">{project.title}</h2>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.technologies.split(',').map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-xs font-medium bg-background border border-primary/20 text-primary inline-block"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <p className="text-sm text-primary/70">{project.description}</p>
                            </div>

                            {/* GitHub Link */}
                            {project.githubLink && (
                                <div className="mt-6">
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-primary hover:text-accent transition-colors"
                                        onClick={() => gaEventTracker("Click GitHub Link", project.title)}
                                    >
                                        <Button
                                            variant="outline"
                                            className="border border-primary/20 hover:border-primary px-4 py-2"
                                        >
                                            <Github className="w-4 h-4 mr-2" />
                                            View on GitHub
                                        </Button>
                                    </a>
                                </div>
                            )}
                            {project.demoLink && (
                                <div className="mt-6">
                                    <a
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => gaEventTracker("Click Demo Link", project.title)}
                                    >
                                        <Button variant="outline" className="border border-primary/20 hover:border-primary px-4 py-2">
                                            <PlayCircle className="w-4 h-4 mr-2" />
                                            View Demo
                                        </Button>
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Images column with overlapping effect */}
                        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 relative h-[400px] lg:h-[500px] group">
                            {/* Create a floating image arrangement similar to the reference */}
                            {project.images && project.images.length > 0 ? (
                                <>
                                    {/* Main image */}
                                    {project.images[0] && (
                                        <div
                                            className="absolute top-0 left-0 w-[90%] h-[90%] z-10 overflow-hidden shadow-lg group-hover:scale-80 transition-all duration-300"
                                            style={{
                                                backgroundImage: `url(${env.STRAPI_URL + project.images[0].url})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30" />
                                        </div>
                                    )}

                                    {/* Second image if available */}
                                    {project.images[1] && (
                                        <div
                                            className="absolute top-[5%] group-hover:-right-[40%] right-0 transition-all duration-300 w-[60%] h-[60%] z-20 flex items-center justify-center overflow-hidden bg-background"

                                        >
                                            <div className="w-[95%] h-[95%]"
                                                style={{
                                                    backgroundImage: `url(${env.STRAPI_URL + project.images[1].url})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            ></div>
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30" />
                                        </div>
                                    )}

                                    {/* Third image if available */}
                                    {project.images[2] && (

                                        <div
                                            className="absolute group-hover:bottom-[20%] bottom-0 group-hover:-left-[30%] left-[10%] transition-all duration-300 w-[40%] h-[40%] z-30 flex items-center justify-center overflow-hidden bg-background"

                                        >
                                            <div
                                                className=" w-[95%] h-[95%] "
                                                style={{
                                                    backgroundImage: `url(${env.STRAPI_URL + project.images[2].url})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}>

                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30" />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary/30">
                                    No images available
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 