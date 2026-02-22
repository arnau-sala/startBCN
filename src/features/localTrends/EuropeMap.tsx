"use client";

import { useState } from "react";

/**
 * EuropeMap — Real dotted-Europe image as background.
 * The <img> is in NORMAL FLOW so it provides intrinsic height.
 * SVG heat zones and label cards are absolutely positioned on top.
 *
 * Coordinate calibration (adjust if pins are off):
 *   The image has whitespace borders, so we map lon/lat into the
 *   usable portion of the image via IMAGE_* constants.
 */

// ─── Calibration constants ────────────────────────────────────────────────────
// For this custom stylized image, geometric projection isn't perfectly accurate.
// Instead, we use hand-tuned percentages to place the dots correctly over the image countries.

function pctById(id: string) {
    const POS: Record<string, { left: number; top: number }> = {
        barcelona: { left: 40.5, top: 76.5 },
        paris: { left: 40, top: 66.5 },
        berlin: { left: 56.5, top: 57 },
    };
    return POS[id] ?? { left: 50, top: 50 };
}

// ─── City data ────────────────────────────────────────────────────────────────

// Legacy SVG-space coords — still used by LocalTrendsSheet for nothing critical
export const CITY_SVG_POSITIONS = Object.fromEntries(
    ["barcelona", "berlin", "paris"].map((id) => {
        const p = pctById(id);
        return [id, { x: (p.left / 100) * 800, y: (p.top / 100) * 500 }];
    })
);

const CITY_COLORS: Record<string, { fill: string; text: string }> = {
    barcelona: { fill: "var(--accent)", text: "var(--text-primary)" },
    berlin: { fill: "var(--positive)", text: "var(--text-primary)" },
    paris: { fill: "var(--warning)", text: "var(--text-primary)" },
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MapCity {
    id: string;
    displayName: string;
    topTopic: string;
    topIcon: string;
    pct: number;
    delta: number;
}

interface EuropeMapProps {
    cities: MapCity[];
    selectedCityId: string | null;
    onCityClick: (id: string) => void;
    timeframe: "today" | "week";
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EuropeMap({ cities, selectedCityId, onCityClick, timeframe }: EuropeMapProps) {
    const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);

    return (
        /*
         * position:relative so children can be absolute.
         * The <img> is in NORMAL FLOW → it drives the container height.
         * Everything else is overlaid with position:absolute.
         */
        <div className="relative w-full" style={{ borderRadius: "var(--radius-md)", overflow: "hidden" }}>

            {/* ── Real image (normal flow — drives container height) ── */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/europe-map.avif"
                alt="Dotted map of Europe"
                style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    userSelect: "none",
                    pointerEvents: "none"
                }}
                draggable={false}
            />

            {/* ── SVG overlay: glow blobs + pulse rings + cores ── */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                style={{ pointerEvents: "none" }}
            >
                <defs>
                    {cities.map((city) => {
                        const c = CITY_COLORS[city.id] ?? { fill: "var(--accent)" };
                        const p = pctById(city.id);
                        return (
                            <radialGradient
                                key={`gl-${city.id}`}
                                id={`lt-gl-${city.id}`}
                                cx={`${p.left}%`}
                                cy={`${p.top}%`}
                                r="6%"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0%" stopColor={c.fill} stopOpacity="0.10" />
                                <stop offset="100%" stopColor={c.fill} stopOpacity="0" />
                            </radialGradient>
                        );
                    })}
                </defs>

                {cities.map((city) => {
                    const c = CITY_COLORS[city.id] ?? { fill: "var(--accent)", text: "white" };
                    const p = pctById(city.id);
                    const cx = p.left;
                    const cy = p.top;
                    const isSelected = selectedCityId === city.id;
                    const isOther = selectedCityId !== null && !isSelected;

                    return (
                        <g key={city.id} opacity={isOther ? 0.25 : 1} style={{ transition: "opacity 200ms" }}>
                            {/* Glow blob */}
                            <circle cx={`${cx}%`} cy={`${cy}%`} r="6%" fill={`url(#lt-gl-${city.id})`} />
                            {/* Pulse ring 1 */}
                            <circle
                                className="lt-pulse-ring"
                                cx={`${cx}%`} cy={`${cy}%`} r="1.2%"
                                fill="#1d6e7a"
                                style={{ animationDelay: city.id === "berlin" ? "0.45s" : city.id === "paris" ? "0.9s" : "0s", opacity: 0.3 }}
                            />
                            {/* Pulse ring 2 */}
                            <circle className="lt-pulse-ring-2" cx={`${cx}%`} cy={`${cy}%`} r="1.2%" fill="#1d6e7a" style={{ opacity: 0.3 }} />
                            {/* Core */}
                            <circle
                                cx={`${cx}%`} cy={`${cy}%`}
                                r={isSelected ? "0.9%" : "0.7%"}
                                fill="#1d6e7a"
                                style={{ transition: "r 200ms ease" }}
                            />
                            {/* White centre */}
                            <circle cx={`${cx}%`} cy={`${cy}%`} r="0.25%" fill="var(--surface-sunken)" />
                        </g>
                    );
                })}
            </svg>

            {/* ── Clickable city label cards ── */}
            {cities.map((city) => {
                const p = pctById(city.id);
                const c = CITY_COLORS[city.id] ?? { fill: "var(--accent)", text: "var(--text-inverse)" };
                const isSelected = selectedCityId === city.id;
                const isHovered = hoveredCityId === city.id;
                const isVisible = isSelected || isHovered;
                const isOther = selectedCityId !== null && !isSelected;
                const isUp = city.delta > 0;
                const isDown = city.delta < 0;

                return (
                    <button
                        key={city.id}
                        type="button"
                        onClick={() => onCityClick(city.id)}
                        onMouseEnter={() => setHoveredCityId(city.id)}
                        onMouseLeave={() => setHoveredCityId(null)}
                        style={{
                            position: "absolute",
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            transform: "translate(-50%, -50%)",
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "transparent",
                            border: "none",
                            opacity: isOther ? 0.25 : 1,
                            zIndex: isVisible ? 10 : 2,
                            transition: "opacity 200ms",
                            cursor: "pointer"
                        }}
                        aria-label={`View trends for ${city.displayName}`}
                    >
                        <div style={{
                            position: "absolute",
                            bottom: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0px",
                            paddingBottom: "8px",
                            opacity: isVisible ? 1 : 0,
                            visibility: isVisible ? "visible" : "hidden",
                            pointerEvents: isVisible ? "auto" : "none",
                            transition: "all 200ms ease"
                        }}>
                            {/* Tooltip Chip */}
                            <div
                                style={{
                                    whiteSpace: "nowrap",
                                    borderRadius: "100px",
                                    padding: "6px 14px",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    letterSpacing: "-0.01em",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    background: "var(--surface-raised)",
                                    border: "1px solid var(--border-subtle)",
                                    boxShadow: isSelected ? "0 4px 12px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
                                    transition: "all 200ms ease"
                                }}
                            >
                                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{city.displayName}</span>
                                <span style={{ color: "var(--text-tertiary)" }}>·</span>
                                <span style={{ color: "var(--text-primary)" }}>{city.topTopic}</span>
                                <span style={{ color: "var(--text-tertiary)" }}>·</span>
                                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{city.pct}%</span>
                                <span style={{ color: "var(--text-tertiary)" }}>·</span>
                                <span style={{ fontWeight: 500, color: isUp ? "var(--positive)" : isDown ? "var(--negative)" : "var(--text-tertiary)" }}>
                                    {isUp ? "↑" : isDown ? "↓" : ""}{Math.abs(city.delta)}% {timeframe === "week" ? "vs last week" : "vs yesterday"}
                                </span>
                            </div>
                            {/* Connector stem */}
                            <div
                                style={{
                                    width: "1px",
                                    height: "6px",
                                    background: "var(--border-subtle)"
                                }}
                            />
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
