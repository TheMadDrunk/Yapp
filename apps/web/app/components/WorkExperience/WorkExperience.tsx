// Refined interface with start and end dates instead of duration
interface WorkExperience {
    company: string;
    position: string;
    startDate: string; // Year (e.g., "2021")
    endDate: string; // Year or "Present" (e.g., "2022" or "Present")
    duration?: string; // For backward compatibility with CMS
    description: string; // Detailed information to show on hover
    logo?: {
        url: string;
    };
}

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
        const startYear = parseInt(start, 10);
        const endYear = end === 'Present'
            ? new Date().getFullYear()
            : parseInt(end, 10);

        if (isNaN(startYear) || isNaN(endYear)) {
            return '';
        }

        // Calculate total months
        const currentDate = new Date();
        const endDate = end === 'Present'
            ? currentDate
            : new Date(endYear, 11, 31); // December 31st of end year

        const startDate = new Date(startYear, 0, 1); // January 1st of start year

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
            const startYear = parseInt(exp.startDate, 10);
            const endYear = exp.endDate === 'Present'
                ? new Date().getFullYear()
                : parseInt(exp.endDate, 10);

            if (!isNaN(startYear) && !isNaN(endYear)) {
                const currentDate = new Date();
                const endDate = exp.endDate === 'Present'
                    ? currentDate
                    : new Date(endYear, 11, 31);

                const startDate = new Date(startYear, 0, 1);

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
        <div className="mt-16 mb-12">
            <div className="grid grid-cols-1 divide-y divide-primary/10 border-t border-b border-primary/20">
                {experiences.map((exp, index) => {
                    // Format the duration and year range
                    const formattedDuration = getFormattedDuration(exp.startDate, exp.endDate);

                    return (
                        <div
                            key={`${exp.company}-${index}`}
                            className="w-full py-4 relative overflow-hidden group transition-all duration-300 hover:bg-primary/5 cursor-pointer"
                        >
                            <div className="grid grid-cols-7 gap-2 items-center px-6 relative z-10 group-hover:text-background transition-colors duration-500">
                                {/* Left column: years and duration */}
                                <div className="col-span-2 pr-4">
                                    <div className="font-bold">{exp.startDate} - {exp.endDate}</div>
                                    <div className="text-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500">{formattedDuration}</div>
                                </div>

                                {/* Middle column: company name */}
                                <div className="col-span-2 pr-4">
                                    <div className="font-bold">{exp.company}</div>
                                </div>

                                {/* Right column: position with optional technologies */}
                                <div className="col-span-3 pr-6">
                                    {exp.position.includes('|') ? (
                                        <>
                                            <span>{exp.position.split('|')[0].trim()}</span>
                                            <span className="opacity-80 font-semibold"> | {exp.position.split('|')[1].trim()}</span>
                                        </>
                                    ) : (
                                        <span>{exp.position}</span>
                                    )}
                                </div>
                            </div>

                            {/* Description overlay with gradient */}
                            <div
                                className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-full transition-all duration-500 ease-in-out bg-gradient-to-r from-primary via-secondary to-accent"
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
                <div className="py-6 pr-8 text-right">
                    <div className="text-primary/70 font-medium">Work experience</div>
                    <div className="text-primary font-bold">{getTotalExperience()}</div>
                </div>
            </div>
        </div>
    );
} 