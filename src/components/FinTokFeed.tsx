"use client";

import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─── N26 FinTok brand colors ────────────────────────────────────────────── */
const N26_MINT = "#27DBB1";
const N26_CHARCOAL = "#363533";
const N26_WHITE = "#ffffff";

/* ─── Vídeos: primero los que tú descargas (public/reels/), luego respaldo online ─── */
const FALLBACK_MP4 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

/** URLs por reel: [0] = tu vídeo descargado en public/reels/reel-X.mp4, [1+] = respaldo */
const VIDEO_URLS: readonly string[][] = [
  ["/reels/reel-1.mp4", "https://assets.mixkit.co/videos/40300/40300-720.mp4", "https://assets.mixkit.co/videos/preview/mixkit-financial-charts-on-a-tablet-screen-40300-large.mp4", FALLBACK_MP4],
  ["/reels/reel-2.mp4", "https://assets.mixkit.co/videos/40304/40304-720.mp4", "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-using-a-calculator-40304-large.mp4", FALLBACK_MP4],
  ["/reels/reel-3.mp4", "https://assets.mixkit.co/videos/40299/40299-720.mp4", "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blockchain-nodes-40299-large.mp4", FALLBACK_MP4],
];

/* ─── Comentarios por reel: cada uno relacionado con el vídeo adjunto (mismo índice) ─── */
/* Reel 0: vídeo pueblo nevado / escena (The Economist style) → contexto vida, decisiones, economía real */
/* Reel 1: vídeo de calculadora → texto sobre números, ahorro, tipos */
/* Reel 2: vídeo de nodos blockchain → texto sobre crypto / blockchain */
const FEED_ITEMS = [
  {
    id: "1",
    tiktokUrl: "https://vm.tiktok.com/ZNRPT3D9G/",
    headline: "Where money meets life 🏔️",
    summary: "Finance isn’t just charts—it’s the places we live and the choices we make. From savings to spending, what we do with our money shapes our day-to-day. Small steps, big picture.",
    source: "TikTok via N26 AI",
    topic: "Life & Money",
  },
  {
    id: "2",
    tiktokUrl: "https://vm.tiktok.com/ZNRPwewJ9/",
    headline: "Crunching the numbers 🧮",
    summary: "Savings rates and compound interest: a small rate difference adds up. Use the maths to compare 1Y vs 2Y terms and see what you could earn before the next ECB move.",
    source: "TikTok via N26 AI",
    topic: "Savings",
  },
  {
    id: "3",
    tiktokUrl: "https://vm.tiktok.com/ZNRPwMcBV/",
    headline: "Behind crypto: the blockchain 🔗",
    summary: "What you see here are nodes in a network. Your crypto moves through them; no single company controls it. New spot ETFs use the same rails—regulated access to the same technology.",
    source: "TikTok via N26 AI",
    topic: "Blockchain",
  },
] as const;

/* ─── Un vídeo por pantalla: nuestro vídeo (TikTok no permite embed en la web, solo en app) ─── */
function FeedSlide({
  item,
  isActive,
  onInView,
  scrollRoot,
  index,
}: {
  item: (typeof FEED_ITEMS)[number];
  isActive: boolean;
  onInView: (i: number) => void;
  scrollRoot: React.RefObject<HTMLDivElement | null>;
  index: number;
}) {
  const slideRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(slideRef, { amount: 0.5, root: scrollRoot });
  const urls = VIDEO_URLS[index] ?? [FALLBACK_MP4];
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const currentUrl = urls[currentUrlIndex] ?? FALLBACK_MP4;

  if (isInView) onInView(index);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => {
      video.play().catch(() => {});
    };
    if (video.readyState >= 2) play();
    else {
      video.addEventListener("loadeddata", play);
      video.addEventListener("canplay", play);
      return () => {
        video.removeEventListener("loadeddata", play);
        video.removeEventListener("canplay", play);
      };
    }
  }, [currentUrl]);

  const handleError = useCallback(() => {
    setCurrentUrlIndex((i) => (i + 1 < urls.length ? i + 1 : i));
  }, [urls.length]);

  return (
    <div
      ref={slideRef}
      className="relative flex min-w-full flex-shrink-0 snap-start snap-always overflow-hidden rounded-2xl bg-black"
      style={{
        height: "var(--slide-h)",
        minHeight: "var(--slide-h)",
        backgroundColor: "#000",
      }}
    >
      {/* Capa 1: vídeo de respaldo (solo se ve si el embed de TikTok no carga) */}
      <video
        ref={videoRef}
        key={currentUrl}
        src={currentUrl}
        preload="auto"
        playsInline
        muted={muted}
        loop
        autoPlay
        className="absolute inset-0 z-0 h-full w-full object-contain"
        style={{ minHeight: "100%", minWidth: "100%", backgroundColor: "#000" }}
        onError={handleError}
        aria-hidden
      />

      {/* Gradiente suave para leer título y descripción */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/20 to-transparent"
        aria-hidden
      />

      {/* Botón volumen de este vídeo (cada reel tiene el suyo) */}
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        className="absolute top-3 right-3 z-[2] flex h-10 w-10 items-center justify-center rounded-full transition hover:opacity-90"
        style={{ background: "rgba(0,0,0,0.5)", color: N26_WHITE }}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {/* Solo título + descripción, minimalista */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[2] p-4"
        initial={{ opacity: 0, y: 8 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.8, y: 4 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <h3
          className="text-base font-bold leading-tight"
          style={{ color: N26_WHITE }}
        >
          {item.headline}
        </h3>
        <p
          className="mt-1 line-clamp-2 text-[13px] leading-snug"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          {item.summary}
        </p>
      </motion.div>
    </div>
  );
}

/* ─── Main feed component ─────────────────────────────────────────────────── */
export function FinTokFeed({ fullScreen = false }: { fullScreen?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSlideInView = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  /* Un vídeo por pantalla: altura del feed = altura de un slide */
  const feedHeight = fullScreen ? "calc(100vh - 100px)" : "min(75vh, 560px)";
  const feedMinHeight = fullScreen ? 500 : 360;
  const feedMaxWidth = fullScreen ? "min(520px, 94vw)" : "360px";
  const slideHeight = fullScreen ? "calc(100vh - 100px)" : "33.333%";
  const innerHeight = fullScreen ? "calc(3 * (100vh - 100px))" : "300%";

  return (
    <div className="relative flex h-full max-h-full w-full flex-col items-center gap-3">
      {/* Feed: vídeo + título + descripción + volumen por vídeo */}
      <div
        ref={scrollRef}
        className="fintok-scroll w-full shrink-0 snap-y snap-mandatory overflow-y-auto overflow-x-hidden rounded-xl [scrollbar-width:none]"
        style={{
          width: feedMaxWidth,
          maxWidth: feedMaxWidth,
          height: feedHeight,
          minHeight: feedMinHeight,
          maxHeight: fullScreen ? "calc(100vh - 100px)" : undefined,
          scrollBehavior: "smooth",
          ["--slide-h" as string]: slideHeight,
        }}
      >
        <style>{` .fintok-scroll::-webkit-scrollbar { display: none; } `}</style>
        <div
          className="flex flex-col"
          style={{ minHeight: innerHeight, height: innerHeight }}
        >
          {FEED_ITEMS.map((item, index) => (
            <FeedSlide
              key={item.id}
              item={item}
              index={index}
              isActive={activeIndex === index}
              onInView={handleSlideInView}
              scrollRoot={scrollRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
