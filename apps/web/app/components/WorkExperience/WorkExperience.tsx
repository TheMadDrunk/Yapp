import { type WorkExperience } from "~/graphql/types";

interface WorkExperienceListingProps {
    experiences: WorkExperience[];
    animationConfig?: any;
}

// Generate company logo placeholder based on company name
function getLogoPlaceholder(company: string): string {
    // Extract initials or first letter
    const initials = company
        .split(/\s+/)
        .map(word => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    // Generate a deterministic color based on company name
    let hash = 0;
    for (let i = 0; i < company.length; i++) {
        hash = company.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = hash % 360;
    const color = `hsl(${hue}, 70%, 30%)`;

    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='50' y='50' font-family='Arial, sans-serif' font-size='40' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${initials}%3C/text%3E%3C/svg%3E`;
}

export function WorkExperienceListing({
    experiences,
    animationConfig = {}
}: WorkExperienceListingProps) {
    // Get formatted duration as "X years Y months"
    const getFormattedDuration = (start: string, end: string) => {
        // Parse dates in DD-MM-YYYY format
        const parseDate = (dateStr: string): Date | null => {
            if (dateStr === null) {
                return new Date();
            }

            // Parse DD-MM-YYYY format
            const parts = dateStr.split('/');
            if (parts.length === 3) {
                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
                const year = parseInt(parts[2], 10);

                if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                    return new Date(year, month, day);
                }
            }
            return null;
        };

        const startDate = parseDate(start);
        const endDate = parseDate(end);

        if (!startDate || !endDate) {
            return '';
        }

        // Calculate total months
        const monthDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            (endDate.getMonth() - startDate.getMonth());

        const years = Math.floor(monthDiff / 12);
        const months = monthDiff % 12;

        if (years > 0 && months > 0) {
            return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
        } else if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''}`;
        } else {
            return `${months} month${months > 1 ? 's' : ''}`;
        }
    };

    // Calculate total work experience
    const getTotalExperience = () => {
        let totalMonths = 0;

        experiences.forEach(exp => {
            // Parse dates in DD-MM-YYYY format
            const parseDate = (dateStr: string): Date | null => {
                if (dateStr === null) {
                    return new Date();
                }

                // Parse DD-MM-YYYY format
                const parts = dateStr.split('-');
                if (parts.length === 3) {
                    const day = parseInt(parts[2], 10);
                    const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
                    const year = parseInt(parts[0], 10);

                    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                        return new Date(year, month, day);
                    }
                }
                return null;
            };
            const startDate = parseDate(exp.startDate);
            const endDate = parseDate(exp.endDate);

            if (startDate && endDate) {
                const monthDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                    (endDate.getMonth() - startDate.getMonth());

                totalMonths += monthDiff;
            }
        });

        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        return `${years} years ${months} months`;
    };

    return (
        <div className="mt-8 md:mt-16 mb-8 md:mb-12">
            <div className="border-primary pl-4 mt-4 mb-4">
                <h2 className="text-lg text-primary font-semibold">./Work</h2>
            </div>
            <div className="grid grid-cols-1 divide-y divide-primary/10 border-t border-b border-primary/20">
                {experiences.map((exp, index) => {
                    // Format the duration and year range
                    const formattedDuration = getFormattedDuration(exp.startDate, exp.endDate);

                    return (
                        <div
                            key={`${exp.company}-${index}`}
                            className="w-full py-3 md:py-4 relative overflow-hidden group transition-all duration-300 hover:bg-primary/5 cursor-pointer text-primary"
                        >
                            {/* Mobile-friendly grid that stacks on small screens */}
                            <div className="flex flex-col md:grid md:grid-cols-7 gap-1 md:gap-2 items-start md:items-center px-4 md:px-6 relative z-10 group-hover:text-background transition-colors duration-500">

                                {/* Company name - Full width on mobile, col-span-2 on larger screens */}
                                <div className="w-full md:col-span-2 md:pr-4 mb-1 md:mb-0">
                                    <div className="font-bold text-sm md:text-base">{exp.company}</div>
                                </div>

                                {/* Position - Full width on mobile, col-span-3 on larger screens */}
                                <div className="w-full md:col-span-3 md:pr-6 text-sm md:text-base">
                                    {exp.position.includes('|') ? (
                                        <>
                                            <span>{exp.position.split('|')[0].trim()}</span>
                                            <span className="opacity-80 font-semibold"> | {exp.position.split('|')[1].trim()}</span>
                                        </>
                                    ) : (
                                        <span>{exp.position}</span>
                                    )}
                                </div>
                                {/* Years and duration - Full width on mobile, col-span-2 on larger screens */}
                                <div className="w-full md:col-span-2 md:pr-4 mb-1 md:mb-0 text-right">
                                    <div className="font-bold text-sm md:text-base">{exp.startDate.split('-')[0]} - {exp.endDate === null ? 'Present' : exp.endDate.split('-')[0]}</div>
                                    <div className="text-xs md:text-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500">{formattedDuration}</div>
                                </div>

                                {/* Description for mobile - Always visible */}
                                <div className="w-full mt-2 md:hidden">
                                    <p className="text-xs leading-relaxed text-primary/80 border-l-2 border-primary/20 pl-3 py-1">{exp.description}</p>
                                </div>
                            </div>

                            {/* Description overlay with gradient - Only for desktop */}
                            <div
                                className="absolute inset-0 z-10 opacity-0 hidden md:block group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-full transition-all duration-500 ease-in-out bg-gradient-to-r from-primary to-accent"
                            >
                                <div className="absolute inset-0 flex items-center justify-center p-5">
                                    <div className="w-full">
                                        <p className="leading-relaxed text-sm text-background text-opacity-90">{exp.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Total experience summary row */}
                <div className="py-4 md:py-6 px-4 md:pr-8 flex flex-row justify-between md:justify-end">
                    <div className="text-primary/70 font-medium text-sm md:text-base">Work experience</div>
                    <div className="text-primary font-bold text-sm md:text-base md:ml-4">{getTotalExperience()}</div>
                </div>
            </div>
        </div>
    );
} 