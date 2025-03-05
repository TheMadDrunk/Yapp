import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface TimelineProps {
    children: React.ReactNode;
    horizontal?: boolean;
    className?: string;
}

export interface TimelineItemProps {
    children: React.ReactNode;
    className?: string;
}

export interface TimelinePointProps {
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
}

export interface TimelineContentProps {
    children: React.ReactNode;
    className?: string;
}

export interface TimelineTimeProps {
    children: React.ReactNode;
    className?: string;
}

export interface TimelineTitleProps {
    children: React.ReactNode;
    className?: string;
}

export interface TimelineBodyProps {
    children: React.ReactNode;
    className?: string;
}

const TimelineContext = React.createContext<{ horizontal: boolean }>({ horizontal: false });

export function Timeline({ children, horizontal = false, className }: TimelineProps) {
    return (
        <TimelineContext.Provider value={{ horizontal }}>
            <ol className={twMerge(
                'relative',
                horizontal ? 'flex' : 'border-s border-gray-200 dark:border-gray-700',
                className
            )}>
                {children}
            </ol>
        </TimelineContext.Provider>
    );
}

function TimelineItem({ children, className }: TimelineItemProps) {
    const { horizontal } = React.useContext(TimelineContext);
    return (
        <li className={twMerge(
            horizontal ? 'flex-1' : 'mb-10 ms-6',
            className
        )}>
            {children}
        </li>
    );
}

function TimelinePoint({ icon: Icon, className }: TimelinePointProps) {
    const { horizontal } = React.useContext(TimelineContext);
    return (
        <span className={twMerge(
            'absolute flex items-center justify-center w-6 h-6 rounded-full bg-primary ',
            horizontal ? 'start-1/2 -translate-x-1/2' : '-start-3',
            className
        )}>
            {Icon && (
                <Icon className="w-2.5 h-2.5 text-black " />
            )}
        </span>
    );
}

function TimelineContent({ children, className }: TimelineContentProps) {
    const { horizontal } = React.useContext(TimelineContext);
    return (
        <div className={twMerge(
            horizontal ? 'mt-8' : '',
            className
        )}>
            {children}
        </div>
    );
}

function TimelineTime({ children, className }: TimelineTimeProps) {
    return (
        <time className={twMerge(
            'block mb-2 text-sm font-normal leading-none text-gray-700 ',
            className
        )}>
            {children}
        </time>
    );
}

function TimelineTitle({ children, className }: TimelineTitleProps) {
    return (
        <h3 className={twMerge(
            'mb-1 text-lg font-semibold text-gray-900 ',
            className
        )}>
            {children}
        </h3>
    );
}

function TimelineBody({ children, className }: TimelineBodyProps) {
    return (
        <p className={twMerge(
            'mb-4 text-base font-normal text-gray-500 ',
            className
        )}>
            {children}
        </p>
    );
}

Timeline.Item = TimelineItem;
Timeline.Point = TimelinePoint;
Timeline.Content = TimelineContent;
Timeline.Time = TimelineTime;
Timeline.Title = TimelineTitle;
Timeline.Body = TimelineBody;

export default Timeline; 