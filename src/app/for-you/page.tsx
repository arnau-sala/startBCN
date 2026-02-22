"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { LocalTrendsButton } from "@/features/localTrends/LocalTrendsButton";
import { LocalTrendsSheet } from "@/features/localTrends/LocalTrendsSheet";
import { Card } from "@/components/Card";
import { ChatFab } from "@/components/ChatFab";
import { ChatMessage, ChatWidgetModal } from "@/components/ChatWidgetModal";
import { DashboardLayout } from "@/components/DashboardLayout";
import { HoldingsModeToggle, HoldingsTable, HoldingsViewMode } from "@/components/HoldingsTable";
import { IconButton } from "@/components/IconButton";
import { LegalDocModal } from "@/components/LegalDocModal";
import { ListRow } from "@/components/ListRow";
import { NewsModal } from "@/components/NewsModal";
import { AssetDetailModal } from "@/components/AssetDetailModal";
import { ProfileMenu } from "@/components/ProfileMenu";
import { SectionHeader } from "@/components/SectionHeader";
import { SegmentedControl } from "@/components/SegmentedControl";
import { SparklineChart } from "@/components/SparklineChart";
import { supportedAssetTickers, SupportedAssetTicker } from "@/lib/mock/assets";
import { legalDigestDocs, LegalDigestItem } from "@/lib/mock/legalDocs";
import { allDashboardNews, DashboardNewsItem, globalNews, personalizedNewsSeed } from "@/lib/mock/news";
import {
  chartSeriesByRange,
  ChartPoint,
  holdings,
  searchUniverse,
  Timeframe,
  totalBalanceByRange,
  totalInvested
} from "@/lib/mock/portfolio";
import {
  defaultFrontendProfile,
  FrontendProfileState,
  getWhyForYou
} from "@/lib/mock/profile";

function CarouselArrowButton({
  direction,
  ariaLabel,
  onClick
}: {
  direction: "prev" | "next";
  ariaLabel: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full border bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {direction === "prev" ? (
          <path d="M10 3.5 5.5 8 10 12.5" />
        ) : (
          <path d="M6 3.5 10.5 8 6 12.5" />
        )}
      </svg>
    </button>
  );
}

/* ─── Single-row news carousel ────────────────────────────────────────────── */
function NewsRowCarousel({
  items,
  activeIndex,
  previousIndex,
  animationKey,
  direction,
  onOpen,
  onOpenAsset,
  onMouseEnter,
  onMouseLeave,
  whyForYou
}: {
  items: DashboardNewsItem[];
  activeIndex: number;
  previousIndex: number | null;
  animationKey: number;
  direction: "next" | "prev";
  onOpen: (item: DashboardNewsItem) => void;
  onOpenAsset?: (ticker: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  whyForYou?: (item: DashboardNewsItem) => string;
}) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (previousIndex === null) return;
    setAnimating(true);
    const t = window.setTimeout(() => setAnimating(false), 380);
    return () => window.clearTimeout(t);
  }, [animationKey, previousIndex]);



  const tickerStyle: Record<string, { bg: string; text: string; border: string }> = {
    BTC: { bg: "#FFF4E6", text: "#B45309", border: "#F59E0B" },
    ETH: { bg: "#EEF2FF", text: "#4338CA", border: "#818CF8" },
    NVDA: { bg: "#ECFDF3", text: "#166534", border: "#34D399" },
    SPY: { bg: "#E0F2FE", text: "#075985", border: "#38BDF8" },
    TSLA: { bg: "#FEF2F2", text: "#991B1B", border: "#F87171" },
    GLD: { bg: "#FFFBEB", text: "#92400E", border: "#FBBF24" },
    EUR: { bg: "#F1F5F9", text: "#334155", border: "#CBD5E1" }
  };

  if (items.length === 0) {
    return <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>No news available.</p>;
  }

  const safeIndex = ((activeIndex % items.length) + items.length) % items.length;
  const item = items[safeIndex];
  const prevItem =
    previousIndex === null ? null : items[((previousIndex % items.length) + items.length) % items.length];

  const cardContent = (news: DashboardNewsItem) => (
    <div className="grid grid-cols-[1fr_auto] gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p style={{ color: "var(--text-tertiary)" }} className="text-[11px]">
            {news.source} · {news.timeAgo}
          </p>
          {whyForYou && (
            <p className="clamp-1 text-[11px]" style={{ color: "var(--accent-dark)" }}>
              {whyForYou(news)}
            </p>
          )}
        </div>
        <p
          className="mt-1 clamp-2 text-sm font-semibold leading-snug"
          style={{ color: "var(--text-primary)" }}
        >
          {news.simpleTitle}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1">
          {(news.tickers ?? []).slice(0, 2).map((ticker) => {
            const t = ticker.toUpperCase();
            const style = tickerStyle[t] ?? { bg: "#F1F5F9", text: "#334155", border: "#CBD5E1" };
            const isSupportedAsset = supportedAssetTickers.includes(t as SupportedAssetTicker);
            return (
              <button
                key={`${news.id}-${t}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isSupportedAsset) onOpenAsset?.(t);
                }}
                className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide ${isSupportedAsset ? "cursor-pointer underline-offset-2 hover:underline" : "cursor-default"
                  }`}
                style={{ background: style.bg, color: style.text, borderColor: style.border }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
      {news.imageUrl && (
        <div
          className="flex h-[76px] w-[108px] shrink-0 items-center justify-center overflow-hidden rounded-lg border"
          style={{ borderColor: "var(--border-subtle)", background: "var(--surface-raised)" }}
        >
          <img
            src={news.imageUrl}
            alt={news.title}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-2">
      <div
        key={`${item.id}-${animationKey}`}
        className="relative h-[108px] overflow-hidden"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => onOpen(item)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen(item)}
      >
        {animating && prevItem && (
          <div
            className={`pointer-events-none absolute inset-0 row-inset ${direction === "next"
              ? "animate-[news-out-left_.38s_ease_forwards]"
              : "animate-[news-out-right_.38s_ease_forwards]"
              }`}
          >
            {cardContent(prevItem)}
          </div>
        )}
        <div
          className={`row-inset h-full ${animating && prevItem
            ? `absolute inset-0 ${direction === "next"
              ? "animate-[news-in-right_.38s_ease_forwards]"
              : "animate-[news-in-left_.38s_ease_forwards]"
            }`
            : ""
            }`}
        >
          {cardContent(item)}
        </div>
      </div>
    </div>
  );
}

function LegalDocRowCarousel({
  items,
  activeIndex,
  previousIndex,
  animationKey,
  direction,
  onOpen,
  onOpenAsset,
  onMouseEnter,
  onMouseLeave
}: {
  items: LegalDigestItem[];
  activeIndex: number;
  previousIndex: number | null;
  animationKey: number;
  direction: "next" | "prev";
  onOpen: (item: LegalDigestItem) => void;
  onOpenAsset?: (ticker: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (previousIndex === null) return;
    setAnimating(true);
    const t = window.setTimeout(() => setAnimating(false), 380);
    return () => window.clearTimeout(t);
  }, [animationKey, previousIndex]);

  if (items.length === 0) return null;

  const safeIndex = ((activeIndex % items.length) + items.length) % items.length;
  const item = items[safeIndex];
  const prevItem =
    previousIndex === null ? null : items[((previousIndex % items.length) + items.length) % items.length];
  const heldTickers = new Set(holdings.map((h) => h.ticker.toUpperCase()));
  const tickerStyle: Record<string, { bg: string; text: string; border: string }> = {
    BTC: { bg: "#FFF4E6", text: "#B45309", border: "#F59E0B" },
    ETH: { bg: "#EEF2FF", text: "#4338CA", border: "#818CF8" },
    NVDA: { bg: "#ECFDF3", text: "#166534", border: "#34D399" },
    SPY: { bg: "#E0F2FE", text: "#075985", border: "#38BDF8" },
    TSLA: { bg: "#FEF2F2", text: "#991B1B", border: "#F87171" },
    GLD: { bg: "#FFFBEB", text: "#92400E", border: "#FBBF24" },
    EUR: { bg: "#F1F5F9", text: "#334155", border: "#CBD5E1" }
  };

  const content = (doc: LegalDigestItem) => (
    <div className="flex h-full items-start justify-between gap-3 overflow-hidden">
      <div className="min-w-0">
        <p className="clamp-1 text-sm font-semibold text-slate-900">{doc.dummyTitle}</p>
        <p className="mt-1 clamp-1 text-xs text-slate-500">
          Deadline {doc.deadline} · {doc.pages} pages · {doc.keyPoints.length} key points
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-1">
          {doc.affectedAssets
            .map((asset) => asset.toUpperCase())
            .filter((asset) => heldTickers.has(asset))
            .slice(0, 2)
            .map((asset) => (
              <button
                key={`${doc.id}-${asset}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (supportedAssetTickers.includes(asset as SupportedAssetTicker)) onOpenAsset?.(asset);
                }}
                className="rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide"
                style={{
                  background: (tickerStyle[asset] ?? { bg: "#F1F5F9", text: "#334155", border: "#CBD5E1" }).bg,
                  color: (tickerStyle[asset] ?? { bg: "#F1F5F9", text: "#334155", border: "#CBD5E1" }).text,
                  borderColor: (tickerStyle[asset] ?? { bg: "#F1F5F9", text: "#334155", border: "#CBD5E1" }).border
                }}
              >
                {asset}
              </button>
            ))}
        </div>
      </div>
      <div
        className="flex h-[76px] w-[108px] shrink-0 items-center justify-center overflow-hidden rounded-lg border"
        style={{ borderColor: "var(--border-subtle)", background: "var(--surface-raised)" }}
      >
        <img
          src={doc.imageUrl}
          alt={doc.dummyTitle}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );

  return (
    <div
      key={`${item.id}-${animationKey}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(item)}
      className="relative block h-[96px] w-full overflow-hidden text-left"
    >
      {animating && prevItem && (
        <div
          className={`pointer-events-none absolute inset-0 rounded-xl border p-2.5 ${direction === "next"
            ? "animate-[news-out-left_.38s_ease_forwards]"
            : "animate-[news-out-right_.38s_ease_forwards]"
            }`}
          style={{ borderColor: "var(--border-subtle)", background: "var(--surface-sunken)" }}
        >
          {content(prevItem)}
        </div>
      )}
      <div
        className={`h-full rounded-xl border p-2.5 ${animating && prevItem
          ? `absolute inset-0 ${direction === "next"
            ? "animate-[news-in-right_.38s_ease_forwards]"
            : "animate-[news-in-left_.38s_ease_forwards]"
          }`
          : ""
          }`}
        style={{ borderColor: "var(--border-subtle)", background: "var(--surface-sunken)" }}
      >
        {content(item)}
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function ForYouPage() {
  const [profile, setProfile] = useState<FrontendProfileState>(defaultFrontendProfile);
  const [timeframe, setTimeframe] = useState<Timeframe>("day");
  const [scrubIdx, setScrubIdx] = useState<number | null>(null);
  const [holdingsMode, setHoldingsMode] = useState<HoldingsViewMode>("sinceBuy");
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [localTrendsOpen, setLocalTrendsOpen] = useState(false);
  const localTrendsTriggerRef = useRef<HTMLButtonElement>(null);
  const [showResume, setShowResume] = useState(false);
  const [selectedNews, setSelectedNews] = useState<DashboardNewsItem | null>(null);
  const [selectedLegalDoc, setSelectedLegalDoc] = useState<LegalDigestItem | null>(null);
  const [selectedAssetTicker, setSelectedAssetTicker] = useState<SupportedAssetTicker | null>(null);
  const [assetModalTimeframe, setAssetModalTimeframe] = useState<Timeframe>("day");
  const openAssetFromTicker = (ticker: string) => {
    const t = ticker.toUpperCase();
    if (!supportedAssetTickers.includes(t as SupportedAssetTicker)) return;
    setAssetModalTimeframe("day");
    setSelectedAssetTicker(t as SupportedAssetTicker);
  };

  const [chatOpen, setChatOpen] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [globalNewsIndex, setGlobalNewsIndex] = useState(0);
  const [personalNewsIndex, setPersonalNewsIndex] = useState(0);
  const [globalPrevNewsIndex, setGlobalPrevNewsIndex] = useState<number | null>(null);
  const [personalPrevNewsIndex, setPersonalPrevNewsIndex] = useState<number | null>(null);
  const [globalAnimationKey, setGlobalAnimationKey] = useState(0);
  const [personalAnimationKey, setPersonalAnimationKey] = useState(0);
  const [globalDirection, setGlobalDirection] = useState<"next" | "prev">("next");
  const [personalDirection, setPersonalDirection] = useState<"next" | "prev">("next");
  const [legalDocIndex, setLegalDocIndex] = useState(0);
  const [legalPrevDocIndex, setLegalPrevDocIndex] = useState<number | null>(null);
  const [legalAnimationKey, setLegalAnimationKey] = useState(0);
  const [legalDirection, setLegalDirection] = useState<"next" | "prev">("next");
  const [globalAutoPlay, setGlobalAutoPlay] = useState(true);
  const [personalAutoPlay, setPersonalAutoPlay] = useState(true);
  const [legalAutoPlay, setLegalAutoPlay] = useState(true);
  const [tipAutoPlay, setTipAutoPlay] = useState(true);
  const [globalHovering, setGlobalHovering] = useState(false);
  const [personalHovering, setPersonalHovering] = useState(false);
  const [legalHovering, setLegalHovering] = useState(false);
  const [tipHovering, setTipHovering] = useState(false);
  const [tipPrevIndex, setTipPrevIndex] = useState<number | null>(null);
  const [tipAnimationKey, setTipAnimationKey] = useState(0);
  const [tipDirection, setTipDirection] = useState<"next" | "prev">("next");
  const [tipAnimating, setTipAnimating] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "c1", role: "assistant", text: "Hi Pepe, I can help you understand today's portfolio moves." }
  ]);

  const searchResults = useMemo(
    () =>
      search
        ? searchUniverse.filter((item) =>
          `${item.name} ${item.symbol}`.toLowerCase().includes(search.toLowerCase())
        )
        : [],
    [search]
  );
  const suggestedShares = useMemo(
    () => [
      {
        id: "s-msft",
        name: "Microsoft",
        ticker: "MSFT",
        valueEur: 28120,
        plEur: 3120,
        plPct: 12.48
      },
      {
        id: "s-aapl",
        name: "Apple",
        ticker: "AAPL",
        valueEur: 21430,
        plEur: -980,
        plPct: -4.37
      }
    ],
    []
  );

  const personalizedNews = useMemo(() => {
    const scoreForItem = (tags: string[]) => {
      let score = 0;
      if (profile.interests.includes("crypto") && tags.includes("crypto")) score += 3;
      if (profile.interests.includes("stocks") && tags.some((t) => ["stocks", "ai", "tech", "etf"].includes(t))) score += 3;
      if (profile.interests.includes("savings") && tags.some((t) => ["savings", "rates"].includes(t))) score += 2;
      if (profile.interests.includes("macro") && tags.includes("macro")) score += 2;
      return score;
    };
    return [...personalizedNewsSeed].sort((a, b) => scoreForItem(b.tags) - scoreForItem(a.tags));
  }, [profile]);
  const globalNewsLoop = useMemo(() => {
    const seen = new Set<string>();
    return globalNews.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    }).slice(0, 5);
  }, []);
  const personalizedNewsLoop = useMemo(() => {
    const seen = new Set<string>();
    return personalizedNews.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    }).slice(0, 5);
  }, [personalizedNews]);
  const legalDocsLoop = useMemo(() => {
    const seen = new Set<string>();
    return legalDigestDocs.filter((doc) => {
      if (seen.has(doc.id)) return false;
      seen.add(doc.id);
      return true;
    }).slice(0, 5);
  }, []);

  const dailyTips = useMemo(
    () => [
      "BTC: Volatility is elevated today. Do not panic; avoid impulse decisions and focus on your long-term plan.",
      "SPY: Broad market trend is constructive. Stay diversified and stick to your allocation plan.",
      "GLD: Acting as a stabilizer in your portfolio. Use it for balance, not for chasing short-term returns."
    ],
    []
  );
  const currentTip = dailyTips[((tipIndex % dailyTips.length) + dailyTips.length) % dailyTips.length];
  const previousTip =
    tipPrevIndex === null ? null : dailyTips[((tipPrevIndex % dailyTips.length) + dailyTips.length) % dailyTips.length];

  useEffect(() => {
    if (globalNewsLoop.length <= 1 || !globalAutoPlay || globalHovering) return;
    const timer = window.setInterval(() => {
      setGlobalNewsIndex((prev) => {
        setGlobalPrevNewsIndex(prev);
        setGlobalDirection("next");
        setGlobalAnimationKey((k) => k + 1);
        return (prev + 1) % globalNewsLoop.length;
      });
    }, 10000);
    return () => window.clearInterval(timer);
  }, [globalNewsLoop.length, globalAutoPlay, globalHovering]);

  useEffect(() => {
    if (personalizedNewsLoop.length <= 1 || !personalAutoPlay || personalHovering) return;
    const timer = window.setInterval(() => {
      setPersonalNewsIndex((prev) => {
        setPersonalPrevNewsIndex(prev);
        setPersonalDirection("next");
        setPersonalAnimationKey((k) => k + 1);
        return (prev + 1) % personalizedNewsLoop.length;
      });
    }, 10000);
    return () => window.clearInterval(timer);
  }, [personalizedNewsLoop.length, personalAutoPlay, personalHovering]);

  useEffect(() => {
    if (legalDocsLoop.length <= 1 || !legalAutoPlay || legalHovering) return;
    const timer = window.setInterval(() => {
      setLegalDocIndex((prev) => {
        setLegalPrevDocIndex(prev);
        setLegalDirection("next");
        setLegalAnimationKey((k) => k + 1);
        return (prev + 1) % legalDocsLoop.length;
      });
    }, 10000);
    return () => window.clearInterval(timer);
  }, [legalDocsLoop.length, legalAutoPlay, legalHovering]);

  useEffect(() => {
    if (dailyTips.length <= 1 || !tipAutoPlay || tipHovering) return;
    const timer = window.setInterval(() => {
      setTipIndex((prev) => {
        setTipPrevIndex(prev);
        setTipDirection("next");
        setTipAnimationKey((k) => k + 1);
        return (prev + 1) % dailyTips.length;
      });
    }, 5000);
    return () => window.clearInterval(timer);
  }, [dailyTips.length, tipAutoPlay, tipHovering]);

  useEffect(() => {
    if (tipPrevIndex === null) return;
    setTipAnimating(true);
    const t = window.setTimeout(() => {
      setTipAnimating(false);
      setTipPrevIndex(null);
    }, 380);
    return () => window.clearTimeout(t);
  }, [tipAnimationKey, tipPrevIndex]);

  useEffect(() => {
    setPersonalNewsIndex(0);
    setPersonalPrevNewsIndex(null);
    setPersonalAnimationKey((k) => k + 1);
  }, [profile]);

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMessage: ChatMessage = { id: `${Date.now()}-u`, role: "user", text: chatInput.trim() };
    const assistantMessage: ChatMessage = {
      id: `${Date.now()}-a`,
      role: "assistant",
      text: "Mock assistant: great question. I would break this down into trend, risk and your profile fit."
    };
    setChatMessages((prev) => [...prev, userMessage, assistantMessage]);
    setChatInput("");
  };

  /* ── Header ──────────────────────────────────────────────────────────────── */
  const header = (
    <header
      className="rounded-[var(--radius-lg)] border px-6 py-4"
      style={{
        background: "var(--surface-raised)",
        borderColor: "var(--border-subtle)",
        boxShadow: "var(--shadow-card)"
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow">N26 Companion</p>
          <h1
            className="mt-0.5 text-xl font-semibold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Home Summary
          </h1>
        </div>
        <div className="relative flex items-center gap-2">
          <LocalTrendsButton onClick={() => setLocalTrendsOpen(true)} />
          <Link
            href="/reels"
            className="flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition hover:opacity-90"
            style={{
              borderColor: "var(--accent-border)",
              color: "var(--accent-dark)",
              background: "var(--accent-subtle)",
            }}
          >
            <span aria-hidden>▶</span>
            FinTok
          </Link>
          <IconButton
            icon={
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold"
                style={{ background: "var(--accent-subtle)", color: "var(--accent-dark)" }}
              >
                {profile.name.charAt(0).toUpperCase()}
              </span>
            }
            label={profile.name}
            variant="outline"
            onClick={() => setShowProfile((p) => !p)}
            ariaLabel="Open profile settings"
          />
          <ProfileMenu
            open={showProfile}
            profile={profile}
            onClose={() => setShowProfile(false)}
            onSave={(next) => setProfile(next)}
          />
        </div>
      </div>
    </header>
  );

  /* ── Left column ─────────────────────────────────────────────────────────── */
  const left = (
    <>
      {/* Balance */}
      <Card>
        {/* ── Derived scrub values ── */}
        {(() => {
          const series = chartSeriesByRange[timeframe];
          const point: ChartPoint | null = scrubIdx !== null ? series[scrubIdx] : null;
          const displayValue = point ? point.value : totalBalanceByRange[timeframe];
          const openValue = series[0].value;
          const deltaAbs = displayValue - openValue;
          const deltaPct = ((deltaAbs / openValue) * 100);
          const isPos = deltaAbs >= 0;

          const fmt = new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0
          });

          const fmtDate = (iso: string) => {
            const d = new Date(iso);
            return new Intl.DateTimeFormat("en-GB", {
              day: "2-digit", month: "short", year: "numeric",
              hour: "2-digit", minute: "2-digit"
            }).format(d);
          };

          const displayTs = point
            ? fmtDate(point.ts)
            : fmtDate(series[series.length - 1].ts);

          return (
            <>
              <p className="text-[11px] font-medium" style={{ color: "var(--text-tertiary)" }}>
                Total Balance
              </p>

              {/* Value + delta row */}
              <div className="mt-1 flex items-baseline gap-3">
                <p
                  className="text-[2rem] font-bold tracking-tight leading-none"
                  style={{ color: "var(--text-primary)" }}
                >
                  {fmt.format(displayValue)}
                </p>
                <span
                  className="flex items-center gap-0.5 text-sm font-semibold"
                  style={{ color: isPos ? "var(--positive)" : "var(--negative)" }}
                >
                  {isPos ? "▲" : "▼"} {Math.abs(deltaPct).toFixed(2)}%
                </span>
              </div>

              {/* Timestamp */}
              <p className="mt-1 text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                {displayTs}
              </p>
            </>
          );
        })()}

        <div className="mt-4">
          <SegmentedControl
            value={timeframe}
            onChange={(tf) => { setTimeframe(tf); setScrubIdx(null); }}
          />
        </div>
        <SparklineChart
          points={chartSeriesByRange[timeframe]}
          onScrub={setScrubIdx}
        />

        {/* Holdings inline — below chart */}
        <div className="mt-5 border-t pt-4" style={{ borderColor: "var(--border-subtle)" }}>
          <SectionHeader
            title="Holdings"
            action={
              <HoldingsModeToggle
                mode={holdingsMode}
                onChange={setHoldingsMode}
              />
            }
          />
          <HoldingsTable
            items={holdings.slice(0, 3)}
            mode={holdingsMode}
            onViewMore={() => { }}
            enabledDetailTickers={supportedAssetTickers}
            onOpenAssetDetails={(ticker) => {
              setAssetModalTimeframe("day");
              setSelectedAssetTicker(ticker as SupportedAssetTicker);
            }}
            onZoomOutToYear={(ticker) => {
              setAssetModalTimeframe("year");
              setSelectedAssetTicker(ticker as SupportedAssetTicker);
            }}
            onOpenRelatedNews={(ticker) => {
              const related = allDashboardNews.find((item) =>
                (item.tickers ?? []).map((t) => t.toUpperCase()).includes(ticker.toUpperCase())
              );
              if (related) setSelectedNews(related);
            }}
            onAskAssistant={(holding) => {
              setChatOpen(true);
              setChatInput(`Can you explain in simple terms why ${holding.name} (${holding.ticker}) is down today and what I should monitor next?`);
            }}
          />
        </div>
      </Card>

      {/* Quick search */}
      <Card>
        <SectionHeader title="Quick Search" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Stocks, crypto, ETFs…"
          className="w-full rounded-[var(--radius-md)] border px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
          style={{
            borderColor: "var(--border-subtle)",
            background: "var(--surface-sunken)",
            color: "var(--text-primary)"
          }}
        />
        {searchResults.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {searchResults.slice(0, 4).map((item) => (
              <ListRow
                key={item.symbol}
                title={item.name}
                subtitle={item.symbol}
                trailing={
                  <span
                    className={item.changePct >= 0 ? "value-up" : "value-down"}
                  >
                    {item.changePct >= 0 ? "+" : ""}{item.changePct.toFixed(1)}%
                  </span>
                }
              />
            ))}
          </div>
        )}
      </Card>

      {/* Suggested shares */}
      <Card className="flex flex-col lg:min-h-[212px]">
        <SectionHeader title="Suggested shares" eyebrow="Keep an eye on" />
        <div className="flex-1 space-y-1.5">
          {suggestedShares.map((item) => {
            const pos = item.plEur >= 0;
            const supported = supportedAssetTickers.includes(item.ticker.toUpperCase() as SupportedAssetTicker);
            const pnlText = `${item.plEur >= 0 ? "+" : ""}${new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0
            }).format(item.plEur)} (${item.plPct >= 0 ? "+" : ""}${item.plPct.toFixed(2)}%)`;
            return (
              <button
                key={`suggested-${item.id}`}
                type="button"
                onClick={() => {
                  if (supported) openAssetFromTicker(item.ticker);
                }}
                className={`grid w-full grid-cols-4 items-center rounded-xl px-2.5 py-1.5 text-left text-xs transition ${supported ? "cursor-pointer hover:opacity-85" : "cursor-default"
                  }`}
                style={{ background: "var(--surface-sunken)" }}
              >
                <div className="col-span-2 min-w-0">
                  <p className="clamp-1 font-medium" style={{ color: "var(--text-primary)" }}>
                    {item.name}
                  </p>
                  <p style={{ color: "var(--text-tertiary)" }}>{item.ticker}</p>
                </div>
                <p className="text-center" style={{ color: "var(--text-secondary)" }}>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 0
                  }).format(item.valueEur)}
                </p>
                <p
                  className="text-right text-xs font-semibold"
                  style={{ color: pos ? "var(--positive)" : "var(--negative)" }}
                >
                  {pnlText}
                </p>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          aria-label="View more suggested shares"
          onClick={() => { }}
          className="mt-3 block rounded-full border px-3.5 py-1.5 text-xs font-semibold transition hover:opacity-75 mx-auto"
          style={{ borderColor: "var(--accent-border)", color: "var(--accent-dark)" }}
        >
          View more
        </button>
      </Card>

    </>
  );

  /* ── Right column ────────────────────────────────────────────────────────── */
  const right = (
    <>
      {/* Daily Digest + Daily Tip */}
      <Card>
        <div className="grid gap-5 md:grid-cols-2 md:items-start">
          <div className="flex flex-col">
            <p className="eyebrow">For you today</p>
            <h2
              className="mt-1 text-xl font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Daily Digest
            </h2>
            <div className="mt-4 space-y-2">
              {[
                { icon: "📈", text: "Portfolio", value: "+0.7% today", positive: true },
                { icon: "₿", text: "Top mover", value: "BTC −3.1%", positive: false },
                { icon: "👁", text: "Watchlist", value: "NVDA beat" }
              ].map(({ icon, text, value, positive }) => (
                <ListRow
                  key={text}
                  icon={icon}
                  title={text}
                  trailing={
                    <span className={positive === true ? "value-up" : positive === false ? "value-down" : ""}>
                      {value}
                    </span>
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col md:border-l md:pl-5" style={{ borderColor: "var(--border-subtle)" }}>
            <SectionHeader eyebrow="Tip of the day" title="Daily Tip" />
            <div
              className="relative mt-2 flex min-h-[136px] items-center justify-center overflow-hidden rounded-[var(--radius-md)] border p-4 md:h-[156px]"
              style={{ borderColor: "var(--border-subtle)", background: "var(--surface-sunken)" }}
              onMouseEnter={() => setTipHovering(true)}
              onMouseLeave={() => setTipHovering(false)}
            >
              {tipAnimating && previousTip && (
                <p
                  key={`tip-prev-${tipAnimationKey}`}
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center text-sm leading-6 ${tipDirection === "next"
                    ? "animate-[news-out-left_.38s_ease_forwards]"
                    : "animate-[news-out-right_.38s_ease_forwards]"
                    }`}
                  style={{ color: "var(--text-primary)" }}
                >
                  {previousTip}
                </p>
              )}
              <p
                key={`tip-current-${tipAnimationKey}-${tipIndex}`}
                className={`text-center text-sm leading-6 ${tipAnimating
                  ? `absolute inset-0 flex items-center justify-center px-4 ${tipDirection === "next"
                    ? "animate-[news-in-right_.38s_ease_forwards]"
                    : "animate-[news-in-left_.38s_ease_forwards]"
                  }`
                  : ""
                  }`}
                style={{ color: "var(--text-primary)" }}
              >
                {currentTip}
              </p>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <CarouselArrowButton
                direction="prev"
                ariaLabel="Previous tip"
                onClick={() => {
                  setTipPrevIndex(tipIndex);
                  setTipDirection("prev");
                  setTipIndex((prev) => (prev - 1 + dailyTips.length) % dailyTips.length);
                  setTipAnimationKey((k) => k + 1);
                }}
              />
              <div className="flex items-center gap-1.5">
                {dailyTips.map((_, index) => {
                  const active = index === (tipIndex % dailyTips.length + dailyTips.length) % dailyTips.length;
                  return (
                    <button
                      key={`tip-dot-${index}`}
                      type="button"
                      aria-label={`Go to tip ${index + 1}`}
                      onClick={() => {
                        setTipPrevIndex(tipIndex);
                        setTipDirection(index >= tipIndex ? "next" : "prev");
                        setTipIndex(index);
                        setTipAnimationKey((k) => k + 1);
                      }}
                      className="h-2 w-2 rounded-full transition"
                      style={{ background: active ? "var(--accent)" : "var(--border-subtle)" }}
                    />
                  );
                })}
              </div>
              <CarouselArrowButton
                direction="next"
                ariaLabel="Next tip"
                onClick={() => {
                  setTipPrevIndex(tipIndex);
                  setTipDirection("next");
                  setTipIndex((prev) => (prev + 1) % dailyTips.length);
                  setTipAnimationKey((k) => k + 1);
                }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Global News */}
      <Card>
        <SectionHeader
          title="Global News"
          action={
            globalNewsLoop.length > 1 ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {globalNewsLoop.map((_, index) => {
                    const active = index === ((globalNewsIndex % globalNewsLoop.length) + globalNewsLoop.length) % globalNewsLoop.length;
                    return (
                      <button
                        key={`global-dot-${index}`}
                        type="button"
                        aria-label={`Go to global news ${index + 1}`}
                        onClick={() => {
                          setGlobalPrevNewsIndex(globalNewsIndex);
                          setGlobalDirection(index >= globalNewsIndex ? "next" : "prev");
                          setGlobalNewsIndex(index);
                          setGlobalAnimationKey((k) => k + 1);
                        }}
                        className="h-2 w-2 rounded-full transition"
                        style={{ background: active ? "var(--accent)" : "var(--border-subtle)" }}
                      />
                    );
                  })}
                </div>
                <CarouselArrowButton
                  direction="prev"
                  ariaLabel="Previous global news"
                  onClick={() => {
                    setGlobalPrevNewsIndex(globalNewsIndex);
                    setGlobalDirection("prev");
                    setGlobalNewsIndex((prev) => (prev - 1 + globalNewsLoop.length) % globalNewsLoop.length);
                    setGlobalAnimationKey((k) => k + 1);
                  }}
                />
                <CarouselArrowButton
                  direction="next"
                  ariaLabel="Next global news"
                  onClick={() => {
                    setGlobalPrevNewsIndex(globalNewsIndex);
                    setGlobalDirection("next");
                    setGlobalNewsIndex((prev) => (prev + 1) % globalNewsLoop.length);
                    setGlobalAnimationKey((k) => k + 1);
                  }}
                />
              </div>
            ) : null
          }
        />
        <NewsRowCarousel
          items={globalNewsLoop}
          activeIndex={globalNewsIndex}
          previousIndex={globalPrevNewsIndex}
          animationKey={globalAnimationKey}
          direction={globalDirection}
          onOpen={setSelectedNews}
          onOpenAsset={openAssetFromTicker}
          onMouseEnter={() => {
            setGlobalHovering(true);
          }}
          onMouseLeave={() => setGlobalHovering(false)}
        />
      </Card>

      {/* Personalized News */}
      <Card className="mt-2 lg:min-h-[212px]">
        <SectionHeader
          title="Personalized News"
          eyebrow="Curated for you"
          action={
            personalizedNewsLoop.length > 1 ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {personalizedNewsLoop.map((_, index) => {
                    const active = index === ((personalNewsIndex % personalizedNewsLoop.length) + personalizedNewsLoop.length) % personalizedNewsLoop.length;
                    return (
                      <button
                        key={`personalized-dot-${index}`}
                        type="button"
                        aria-label={`Go to personalized news ${index + 1}`}
                        onClick={() => {
                          setPersonalPrevNewsIndex(personalNewsIndex);
                          setPersonalDirection(index >= personalNewsIndex ? "next" : "prev");
                          setPersonalNewsIndex(index);
                          setPersonalAnimationKey((k) => k + 1);
                        }}
                        className="h-2 w-2 rounded-full transition"
                        style={{ background: active ? "var(--accent)" : "var(--border-subtle)" }}
                      />
                    );
                  })}
                </div>
                <CarouselArrowButton
                  direction="prev"
                  ariaLabel="Previous personalized news"
                  onClick={() => {
                    setPersonalPrevNewsIndex(personalNewsIndex);
                    setPersonalDirection("prev");
                    setPersonalNewsIndex((prev) => (prev - 1 + personalizedNewsLoop.length) % personalizedNewsLoop.length);
                    setPersonalAnimationKey((k) => k + 1);
                  }}
                />
                <CarouselArrowButton
                  direction="next"
                  ariaLabel="Next personalized news"
                  onClick={() => {
                    setPersonalPrevNewsIndex(personalNewsIndex);
                    setPersonalDirection("next");
                    setPersonalNewsIndex((prev) => (prev + 1) % personalizedNewsLoop.length);
                    setPersonalAnimationKey((k) => k + 1);
                  }}
                />
              </div>
            ) : null
          }
        />
        <NewsRowCarousel
          items={personalizedNewsLoop}
          activeIndex={personalNewsIndex}
          previousIndex={personalPrevNewsIndex}
          animationKey={personalAnimationKey}
          direction={personalDirection}
          onOpen={setSelectedNews}
          onOpenAsset={openAssetFromTicker}
          onMouseEnter={() => {
            setPersonalHovering(true);
          }}
          onMouseLeave={() => setPersonalHovering(false)}
          whyForYou={(item) => getWhyForYou(profile.interests, item.tags)}
        />
      </Card>

      {/* Regulatory Guardian */}
      <Card className="mt-2">
        <SectionHeader
          title="Regulatory Guardian"
          action={
            legalDocsLoop.length > 1 ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {legalDocsLoop.map((_, index) => {
                    const active = index === ((legalDocIndex % legalDocsLoop.length) + legalDocsLoop.length) % legalDocsLoop.length;
                    return (
                      <button
                        key={`legal-dot-${index}`}
                        type="button"
                        aria-label={`Go to legal digest ${index + 1}`}
                        onClick={() => {
                          setLegalPrevDocIndex(legalDocIndex);
                          setLegalDirection(index >= legalDocIndex ? "next" : "prev");
                          setLegalDocIndex(index);
                          setLegalAnimationKey((k) => k + 1);
                        }}
                        className="h-2 w-2 rounded-full transition"
                        style={{ background: active ? "var(--accent)" : "var(--border-subtle)" }}
                      />
                    );
                  })}
                </div>
                <CarouselArrowButton
                  direction="prev"
                  ariaLabel="Previous legal digest"
                  onClick={() => {
                    setLegalPrevDocIndex(legalDocIndex);
                    setLegalDirection("prev");
                    setLegalDocIndex((prev) => (prev - 1 + legalDocsLoop.length) % legalDocsLoop.length);
                    setLegalAnimationKey((k) => k + 1);
                  }}
                />
                <CarouselArrowButton
                  direction="next"
                  ariaLabel="Next legal digest"
                  onClick={() => {
                    setLegalPrevDocIndex(legalDocIndex);
                    setLegalDirection("next");
                    setLegalDocIndex((prev) => (prev + 1) % legalDocsLoop.length);
                    setLegalAnimationKey((k) => k + 1);
                  }}
                />
              </div>
            ) : (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                {legalDigestDocs.reduce((acc, doc) => acc + doc.pages, 0)} pages simplified
              </span>
            )
          }
        />
        {legalDocsLoop.length > 0 && (
          <LegalDocRowCarousel
            items={legalDocsLoop}
            activeIndex={legalDocIndex}
            previousIndex={legalPrevDocIndex}
            animationKey={legalAnimationKey}
            direction={legalDirection}
            onOpen={setSelectedLegalDoc}
            onOpenAsset={openAssetFromTicker}
            onMouseEnter={() => setLegalHovering(true)}
            onMouseLeave={() => setLegalHovering(false)}
          />
        )}
      </Card>

    </>
  );

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <>
      <DashboardLayout header={header} left={left} right={right} scrollable />

      <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} onOpenAsset={openAssetFromTicker} />
      <LegalDocModal item={selectedLegalDoc} onClose={() => setSelectedLegalDoc(null)} onOpenAsset={openAssetFromTicker} />
      <AssetDetailModal
        ticker={selectedAssetTicker}
        initialTimeframe={assetModalTimeframe}
        onOpenAsset={openAssetFromTicker}
        onClose={() => setSelectedAssetTicker(null)}
      />

      <LocalTrendsSheet
        open={localTrendsOpen}
        onClose={() => setLocalTrendsOpen(false)}
        triggerRef={localTrendsTriggerRef}
      />

      {showResume && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--text-primary)]/20 px-4">
          <Card className="w-full max-w-xl" style={{ boxShadow: "var(--shadow-modal)" }}>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                Daily Digest Details
              </h3>
              <IconButton icon="✕" ariaLabel="Close" onClick={() => setShowResume(false)} />
            </div>
            <p className="mt-4 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
              Today your portfolio showed resilience despite crypto volatility. Equity exposure to AI
              continued to support returns, while macro risk remains centred on rates communication
              this week.
            </p>
          </Card>
        </div>
      )}

      <ChatFab onClick={() => setChatOpen(true)} />
      <ChatWidgetModal
        open={chatOpen}
        expanded={chatExpanded}
        messages={chatMessages}
        inputValue={chatInput}
        onChangeInput={setChatInput}
        onSend={handleSendChat}
        onClose={() => setChatOpen(false)}
        onToggleExpand={() => setChatExpanded((prev) => !prev)}
        onQuickPrompt={(prompt) => setChatInput(prompt)}
      />
    </>
  );
}
