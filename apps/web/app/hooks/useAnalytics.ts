import ReactGA from 'react-ga';
import { useCallback } from 'react';

/**
 * Simple hook for creating Google Analytics event trackers
 * @param category The event category
 * @returns A function that tracks events for the specified category
 */
export function useAnalytics(category = "General") {
    const eventTracker = useCallback(
        (action = "action", label?: string) => {
            if (typeof window !== 'undefined' && window.GA_ID) {
                ReactGA.event({ category, action, label });
            }
        },
        [category]
    );

    return eventTracker;
} 