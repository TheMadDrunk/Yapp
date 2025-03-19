import { useRef, useEffect, useState } from "react";
import type { ReactNode } from "react";

// Animation configuration constants with default values
export const GRADIENT_ANIMATION_DEFAULTS = {
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
    },
    // CSS color variables (can be overridden with any CSS color values)
    COLORS: {
        PRIMARY: 'var(--color-primary)',
        SECONDARY: 'var(--color-secondary)',
        ACCENT: 'var(--color-accent)',
    }
};

// Define the component props
export interface GradientRevealProps {
    /** Content visible by default */
    visibleContent: ReactNode;
    /** Content revealed on hover */
    hiddenContent?: ReactNode;
    /** Custom hover effect configuration */
    animationConfig?: Partial<typeof GRADIENT_ANIMATION_DEFAULTS>;
    /** Additional CSS class names */
    className?: string;
    /** Container size, defaults to 'auto' */
    size?: 'sm' | 'md' | 'lg' | 'auto';
    /** Whether to show a circular gradient or not */
    circular?: boolean;
    /** Whether to require the control key to be pressed to activate */
    requireCtrlKey?: boolean;
}

export function GradientReveal({
    visibleContent,
    hiddenContent,
    animationConfig = {},
    className = '',
    size = 'auto',
    circular = true,
    requireCtrlKey = true
}: GradientRevealProps) {
    // Merge default animation config with any provided overrides
    const config = { ...GRADIENT_ANIMATION_DEFAULTS, ...animationConfig };

    // State to track if control key is pressed
    const [isCtrlPressed, setIsCtrlPressed] = useState(false);

    // Reference to the container element
    const containerRef = useRef<HTMLDivElement>(null);
    // Reference to the gradient element
    const gradientRef = useRef<HTMLDivElement>(null);
    // Track mouse position
    const mousePosition = useRef({ x: 0, y: 0 });

    // Get the size class
    const sizeClass = size === 'auto'
        ? 'w-full h-full'
        : size === 'sm'
            ? 'w-32 h-32'
            : size === 'md'
                ? 'w-48 h-48'
                : 'w-64 h-64';

    // Effect to track control key state
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Control') {
                setIsCtrlPressed(true);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Control') {
                setIsCtrlPressed(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Effect to set up mouse event listeners
    useEffect(() => {
        const container = containerRef.current;
        const gradient = gradientRef.current;

        if (!container || !gradient) return;

        // Handle mouse move across the container
        const handleMouseMove = (e: MouseEvent) => {
            // Only proceed if ctrl key is pressed or if not required
            if (requireCtrlKey && !isCtrlPressed) {
                gradient.style.opacity = '0';
                return;
            }

            const rect = container.getBoundingClientRect();
            mousePosition.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };

            // Calculate distance from center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const dx = mousePosition.current.x - centerX;
            const dy = mousePosition.current.y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

            // Normalize distance to container size
            const normalizedDistance = distance / maxDistance * config.THRESHOLD_DISTANCE;

            // Calculate opacity based on normalized distance
            let opacity = 0;
            if (normalizedDistance < config.THRESHOLD_DISTANCE) {
                // Use a non-linear curve for smoother transition
                opacity = Math.pow(1 - (normalizedDistance / config.THRESHOLD_DISTANCE), config.OPACITY_CURVE_POWER);

                // Position the gradient at mouse coordinates
                gradient.style.left = `${mousePosition.current.x}px`;
                gradient.style.top = `${mousePosition.current.y}px`;

                // Adjust size based on distance (closer = larger)
                const sizeIncrease = config.MAX_SIZE_INCREASE * (1 - normalizedDistance / config.THRESHOLD_DISTANCE);
                const size = config.BASE_GRADIENT_SIZE + sizeIncrease;
                gradient.style.width = `${size}px`;
                gradient.style.height = `${size}px`;
            }

            gradient.style.opacity = opacity.toString();
        };

        // Handle mouse enter to ensure gradient is visible
        const handleMouseEnter = () => {
            // Only proceed if ctrl key is pressed or if not required
            if (requireCtrlKey && !isCtrlPressed) {
                return;
            }

            // Start with position in center if not moved yet
            if (!gradient.style.left) {
                const rect = container.getBoundingClientRect();
                gradient.style.left = `${rect.width / 2}px`;
                gradient.style.top = `${rect.height / 2}px`;
            }
            gradient.style.opacity = '1';
        };

        // Handle mouse leave
        const handleMouseLeave = () => {
            gradient.style.opacity = '0';
        };

        // Add event listeners
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup function
        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [config.THRESHOLD_DISTANCE, config.BASE_GRADIENT_SIZE, config.MAX_SIZE_INCREASE, config.OPACITY_CURVE_POWER, isCtrlPressed, requireCtrlKey]);

    // Build the gradient background based on configuration
    const gradientBackground = `radial-gradient(circle closest-side, 
      ${config.COLORS.PRIMARY} ${config.GRADIENT_COLORS.PRIMARY_STOP}%, 
      ${config.COLORS.SECONDARY} ${config.GRADIENT_COLORS.SECONDARY_STOP}%, 
      ${config.COLORS.ACCENT} ${config.GRADIENT_COLORS.ACCENT_STOP}%, 
      transparent ${config.GRADIENT_COLORS.TRANSPARENT_STOP}%)`;

    return (
        <div
            ref={containerRef}
            className={`relative group ${sizeClass} ${className}`}
        >
            {/* Visible content (shown by default) */}
            <div >
                {visibleContent}
            </div>

            {/* Hidden content (revealed on hover) */}
            {hiddenContent && (
                <div className={`absolute inset-0 z-20 opacity-0 ${(isCtrlPressed || !requireCtrlKey) ? 'group-hover:opacity-100' : ''} `}>
                    {hiddenContent}
                </div>
            )}

            {/* Gradient overlay */}
            <div
                ref={gradientRef}
                className={`absolute opacity-0 z-10 pointer-events-none ${circular ? 'rounded-full' : ''}`}
                style={{
                    background: gradientBackground,
                    transform: 'translate(-50%, -50%)',
                    width: `${config.BASE_GRADIENT_SIZE}px`,
                    height: `${config.BASE_GRADIENT_SIZE}px`,
                    transition: `opacity ${config.TRANSITION_DURATION}ms ease, width ${config.TRANSITION_DURATION}ms ease, height ${config.TRANSITION_DURATION}ms ease`
                }}
            />
        </div>
    );
} 