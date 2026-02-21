"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { ChatFab } from "@/components/ChatFab";
import { ChatMessage, ChatWidgetModal } from "@/components/ChatWidgetModal";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ExplainModal } from "@/components/ExplainModal";
import { HoldingsModeToggle, HoldingsTable, HoldingsViewMode } from "@/components/HoldingsTable";
import { IconButton } from "@/components/IconButton";
import { ListRow } from "@/components/ListRow";
import { NewsModal } from "@/components/NewsModal";
import { Pill } from "@/components/Pill";
import { ProfileMenu } from "@/components/ProfileMenu";
import { SectionHeader } from "@/components/SectionHeader";
import { SegmentedControl } from "@/components/SegmentedControl";
import { SparklineChart } from "@/components/SparklineChart";
import { DashboardNewsItem, globalNews, personalizedNewsSeed } from "@/lib/mock/news";
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
  getDailyTipForProfile,
  getWhyForYou
} from "@/lib/mock/profile";

/* ─── Inline news list (3 items, using design system) ───────────────────── */
function NewsListVertical({
  items,
  onOpen,
  onEli10,
  whyForYou
}: {
  items: DashboardNewsItem[];
  onOpen: (item: DashboardNewsItem) => void;
  onEli10: (item: DashboardNewsItem) => void;
  whyForYou?: (item: DashboardNewsItem) => string;
}) {
  return (
    <div className="space-y-2">
      {items.slice(0, 3).map((item) => (
        <div
          key={item.id}
          className="row-inset cursor-pointer"
          onClick={() => onOpen(item)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onOpen(item)}
        >
          <p style={{ color: "var(--text-tertiary)" }} className="text-[11px]">
            {item.source} · {item.timeAgo}
          </p>
          <p
            className="mt-1 clamp-2 text-sm font-semibold leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {item.title}
          </p>
          {whyForYou && (
            <p className="mt-1 text-[11px]" style={{ color: "var(--accent-dark)" }}>
              {whyForYou(item)}
            </p>
          )}
          <div
            className="mt-2.5 flex flex-wrap items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            {item.tags.slice(0, 2).map((tag) => (
              <Pill key={tag} label={`#${tag}`} />
            ))}
            <div className="ml-auto">
              <IconButton
                icon="💡"
                label="ELI10"
                variant="accent"
                onClick={() => onEli10(item)}
              />
            </div>
          </div>
        </div>
      ))}
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
  const [showResume, setShowResume] = useState(false);
  const [selectedNews, setSelectedNews] = useState<DashboardNewsItem | null>(null);
  const [eli10News, setEli10News] = useState<DashboardNewsItem | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
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

  const dailyTip = useMemo(() => getDailyTipForProfile(profile), [profile]);

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
<<<<<<< HEAD
    <header className="relative rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-700">
            N26 Companion
          </p>
          <h1 className="text-lg font-semibold text-slate-900">Home Summary</h1>
        </div>
        <div className="relative flex items-center gap-3">
          <button
            type="button"
            aria-label="Open profile settings"
            onClick={() => setShowProfile((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-700">
              P
            </span>
            <span className="text-left leading-tight">
              <span className="block">{profile.name}</span>
              <span className="block text-[11px] text-slate-500">@{profile.username}</span>
            </span>
          </button>

=======
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
>>>>>>> aitor
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
<<<<<<< HEAD
        <p className="text-xs text-slate-500">Total Balance</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">
          {new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
            totalBalanceByRange[timeframe]
          )}
        </p>
        <div className="mt-2">
          <SegmentedControl value={timeframe} onChange={setTimeframe} />
        </div>
        <SparklineChart points={chartSeriesByRange[timeframe]} />
      </Card>

      <Card>
        <label className="block text-xs font-medium text-slate-700">Quick search</label>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search stocks, crypto..."
          className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
        />
        {searchResults.length > 0 && (
          <div className="mt-2 space-y-1">
            {searchResults.slice(0, 4).map((item) => (
              <div key={item.symbol} className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs">
                <p className="text-slate-700">
                  {item.name} <span className="text-slate-500">({item.symbol})</span>
=======
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
>>>>>>> aitor
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
            onViewMore={() => window.alert("Holdings page coming soon")}
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

    </>
  );

  /* ── Right column ────────────────────────────────────────────────────────── */
  const right = (
    <>
      {/* Hero: For you today */}
      <Card>
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
            { icon: "🏦", text: "Macro", value: "ECB in 3 days" },
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
        <button
          type="button"
          onClick={() => setShowResume(true)}
<<<<<<< HEAD
          className="mt-2 rounded-lg border border-teal-600 px-3 py-1.5 text-xs text-teal-700 hover:bg-teal-50"
=======
          className="mt-5 w-full rounded-[var(--radius-md)] py-2.5 text-sm font-semibold transition hover:opacity-90"
          style={{ background: "var(--accent)", color: "var(--text-inverse)" }}
>>>>>>> aitor
        >
          See full digest
        </button>
      </Card>

      {/* Global News */}
      <Card>
        <SectionHeader title="Global News" />
        <NewsListVertical
          items={globalNews}
          onOpen={setSelectedNews}
          onEli10={setEli10News}
        />
      </Card>

      {/* Personalized News */}
      <Card>
        <SectionHeader title="Personalized News" eyebrow="Curated for you" />
        <NewsListVertical
          items={personalizedNews}
          onOpen={setSelectedNews}
          onEli10={setEli10News}
          whyForYou={(item) => getWhyForYou(profile.interests, item.tags)}
        />
      </Card>

      {/* Daily Tip */}
      <Card>
<<<<<<< HEAD
        <h2 className="text-base font-semibold text-slate-900">Daily Tip</h2>
        <p className="mt-1.5 text-xs leading-5 text-slate-700 clamp-2">{dailyTip}</p>
        <button
          type="button"
          className="mt-2 rounded-lg border border-teal-600 px-3 py-1.5 text-xs text-teal-700 hover:bg-teal-50"
        >
          Learn more
        </button>
=======
        <SectionHeader eyebrow="Tip of the day" title="Daily Tip" />
        <p className="text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
          {dailyTip}
        </p>
        <IconButton
          icon="📚"
          label="Learn more"
          variant="accent"
          className="mt-4"
        />
>>>>>>> aitor
      </Card>
    </>
  );

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <>
      <DashboardLayout header={header} left={left} right={right} scrollable />

      <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />
      <ExplainModal item={eli10News} onClose={() => setEli10News(null)} />

      {showResume && (
<<<<<<< HEAD
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/30 px-4">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
=======
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--text-primary)]/20 px-4">
          <Card className="w-full max-w-xl" style={{ boxShadow: "var(--shadow-modal)" }}>
>>>>>>> aitor
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
