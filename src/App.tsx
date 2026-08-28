import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SLIDES, TOTAL_SLIDES } from "./slides/slides";
import { exportDeckToPdf, SLIDE_W, SLIDE_H } from "./lib/pdf";
import {
  IconArrowLeft,
  IconArrowRight,
  IconDownload,
  IconGrid,
  IconCheck,
  IconPlay,
} from "./components/icons";

/* deterministic ambient particles */
const PARTICLES = [
  { x: "6%", y: "18%", s: 5, c: "#f2a93b", d: "0s" },
  { x: "12%", y: "74%", s: 4, c: "#43c6ae", d: "1.2s" },
  { x: "22%", y: "38%", s: 3, c: "#8ca0b4", d: "2.1s" },
  { x: "31%", y: "86%", s: 5, c: "#f0654f", d: "0.7s" },
  { x: "44%", y: "12%", s: 4, c: "#8ca0b4", d: "1.8s" },
  { x: "58%", y: "22%", s: 3, c: "#f2a93b", d: "0.4s" },
  { x: "66%", y: "80%", s: 5, c: "#43c6ae", d: "2.4s" },
  { x: "74%", y: "42%", s: 4, c: "#8ca0b4", d: "1.5s" },
  { x: "83%", y: "14%", s: 5, c: "#f0654f", d: "0.9s" },
  { x: "90%", y: "66%", s: 4, c: "#f2a93b", d: "1.1s" },
  { x: "38%", y: "58%", s: 3, c: "#43c6ae", d: "2.8s" },
  { x: "94%", y: "36%", s: 3, c: "#8ca0b4", d: "0.2s" },
];

type PdfState = { phase: "idle" } | { phase: "working"; done: number; total: number } | { phase: "ok" } | { phase: "err" };

export default function App() {
  const [active, setActive] = useState(0);
  const [overview, setOverview] = useState(false);
  const [pdf, setPdf] = useState<PdfState>({ phase: "idle" });
  const [scale, setScale] = useState(0.4);
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  const rootRef = useRef<HTMLDivElement>(null);
  const pdfStageRef = useRef<HTMLDivElement>(null);
  const wheelLock = useRef(0);
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number) => {
    setActive(Math.max(0, Math.min(TOTAL_SLIDES - 1, i)));
  }, []);
  const next = useCallback(() => setActive((a) => Math.min(TOTAL_SLIDES - 1, a + 1)), []);
  const prev = useCallback(() => setActive((a) => Math.max(0, a - 1)), []);

  /* responsive stage scale */
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setVp({ w, h });
      const availW = w - 48;
      const availH = h - 150; /* header + footer chrome */
      setScale(Math.min(availW / SLIDE_W, availH / SLIDE_H));
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const onControl = tag === "BUTTON" || tag === "INPUT" || tag === "TEXTAREA";
      if (
        (e.key === " " || e.key === "Enter") &&
        onControl
      ) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown" || e.key === "Enter") {
        e.preventDefault();
        setOverview(false);
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp" || e.key === "Backspace") {
        e.preventDefault();
        setOverview(false);
        prev();
      } else if (e.key === "Home") {
        setOverview(false);
        go(0);
      } else if (e.key === "End") {
        setOverview(false);
        go(TOTAL_SLIDES - 1);
      } else if (e.key === "o" || e.key === "O" || e.key === "щ" || e.key === "Щ" || e.key === "Escape") {
        setOverview((v) => !v);
      } else if (e.key === "f" || e.key === "F" || e.key === "а" || e.key === "А") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go]);

  /* wheel navigation (throttled) */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (overview) return;
      const now = Date.now();
      if (now - wheelLock.current < 650) return;
      if (Math.abs(e.deltaY) < 34) return;
      wheelLock.current = now;
      if (e.deltaY > 0) next();
      else prev();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev, overview]);

  const toggleFullscreen = () => {
    try {
      if (document.fullscreenElement) void document.exitFullscreen();
      else void rootRef.current?.requestFullscreen();
    } catch {
      /* noop */
    }
  };

  /* pdf export */
  const onDownload = async () => {
    if (pdf.phase === "working" || !pdfStageRef.current) return;
    setPdf({ phase: "working", done: 0, total: TOTAL_SLIDES });
    try {
      await exportDeckToPdf(pdfStageRef.current, (done, total) => setPdf({ phase: "working", done, total }));
      setPdf({ phase: "ok" });
    } catch (err) {
      console.error(err);
      setPdf({ phase: "err" });
    }
    setTimeout(() => setPdf({ phase: "idle" }), 2600);
  };

  const ActiveSlide = useMemo(() => SLIDES[active].Component, [active]);

  /* overview tile sizing */
  const overviewCols = vp.w >= 1680 ? 4 : vp.w >= 1100 ? 3 : 2;
  const tileW = Math.min(460, (vp.w - 96 - (overviewCols - 1) * 20) / overviewCols);
  const tileScale = tileW / SLIDE_W;

  return (
    <div
      ref={rootRef}
      className="relative w-screen h-screen overflow-hidden bg-ink text-paper select-none"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (dx < -55) next();
        else if (dx > 55) prev();
        touchX.current = null;
      }}
    >
      {/* ambient layers */}
      <div className="absolute inset-0 bg-blueprint pointer-events-none" />
      <div className="absolute inset-0 bg-glow-amber pointer-events-none" />
      <div className="absolute inset-0 bg-glow-teal pointer-events-none" />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full pointer-events-none floaty"
          style={{
            left: p.x,
            top: p.y,
            width: p.s,
            height: p.s,
            background: p.c,
            opacity: 0.5,
            animationDelay: p.d,
            boxShadow: `0 0 ${p.s * 3}px ${p.c}66`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      {/* ============ header chrome ============ */}
      <header className="absolute top-0 left-0 right-0 z-30 h-[64px] flex items-center justify-between px-6 border-b border-line/60 bg-ink/80">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-9 h-9 border-2 border-amber flex items-center justify-center shrink-0 relative">
            <span className="font-display font-extrabold text-[15px] text-amber">Э</span>
            <span className="absolute -bottom-[5px] -right-[5px] w-2 h-2 bg-coral" />
          </div>
          <div className="leading-none min-w-0">
            <div className="font-display font-bold text-[17px] tracking-wide">
              ETICA<span className="text-amber">·</span>ННГУ
            </div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim mt-1 truncate max-w-[420px]">
              Генеративный ИИ в рекламе · этические риски
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 flex-1 max-w-[430px] mx-8">
          <div className="flex-1 h-[3px] bg-line/50 relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-amber transition-all duration-300"
              style={{ width: `${((active + 1) / TOTAL_SLIDES) * 100}%` }}
            />
          </div>
          <div className="font-mono text-[13px] text-muted tracking-[0.15em] shrink-0">
            <span className="text-paper font-bold">{String(active + 1).padStart(2, "0")}</span>
            <span className="text-dim"> / {TOTAL_SLIDES}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOverview((v) => !v)}
            className={`btn-chrome flex items-center gap-2.5 px-4 h-10 border font-mono text-[13px] tracking-[0.12em] uppercase cursor-pointer ${
              overview ? "border-amber text-amber bg-amber/10" : "border-line text-muted hover:text-paper hover:border-muted"
            }`}
            title="Обзор всех слайдов (O)"
          >
            <IconGrid className="w-4 h-4" />
            Обзор
          </button>
          <button
            onClick={toggleFullscreen}
            className="btn-chrome hidden sm:flex items-center gap-2.5 px-4 h-10 border border-line text-muted hover:text-paper hover:border-muted font-mono text-[13px] tracking-[0.12em] uppercase cursor-pointer"
            title="Во весь экран (F)"
          >
            <IconPlay className="w-4 h-4" />
            Экран
          </button>
          <button
            onClick={onDownload}
            disabled={pdf.phase === "working"}
            className={`btn-chrome flex items-center gap-2.5 px-5 h-10 border font-mono text-[13px] tracking-[0.12em] uppercase cursor-pointer ${
              pdf.phase === "ok"
                ? "border-teal text-teal bg-teal/10"
                : pdf.phase === "err"
                  ? "border-coral text-coral bg-coral/10"
                  : "border-amber text-ink bg-amber hover:bg-amber2 font-semibold"
            }`}
            title="Сохранить всю презентацию в PDF"
          >
            {pdf.phase === "working" ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                {pdf.done}/{pdf.total}
              </>
            ) : pdf.phase === "ok" ? (
              <>
                <IconCheck className="w-4 h-4" /> Сохранено
              </>
            ) : pdf.phase === "err" ? (
              "Ошибка — ещё раз"
            ) : (
              <>
                <IconDownload className="w-4 h-4" /> Скачать PDF
              </>
            )}
          </button>
        </div>
      </header>

      {/* ============ stage ============ */}
      <main className="absolute inset-0 flex items-center justify-center" style={{ padding: "76px 24px 64px" }}>
        <div style={{ width: SLIDE_W * scale, height: SLIDE_H * scale }}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: SLIDE_W, height: SLIDE_H }}>
            <div key={active} className="anim-pop w-full h-full" style={{ ["--d" as string]: "0ms" }}>
              <ActiveSlide />
            </div>
          </div>
        </div>
      </main>

      {/* ============ footer chrome ============ */}
      <footer className="absolute bottom-0 left-0 right-0 z-30 h-[52px] flex items-center gap-5 px-6 border-t border-line/60 bg-ink/80">
        <button
          onClick={prev}
          disabled={active === 0}
          className="btn-chrome w-10 h-10 border border-line flex items-center justify-center text-muted hover:text-paper hover:border-amber disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          title="Назад (←)"
        >
          <IconArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          disabled={active === TOTAL_SLIDES - 1}
          className="btn-chrome w-10 h-10 border border-amber bg-amber text-ink hover:bg-amber2 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          title="Вперёд (→)"
        >
          <IconArrowRight className="w-5 h-5" />
        </button>

        <div className="hidden lg:block font-mono text-[13px] tracking-[0.16em] uppercase text-muted truncate">
          <span className="text-amber mr-3">{String(active + 1).padStart(2, "0")}</span>
          {SLIDES[active].nav}
        </div>

        <div className="flex-1 flex items-center gap-[5px]">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              title={`${String(i + 1).padStart(2, "0")} · ${s.nav}`}
              className="group flex-1 h-5 flex items-center cursor-pointer"
            >
              <span
                className={`w-full h-[4px] transition-all duration-200 ${
                  i === active ? "bg-amber h-[6px]" : i < active ? "bg-amber/40 group-hover:bg-amber/70" : "bg-line/60 group-hover:bg-muted"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="hidden xl:block font-mono text-[12px] text-dim tracking-wider whitespace-nowrap">
          ← → листать · O обзор · F экран
        </div>
      </footer>

      {/* ============ overview overlay ============ */}
      {overview && (
        <div className="absolute inset-0 z-40 bg-ink/[0.97] overflow-y-auto" onClick={() => setOverview(false)}>
          <div className="min-h-full px-12 py-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="font-mono text-[13px] tracking-[0.22em] uppercase text-amber">Обзор deck</div>
                <h2 className="font-display font-extrabold uppercase text-[34px] mt-2">
                  Все слайды <span className="text-dim">· {TOTAL_SLIDES}</span>
                </h2>
              </div>
              <button
                onClick={() => setOverview(false)}
                className="btn-chrome px-5 h-11 border border-line text-muted hover:text-paper hover:border-amber font-mono text-[13px] tracking-[0.12em] uppercase cursor-pointer"
              >
                Закрыть · O
              </button>
            </div>
            <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${overviewCols}, minmax(0,1fr))` }}>
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => {
                    go(i);
                    setOverview(false);
                  }}
                  className={`tile-thumb text-left border bg-ink2 cursor-pointer relative ${
                    i === active ? "border-amber" : "border-line"
                  }`}
                >
                  <div style={{ width: "100%", height: tileW * (SLIDE_H / SLIDE_W), overflow: "hidden" }}>
                    <div
                      style={{
                        width: SLIDE_W,
                        height: SLIDE_H,
                        transform: `scale(${tileScale})`,
                        transformOrigin: "top left",
                      }}
                    >
                      <s.Component />
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5 border-t border-line/70">
                    <span className="font-mono text-[12px] tracking-[0.14em] uppercase truncate text-muted">
                      <span className={i === active ? "text-amber" : "text-dim"}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="mx-2 text-dim">·</span>
                      {s.nav}
                    </span>
                    {i === active && <span className="w-2 h-2 bg-amber shrink-0" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============ pdf working overlay ============ */}
      {pdf.phase === "working" && (
        <div className="absolute inset-0 z-50 bg-ink/90 flex items-center justify-center">
          <div className="border border-line bg-ink2 px-14 py-12 text-center relative">
            <span className="corner-tick tl" />
            <span className="corner-tick br" />
            <div className="w-12 h-12 mx-auto border-[3px] border-line border-t-amber rounded-full animate-spin" />
            <div className="font-display font-bold uppercase text-[22px] mt-7">Формируем PDF…</div>
            <div className="font-mono text-[14px] tracking-[0.18em] uppercase text-muted mt-3">
              Слайд {pdf.done} / {pdf.total}
            </div>
            <div className="w-[300px] h-[5px] bg-line/50 mt-6 overflow-hidden">
              <div
                className="h-full bg-amber transition-all duration-200"
                style={{ width: `${(pdf.done / pdf.total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ============ offscreen pdf stage (full-fidelity 1920×1080) ============ */}
      <div ref={pdfStageRef} className="pdf-stage" data-pdf-stage aria-hidden>
        {SLIDES.map((s, i) => (
          <div key={s.id} data-pdf-slide style={{ width: SLIDE_W, height: SLIDE_H }}>
            <s.Component />
          </div>
        ))}
      </div>
    </div>
  );
}
