import { GradientReveal } from './GradientReveal';

export function GradientRevealExample() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            {/* Basic example */}
            <div className="flex flex-col items-center">
                <h3 className="font-bold mb-4">Basic Text Reveal</h3>
                <GradientReveal
                    size="md"
                    visibleContent={<span className="text-primary text-xl">Hover Me</span>}
                    hiddenContent={<span className="font-bold text-2xl text-white">Revealed!</span>}
                />
            </div>

            {/* Custom colors example */}
            <div className="flex flex-col items-center">
                <h3 className="font-bold mb-4">Custom Colors</h3>
                <GradientReveal
                    size="md"
                    visibleContent={<span className="text-primary text-xl">Custom Colors</span>}
                    hiddenContent={<span className="font-bold text-2xl text-white">🎨 Colors!</span>}
                    animationConfig={{
                        COLORS: {
                            PRIMARY: '#ff0066',
                            SECONDARY: '#3300ff',
                            ACCENT: '#00ffcc'
                        }
                    }}
                />
            </div>

            {/* Custom shape example */}
            <div className="flex flex-col items-center">
                <h3 className="font-bold mb-4">Square Gradient</h3>
                <GradientReveal
                    size="md"
                    circular={false}
                    visibleContent={<span className="text-primary text-xl">Square Effect</span>}
                    hiddenContent={<span className="font-bold text-2xl text-white">□ No Circle!</span>}
                />
            </div>

            {/* Faster animation example */}
            <div className="flex flex-col items-center">
                <h3 className="font-bold mb-4">Different Animation</h3>
                <GradientReveal
                    size="md"
                    visibleContent={<span className="text-primary text-xl">Faster Fade</span>}
                    hiddenContent={<span className="font-bold text-2xl text-white">Quick!</span>}
                    animationConfig={{
                        TRANSITION_DURATION: 100,
                        OPACITY_CURVE_POWER: 0.5
                    }}
                />
            </div>

            {/* Icon example */}
            <div className="flex flex-col items-center">
                <h3 className="font-bold mb-4">Icon Reveal</h3>
                <GradientReveal
                    size="md"
                    visibleContent={
                        <span className="text-primary text-xl flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                            <span className="ml-2">GitHub</span>
                        </span>
                    }
                    hiddenContent={<span className="font-bold text-2xl text-white">Follow Me!</span>}
                />
            </div>

            {/* Custom size and larger gradient */}
            <div className="flex flex-col items-center">
                <h3 className="font-bold mb-4">Larger Gradient</h3>
                <GradientReveal
                    size="lg"
                    visibleContent={<span className="text-primary text-xl">Larger Size</span>}
                    hiddenContent={<span className="font-bold text-2xl text-white">Bigger!</span>}
                    animationConfig={{
                        BASE_GRADIENT_SIZE: 300,
                        MAX_SIZE_INCREASE: 50,
                    }}
                />
            </div>
        </div>
    );
} 