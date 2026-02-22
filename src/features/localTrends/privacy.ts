/**
 * LOCAL TRENDS — PRIVACY ENGINE
 *
 * Rules:
 *  - kMin = 250: minimum sample size to show city-level data.
 *  - If city.citySampleSize < kMin → try region (regionSampleSize).
 *  - If region < kMin → try country (countrySampleSize).
 *  - If still insufficient → return null (triggers empty state).
 *  - All pct and delta values are rounded to nearest multiple of 5.
 *  - Never display neighbourhood / postcode — only city / region / country.
 */

import { LocalDataset, ResolvedData, TrendTimeframe } from "./types";

export const K_MIN = 250;

export function roundToFive(n: number): number {
    return Math.round(n / 5) * 5;
}

/**
 * Resolve which granularity level to show based on sample sizes.
 * Returns null if even country-level data is insufficient.
 */
export function resolveDataset(
    dataset: LocalDataset,
    timeframe: TrendTimeframe
): ResolvedData | null {
    const topics = timeframe === "today" ? dataset.today : dataset.week;

    // City level — enough data, no fallback
    if (dataset.citySampleSize >= K_MIN) {
        return {
            topics: applyRounding(topics),
            level: "city",
            locationName: dataset.cityName,
            wasFallback: false
        };
    }

    // Region fallback
    if (dataset.regionSampleSize >= K_MIN) {
        return {
            topics: applyRounding(topics),
            level: "region",
            locationName: dataset.regionName,
            wasFallback: true
        };
    }

    // Country fallback
    if (dataset.countrySampleSize >= K_MIN) {
        return {
            topics: applyRounding(topics),
            level: "country",
            locationName: dataset.countryName,
            wasFallback: true
        };
    }

    // Insufficient data at all levels → empty state
    return null;
}

/** Apply roundToFive to pct and delta for all topics */
function applyRounding(topics: import("./types").Topic[]) {
    return topics.map((t) => ({
        ...t,
        pct: roundToFive(t.pct),
        delta: roundToFive(t.delta)
    }));
}
