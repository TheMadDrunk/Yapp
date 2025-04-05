import ReactGA from 'react-ga';
import { useCallback } from 'react';


export function useAnalytics() {
    const eventTracker = useCallback(
        (event: string, data?: any) => {
            if (typeof window !== 'undefined') {
                window.umami.track(event, data);
            }
        },
        []
    );

    return eventTracker;
} 