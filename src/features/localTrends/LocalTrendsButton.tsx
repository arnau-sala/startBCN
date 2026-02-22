"use client";

import { IconButton } from "@/components/IconButton";

/**
 * Small ghost icon button that opens the Local Trends sheet.
 * Designed to sit in the Home header row next to other secondary icons.
 */
export function LocalTrendsButton({ onClick }: { onClick: () => void }) {
    return (
        <IconButton
            icon={
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    {/* Radar / pulse icon */}
                    <circle cx="12" cy="12" r="2" />
                    <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
                    <path d="M7.76 16.24a6 6 0 0 1 0-8.49" />
                    <path d="M20.07 3.93a10 10 0 0 1 0 16.14" />
                    <path d="M3.93 20.07a10 10 0 0 1 0-16.14" />
                </svg>
            }
            label="Local trends"
            variant="ghost"
            onClick={onClick}
            ariaLabel="Open local trends"
        />
    );
}
