import { useRef, useEffect } from "react";
import { SvgIcon } from "~/components/ui";
import env from "~/config/env";

// Animation configuration constants
const ANIMATION_CONFIG = {
    // Distance threshold in pixels where gradient starts to appear
    THRESHOLD_DISTANCE: 180,
    // Base size of the gradient in pixels
    BASE_GRADIENT_SIZE: 200,
    // Maximum additional size increase when cursor is close
    MAX_SIZE_INCREASE: 20,
    // Power value for the opacity curve (lower = more gradual fade, higher = sharper fade)
    OPACITY_CURVE_POWER: 0.1,
    // Animation duration in milliseconds
    TRANSITION_DURATION: 200,
    // Gradient color stops
    GRADIENT_COLORS: {
        PRIMARY_STOP: 30, // percentage
        SECONDARY_STOP: 50, // percentage
        ACCENT_STOP: 70, // percentage
        TRANSPARENT_STOP: 90, // percentage
    }
};

interface Skill {
    name: string;
    icon: {
        url: string;
    };
}

interface ProfilePicture {
    url: string;
}

interface SkillsListingProps {
    skills: Skill[];
    description: string;
    profilePicture: ProfilePicture | null;
    // Optional animation config that can override defaults
    animationConfig?: Partial<typeof ANIMATION_CONFIG>;
}

export function SkillsListing({
    skills,
    description,
    profilePicture,
    animationConfig = {}
}: SkillsListingProps) {
    // Merge default animation config with any provided overrides
    const config = { ...ANIMATION_CONFIG, ...animationConfig };

    // Reference to store all skill containers
    const skillRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    // Reference to the skills section container
    const skillsSectionRef = useRef<HTMLDivElement>(null);
    // Track mouse position
    const mousePosition = useRef({ x: 0, y: 0 });

    // Effect to set up mouse event listeners
    useEffect(() => {
        // Get the skills section container
        const skillsSection = skillsSectionRef.current;
        if (!skillsSection) return;

        // Handle mouse move across the entire skills section
        const handleMouseMove = (e: MouseEvent) => {
            const rect = skillsSection.getBoundingClientRect();
            mousePosition.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };

            // For each skill container, update its gradient
            skillRefs.current.forEach((container) => {
                const gradient = container.querySelector('.gradient-reveal') as HTMLElement;
                if (!gradient) return;

                // Calculate distance between mouse and the center of this container
                const containerRect = container.getBoundingClientRect();
                const skillCenterX = containerRect.left + containerRect.width / 2 - rect.left;
                const skillCenterY = containerRect.top + containerRect.height / 2 - rect.top;

                // Calculate distance between mouse and container center
                const dx = mousePosition.current.x - skillCenterX;
                const dy = mousePosition.current.y - skillCenterY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Calculate opacity based on distance (closer = more visible)
                let opacity = 0;
                if (distance < config.THRESHOLD_DISTANCE) {
                    // Use a non-linear curve for smoother transition
                    opacity = Math.pow(1 - (distance / config.THRESHOLD_DISTANCE), config.OPACITY_CURVE_POWER);

                    // Position the gradient relative to the skill container
                    const relativeX = mousePosition.current.x - (containerRect.left - rect.left);
                    const relativeY = mousePosition.current.y - (containerRect.top - rect.top);

                    gradient.style.left = `${relativeX}px`;
                    gradient.style.top = `${relativeY}px`;

                    // Adjust size based on distance (closer = larger)
                    const sizeIncrease = config.MAX_SIZE_INCREASE * (1 - distance / config.THRESHOLD_DISTANCE);
                    const size = config.BASE_GRADIENT_SIZE + sizeIncrease;
                    gradient.style.width = `${size}px`;
                    gradient.style.height = `${size}px`;
                }

                gradient.style.opacity = opacity.toString();
            });
        };

        // Handle mouse enter and leave for the entire section
        const handleMouseLeave = () => {
            skillRefs.current.forEach((container) => {
                const gradient = container.querySelector('.gradient-reveal') as HTMLElement;
                if (gradient) {
                    gradient.style.opacity = '0';
                }
            });
        };

        // Add event listeners to the skills section
        skillsSection.addEventListener('mousemove', handleMouseMove);
        skillsSection.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup function
        return () => {
            skillsSection.removeEventListener('mousemove', handleMouseMove);
            skillsSection.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [skills, config.THRESHOLD_DISTANCE, config.BASE_GRADIENT_SIZE, config.MAX_SIZE_INCREASE, config.OPACITY_CURVE_POWER]);

    // Build the gradient background based on configuration
    const gradientBackground = `radial-gradient(circle closest-side, 
        var(--color-primary) ${config.GRADIENT_COLORS.PRIMARY_STOP}%, 
        var(--color-secondary) ${config.GRADIENT_COLORS.SECONDARY_STOP}%, 
        var(--color-accent) ${config.GRADIENT_COLORS.ACCENT_STOP}%, 
        transparent ${config.GRADIENT_COLORS.TRANSPARENT_STOP}%)`;

    return (
        <div className="mt-10 grid grid-cols-7 grid-rows-6" ref={skillsSectionRef}>
            <h2 className="text-lg text-primary font-semibold col-span-1">./About me</h2>
            <p className="text-primary max-w-xl text-justify col-span-3 col-start-5 italic">
                &quot;{description}&quot;
            </p>
            {profilePicture && (
                <div
                    className="col-span-3 col-start-5 row-start-2 row-span-5 flex justify-center items-center sepia-100 bg-cover bg-center"
                    style={{ backgroundImage: `url(${env.STRAPI_URL + profilePicture.url})` }}
                >
                </div>
            )}
            <div className="w-[11rem] h-30 p-1">
                <div className="w-full h-full bg-primary text-background"> My Skills</div>
            </div>
            {skills.map((skill, index) => (
                <div
                    className="w-[11rem] h-30 p-1 cursor-pointer"
                    key={skill.name + index}
                    ref={(el) => {
                        if (el) skillRefs.current.set(skill.name, el);
                    }}
                >
                    <div className="w-full h-full relative overflow-hidden">
                        <div className="w-full h-full flex justify-center items-center z-10 relative text-background">
                            <SvgIcon url={skill.icon.url} size={64} className="mr-2 text-primary" />
                            <div className="text-background">
                                {skill.name}
                            </div>
                        </div>
                        <div
                            className="gradient-reveal absolute rounded-full opacity-0 pointer-events-none"
                            style={{
                                background: gradientBackground,
                                transform: 'translate(-50%, -50%)',
                                width: `${config.BASE_GRADIENT_SIZE}px`,
                                height: `${config.BASE_GRADIENT_SIZE}px`,
                                transition: `opacity ${config.TRANSITION_DURATION}ms ease, width ${config.TRANSITION_DURATION}ms ease, height ${config.TRANSITION_DURATION}ms ease`
                            }}
                        ></div>
                    </div>
                </div>
            ))}
            <div className="w-[11rem] h-30 p-1">
                <div className="w-full h-full bg-primary text-background"> And More...</div>
            </div>
        </div>
    );
} 