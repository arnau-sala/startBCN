"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { ChatFab } from "@/components/ChatFab";
import { ChatMessage, ChatWidgetModal } from "@/components/ChatWidgetModal";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ExplainModal } from "@/components/ExplainModal";
import { HoldingsTable } from "@/components/HoldingsTable";
import { NewsCarousel } from "@/components/NewsCarousel";
import { NewsModal } from "@/components/NewsModal";
import { ProfileMenu } from "@/components/ProfileMenu";
import { SegmentedControl } from "@/components/SegmentedControl";
import { SparklineChart } from "@/components/SparklineChart";
import { DashboardNewsItem, globalNews, personalizedNewsSeed } from "@/lib/mock/news";
import {
  chartSeriesByRange,
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

export default function ForYouPage() {
  const [profile, setProfile] = useState<FrontendProfileState>(defaultFrontendProfile);
  const [timeframe, setTimeframe] = useState<Timeframe>("day");
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [globalIndex, setGlobalIndex] = useState(0);
  const [personalIndex, setPersonalIndex] = useState(0);
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
      if (profile.interests.includes("stocks") && tags.some((tag) => ["stocks", "ai", "tech", "etf"].includes(tag))) score += 3;
      if (profile.interests.includes("savings") && tags.some((tag) => ["savings", "rates"].includes(tag))) score += 2;
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

  const header = (
    <header className="relative rounded-2xl border border-[var(--n26-border)] bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--n26-teal-dark)]">
            N26 Companion
          </p>
          <h1 className="text-lg font-semibold text-slate-900">Home Summary</h1>
        </div>
        <div className="relative flex items-center gap-3">
          <button
            type="button"
            aria-label="Open profile settings"
            onClick={() => setShowProfile((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl border border-[var(--n26-border)] px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--n26-chip-bg)] text-xs font-semibold text-[var(--n26-chip-text)]">
              P
            </span>
            {profile.name}
          </button>

          <ProfileMenu
            open={showProfile}
            profile={profile}
            onClose={() => setShowProfile(false)}
            onSave={(nextProfile) => setProfile(nextProfile)}
          />
        </div>
      </div>
    </header>
  );

  const left = (
    <>
      <Card>
        <p className="text-xs text-slate-500">Total Balance</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">
          {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
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
          className="mt-1.5 w-full rounded-lg border border-[var(--n26-border)] px-3 py-1.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--n26-teal)]"
        />
        {searchResults.length > 0 && (
          <div className="mt-2 space-y-1">
            {searchResults.slice(0, 4).map((item) => (
              <div key={item.symbol} className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs">
                <p className="text-slate-700">
                  {item.name} <span className="text-slate-500">({item.symbol})</span>
                </p>
                <span className={item.changePct >= 0 ? "text-emerald-600" : "text-rose-600"}>
                  {item.changePct >= 0 ? "+" : ""}
                  {item.changePct.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-base font-semibold text-slate-900">Holdings</h2>
        <HoldingsTable
          items={holdings.slice(0, 5)}
          totalInvested={totalInvested}
          onViewMore={() => window.alert("Holdings page coming soon")}
        />
      </Card>
    </>
  );

  const right = (
    <>
      <Card>
        <h2 className="text-base font-semibold text-slate-900">Daily Resume</h2>
        <ul className="mt-2 list-disc space-y-0.5 pl-4 text-xs text-slate-700">
          <li>Your portfolio is +0.7% today</li>
          <li>Top mover: BTC -3.1%</li>
          <li>Macro: ECB meeting in 3 days</li>
          <li className="clamp-1">Watchlist focus: NVDA earnings tone remains strong</li>
        </ul>
        <button
          type="button"
          onClick={() => setShowResume(true)}
          className="mt-2 rounded-lg border border-[var(--n26-teal)] px-3 py-1.5 text-xs text-[var(--n26-teal-dark)] hover:bg-[var(--n26-chip-bg)]"
        >
          See details
        </button>
      </Card>

      <Card>
        <NewsCarousel
          title="Global News"
          items={globalNews}
          index={globalIndex}
          onPrev={() => setGlobalIndex((prev) => (prev - 1 + globalNews.length) % globalNews.length)}
          onNext={() => setGlobalIndex((prev) => (prev + 1) % globalNews.length)}
          onOpen={setSelectedNews}
          onEli10={setEli10News}
        />
      </Card>

      <Card>
        <NewsCarousel
          title="Personalized News"
          items={personalizedNews}
          index={personalIndex}
          onPrev={() =>
            setPersonalIndex((prev) => (prev - 1 + personalizedNews.length) % personalizedNews.length)
          }
          onNext={() => setPersonalIndex((prev) => (prev + 1) % personalizedNews.length)}
          onOpen={setSelectedNews}
          onEli10={setEli10News}
          whyForYou={(item) => getWhyForYou(profile.interests, item.tags)}
        />
      </Card>

      <Card>
        <h2 className="text-base font-semibold text-slate-900">Daily Tip</h2>
        <p className="mt-1.5 text-xs leading-5 text-slate-700 clamp-2">{dailyTip}</p>
        <button
          type="button"
          className="mt-2 rounded-lg border border-[var(--n26-teal)] px-3 py-1.5 text-xs text-[var(--n26-teal-dark)] hover:bg-[var(--n26-chip-bg)]"
        >
          Learn more
        </button>
      </Card>
    </>
  );

  return (
    <>
      <DashboardLayout header={header} left={left} right={right} scrollable />

      <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />
      <ExplainModal item={eli10News} onClose={() => setEli10News(null)} />

      {showResume && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/30 px-4">
          <div className="w-full max-w-xl rounded-2xl border border-[var(--n26-border)] bg-white p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Daily Resume Details</h3>
              <button type="button" onClick={() => setShowResume(false)} className="text-slate-500 hover:text-slate-700">
                ✕
              </button>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Today your portfolio showed resilience despite crypto volatility. Equity exposure to AI continued to support returns, while macro risk remains centered on rates communication this week.
            </p>
          </div>
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
