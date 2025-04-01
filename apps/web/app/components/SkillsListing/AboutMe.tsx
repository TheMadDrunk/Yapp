import { useRef, useEffect, useState } from "react";
import { SvgIcon } from "~/components/ui";
import env from "~/config/env";

// Animation configuration constants
const ANIMATION_CONFIG = {
    // Distance threshold in pixels where gradient starts to appear
    THRESHOLD_DISTANCE: 300,
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

export function AboutMe({
    skills,
    description,
    profilePicture,
    animationConfig = {}
}: SkillsListingProps) {
    // Merge default animation config with any provided overrides
    const config = { ...ANIMATION_CONFIG, ...animationConfig };

    // State to track if we're on mobile
    const [isMobile, setIsMobile] = useState(false);

    // State to track the active skill on mobile (for touch interactions)
    const [activeSkill, setActiveSkill] = useState<string | null>(null);

    // State to toggle between different mobile layouts
    const [altMobileLayout, setAltMobileLayout] = useState(true);

    // Reference to store all skill containers
    const skillRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    // Reference to the skills section container
    const skillsSectionRef = useRef<HTMLDivElement>(null);
    // Track mouse position
    const mousePosition = useRef({ x: 0, y: 0 });

    // Effect to detect mobile screens
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Check on mount
        checkIfMobile();

        // Add listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Effect to set up mouse event listeners (only for desktop)
    useEffect(() => {
        // Skip this effect on mobile
        if (isMobile) return;

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
                const svgIcon = container.querySelector('.svg-icon') as HTMLElement;
                if (!gradient || !svgIcon) return;

                // Calculate distance between mouse and the center of this container
                const containerRect = container.getBoundingClientRect();
                const skillCenterX = containerRect.left + containerRect.width / 2 - rect.left;
                const skillCenterY = containerRect.top + containerRect.height / 2 - rect.top;

                // Calculate distance between mouse and container center
                const dx = mousePosition.current.x - skillCenterX;
                const dy = mousePosition.current.y - skillCenterY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Calculate opacity based on distance (closer = more visible for gradient, less visible for icon)
                let gradientOpacity = 0;
                let iconOpacity = 1; // Default full opacity for icon

                if (distance < config.THRESHOLD_DISTANCE) {
                    // Use a non-linear curve for smoother transition for the gradient
                    gradientOpacity = Math.pow(1 - (distance / config.THRESHOLD_DISTANCE), config.OPACITY_CURVE_POWER);
                    // Linear transition for the icon (closer = more transparent)
                    iconOpacity = distance / config.THRESHOLD_DISTANCE;

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

                gradient.style.opacity = gradientOpacity.toString();
                svgIcon.style.opacity = iconOpacity.toString();
            });
        };

        // Handle mouse enter and leave for the entire section
        const handleMouseLeave = () => {
            skillRefs.current.forEach((container) => {
                const gradient = container.querySelector('.gradient-reveal') as HTMLElement;
                const svgIcon = container.querySelector('.svg-icon') as HTMLElement;
                if (gradient) {
                    gradient.style.opacity = '0';
                }
                if (svgIcon) {
                    svgIcon.style.opacity = '1'; // Reset icon opacity
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
    }, [skills, isMobile, config.THRESHOLD_DISTANCE, config.BASE_GRADIENT_SIZE, config.MAX_SIZE_INCREASE, config.OPACITY_CURVE_POWER]);

    // Build the gradient background based on configuration
    const gradientBackground = `radial-gradient(circle closest-side, 
        var(--color-primary) ${config.GRADIENT_COLORS.PRIMARY_STOP}%, 
        transparent ${config.GRADIENT_COLORS.TRANSPARENT_STOP}%)`;

    // Handle touch interaction for mobile
    const handleSkillTouch = (skillName: string) => {
        if (isMobile) {
            setActiveSkill(prevSkill => prevSkill === skillName ? null : skillName);
        }
    };

    return (
        <div className="mt-6 md:mt-10 px-4 md:px-0" ref={skillsSectionRef}>
            {/* Modern Minimalist Mobile Layout */}
            <div className="md:hidden flex flex-col space-y-10">
                <div className="border-primary">
                    <h2 className="text-lg text-primary font-semibold">./About me</h2>
                </div>

                {/* Profile section with image and description */}
                {profilePicture && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div
                            className="aspect-square sm:aspect-auto w-full bg-cover bg-center border-b border-primary/20"
                            style={{ backgroundImage: `url(${env.STRAPI_URL + profilePicture.url})` }}
                        >
                        </div>
                        <div className="flex items-center">
                            <p className="text-primary text-sm leading-relaxed italic border-l-2 border-primary/30 pl-4">
                                &quot;{description}&quot;
                            </p>
                        </div>
                    </div>
                )}

                {/* Skills section */}
                <div className="space-y-6">
                    <div className="border-l-2 border-primary pl-4">
                        <h3 className="text-lg text-primary font-semibold">
                            My Skills
                        </h3>
                    </div>

                    {/* Skill grid with clean layout */}
                    <div className="grid grid-cols-4 gap-px bg-primary/10">
                        {skills.map((skill, index) => (
                            <div
                                className={`cursor-pointer transition-colors duration-200 ${activeSkill === skill.name
                                    ? 'bg-primary text-background'
                                    : 'bg-background hover:bg-primary/5'
                                    }`}
                                key={skill.name + index}
                                onClick={() => handleSkillTouch(skill.name)}
                                ref={(el) => {
                                    if (el) skillRefs.current.set(skill.name, el);
                                }}
                            >
                                <div className="w-full aspect-square flex flex-col items-center justify-center p-3">
                                    <SvgIcon
                                        url={skill.icon.url}
                                        size={32}
                                        className={`mb-2 transition-colors duration-200 ${activeSkill === skill.name ? 'text-background' : 'text-primary'
                                            }`}
                                    />
                                    <div className={`text-xs text-center font-medium transition-colors duration-200 ${activeSkill === skill.name ? 'text-background' : 'text-primary'
                                        }`}>
                                        {skill.name}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="bg-primary text-background cursor-pointer">
                            <div className="w-full aspect-square flex items-center justify-center text-xs font-medium">
                                And More...
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop layout with grid */}
            <div className="hidden md:grid grid-cols-7 grid-rows-7 gap-2">
                <h2 className="text-lg text-primary font-semibold col-span-1">./About me</h2>
                <p className="text-primary text-sm text-justify col-span-4 col-start-1 row-start-2 italic">
                    &quot;{description}&quot;
                </p>
                {profilePicture && (
                    <div
                        className="col-span-3 col-start-5 row-span-7 flex justify-center items-center bg-cover bg-center border-primary border-b-2"
                        style={{ backgroundImage: `url(${env.STRAPI_URL + profilePicture.url})` }}
                    >
                    </div>
                )}

                <div className="col-span-4 row-start-3 row-span-5 grid grid-cols-5 gap-2 transition-none auto-rows-[60px]">
                    <div className="p-1 h-[60px]">
                        <div className="w-full h-full bg-primary text-background flex items-center justify-center"> My Skills</div>
                    </div>
                    {skills.map((skill, index) => (
                        <div
                            className="p-1 cursor-pointer group h-[60px]"
                            key={skill.name + index}
                            ref={(el) => {
                                if (el) skillRefs.current.set(skill.name, el);
                            }}
                        >
                            <div className="w-full h-full relative overflow-hidden">
                                <div className="w-full h-full flex justify-center items-center z-10 relative text-background">
                                    <SvgIcon
                                        url={skill.icon.url}
                                        size={42}
                                        className="svg-icon absolute text-primary"
                                    />
                                    <div className="-z-10 text-background text-xs font-bold">
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
                    <div className="p-1 h-[60px]">
                        <div className="w-full h-full bg-primary text-background flex items-center justify-center"> And More...</div>
                    </div>
                </div>

            </div>
        </div>
    );
} 