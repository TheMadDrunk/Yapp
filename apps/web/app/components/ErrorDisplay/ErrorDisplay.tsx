import { AlertTriangle } from "lucide-react";

export interface ErrorDisplayProps {
    message: string;
    title?: string;
    className?: string;
}

export function ErrorDisplay({
    message,
    title = "Error Loading Content",
    className = ""
}: ErrorDisplayProps) {
    return (
        <div className={`w-fit mx-auto px-4 py-8 ${className}`}>
            <div className="bg-secondary/90 border-l-4 border-primary p-4 max-w-2xl">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-300">{title}</h3>
                        <div className="mt-2 text-sm text-red-50">
                            <p>{message}</p>
                            <p className="mt-2">Please try refreshing the page or come back later.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
} 