import React from "react";
import {
  IconDeception,
  IconManipulation,
  IconData,
  IconCopyright,
  IconBias,
  IconBoundary,
  IconShield,
  IconScale,
  IconSpark,
  IconTimer,
  IconMic,
} from "../components/icons";

export const TOTAL_SLIDES = 15;

/* ================= shared frame ================= */

type FrameProps = {
  index: number;
  kicker: string;
  accent?: string;
  children: React.ReactNode;
  ghost?: string;
};

export function SlideFrame({ index, kicker, accent = "#f2a93b", children, ghost }: FrameProps) {
  const num = String(index).padStart(2, "0");
  return (
    <div className="slide-frame w-[1920px] h-[1080px] overflow-hidden font-body text-paper">
      <span className="corner-tick tl" style={{ ["--tick-color" as string]: accent }} />
      <span className="corner-tick tr" style={{ ["--tick-color" as string]: accent }} />
      <span className="corner-tick bl" style={{ ["--tick-color" as string]: accent }} />
      <span className="corner-tick br" style={{ ["--tick-color" as string]: accent }} />

      {/* ghost number */}
      <div
        aria-hidden
        className="absolute -right-6 -top-16 font-display font-extrabold select-none"
        style={{ fontSize: 340, lineHeight: 1, color: "rgba(232,237,243,0.035)" }}
      >
        {ghost ?? num}
      </div>

      {/* header row */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-16 pt-10">
        <div className="anim-left flex items-center gap-4 font-mono text-[15px] tracking-[0.22em] uppercase text-muted">
          <span className="inline-block w-8 h-[2px]" style={{ background: accent }} />
          <span>{kicker}</span>
        </div>
        <div className="anim-rise font-mono text-[15px] tracking-[0.22em] text-dim">
          {num} / {TOTAL_SLIDES}
        </div>
      </div>

      <div className="absolute inset-0 px-16 pt-28 pb-16">{children}</div>

      {/* footer row */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-16 pb-7 font-mono text-[13px] tracking-[0.18em] uppercase text-dim">
        <span>ETICA · Этика ИИ в медиа</span>
        <span className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          Генеративный ИИ в рекламе
        </span>
        <span>ННГУ им. Н.И. Лобачевского</span>
      </div>
    </div>
  );
}

export function Kicker({ children, color = "#f2a93b" }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="font-mono text-[16px] tracking-[0.24em] uppercase text-muted flex items-center gap-3">
      <span className="inline-block w-2 h-2" style={{ background: color }} />
      {children}
    </div>
  );
}

export function Display({
  children,
  size = 76,
  className = "",
  d = 0,
}: {
  children: React.ReactNode;
  size?: number;
  className?: string;
  d?: number;
}) {
  return (
    <h2
      className={`anim-rise font-display font-bold uppercase leading-[1.06] tracking-tight ${className}`}
      style={{ fontSize: size, ["--d" as string]: `${d}ms` }}
    >
      {children}
    </h2>
  );
}

export function Mark({ text, color = "#f2a93b" }: { text: string; color?: string }) {
  return (
    <span className="relative inline-block px-2 -mx-1" style={{ color }}>
      {text}
      <span
        className="absolute left-0 right-0 bottom-[6%] h-[0.16em] -z-10"
        style={{ background: `${color}33` }}
      />
    </span>
  );
}

export function Bullet({
  children,
  d = 0,
  color = "#f2a93b",
  bold,
}: {
  children: React.ReactNode;
  d?: number;
  color?: string;
  bold?: React.ReactNode;
}) {
  return (
    <div className="anim-left flex items-start gap-5" style={{ ["--d" as string]: `${d}ms` }}>
      <span className="mt-[13px] inline-block w-[14px] h-[3px] shrink-0" style={{ background: color }} />
      <p className="text-[24px] leading-[1.5] text-paper/90">
        {bold ? (
          <>
            <span className="font-semibold text-paper">{bold}</span>
            {children}
          </>
        ) : (
          children
        )}
      </p>
    </div>
  );
}

export function Chip({
  children,
  color = "#8ca0b4",
  d = 0,
}: {
  children: React.ReactNode;
  color?: string;
  d?: number;
}) {
  return (
    <span
      className="anim-pop inline-flex items-center gap-2 px-4 py-2 border font-mono text-[15px] tracking-wider uppercase"
      style={{
        ["--d" as string]: `${d}ms`,
        borderColor: `${color}55`,
        color,
        background: `${color}0f`,
      }}
    >
      {children}
    </span>
  );
}

function TickerRow({ items }: { items: string[] }) {
  const row = items.map((t, i) => (
    <span key={i} className="flex items-center gap-6 shrink-0">
      <span className="font-mono text-[16px] tracking-[0.24em] uppercase text-dim">{t}</span>
      <span className="text-amber">✦</span>
    </span>
  ));
  return (
    <div className="overflow-hidden border-t border-line/70 py-4">
      <div className="ticker-track flex gap-6 w-max">
        {row}
        {row}
      </div>
    </div>
  );
}

/* ================= 01 · title ================= */

function NeuralSeal() {
  return (
    <div className="relative w-[560px] h-[560px]">
      <svg className="absolute inset-0 spin-slow" viewBox="0 0 560 560" fill="none">
        <circle cx="280" cy="280" r="266" stroke="#24364b" strokeWidth="1.5" strokeDasharray="4 10" />
        <circle cx="280" cy="280" r="218" stroke="#f2a93b" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="90 40 20 40" />
        <circle cx="280" cy="14" r="7" fill="#f2a93b" />
        <circle cx="280" cy="498" r="5" fill="#43c6ae" />
      </svg>
      <svg className="absolute inset-0 spin-slow-rev" viewBox="0 0 560 560" fill="none">
        <circle cx="280" cy="280" r="170" stroke="#43c6ae" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="30 22" />
        <circle cx="110" cy="280" r="5" fill="#43c6ae" />
        <circle cx="450" cy="280" r="6" fill="#f0654f" />
      </svg>
      <svg className="absolute inset-0" viewBox="0 0 560 560" fill="none">
        <circle cx="280" cy="280" r="112" stroke="#24364b" strokeWidth="1.5" />
        <path className="dash-flow" d="M280 168v224M168 280h224M201 201l158 158M359 201L201 359" stroke="#8ca0b4" strokeOpacity="0.35" strokeWidth="1.2" />
        <circle cx="280" cy="280" r="46" fill="#0c141d" stroke="#f2a93b" strokeWidth="2" />
        <text x="280" y="296" textAnchor="middle" fill="#f2a93b" fontFamily="Unbounded, sans-serif" fontSize="34" fontWeight="700">
          ИИ
        </text>
        <circle cx="280" cy="168" r="8" fill="#f0654f" />
        <circle cx="392" cy="280" r="8" fill="#f2a93b" />
        <circle cx="280" cy="392" r="8" fill="#43c6ae" />
        <circle cx="168" cy="280" r="8" fill="#8ca0b4" />
      </svg>
      <div className="absolute -left-10 top-16 floaty">
        <Chip color="#f0654f">deepfake</Chip>
      </div>
      <div className="absolute -right-4 top-40 floaty" style={{ animationDelay: "1.2s" }}>
        <Chip color="#f2a93b">кодекс этики</Chip>
      </div>
      <div className="absolute -left-6 bottom-24 floaty" style={{ animationDelay: "2s" }}>
        <Chip color="#43c6ae">152-ФЗ</Chip>
      </div>
      <div className="absolute right-2 bottom-6 floaty" style={{ animationDelay: "0.6s" }}>
        <Chip color="#8ca0b4">EU AI Act</Chip>
      </div>
    </div>
  );
}

export function SlideTitle() {
  return (
    <SlideFrame index={1} kicker="Публичное выступление · 15–20 минут" ghost="AI">
      <div className="flex h-full items-center gap-16">
        <div className="flex-1 min-w-0">
          <div className="anim-left" style={{ ["--d" as string]: "0ms" }}>
            <Kicker>ETICA · Центр применения ИИ в журналистике и МК</Kicker>
          </div>
          <h1
            className="anim-rise font-display font-extrabold uppercase leading-[1.02] tracking-tight mt-8"
            style={{ fontSize: 104, ["--d" as string]: "120ms" }}
          >
            Генеративный ИИ <br />
            <span className="text-amber">в рекламе</span>
          </h1>
          <p
            className="anim-rise font-display font-medium text-[34px] leading-snug text-paper/80 mt-7 max-w-[840px]"
            style={{ ["--d" as string]: "240ms" }}
          >
            Этические риски современных технологий — и где проходит{" "}
            <Mark text="грань между риском и прогрессом" />
          </p>

          <div className="anim-rise flex items-center gap-4 mt-11" style={{ ["--d" as string]: "360ms" }}>
            <Chip color="#f2a93b">
              <IconTimer className="w-4 h-4" /> 15–20 минут
            </Chip>
            <Chip color="#43c6ae">
              <IconMic className="w-4 h-4" /> 2 доклада
            </Chip>
            <Chip color="#8ca0b4">
              <IconSpark className="w-4 h-4" /> Discussion · Q&amp;A
            </Chip>
          </div>

          <div className="anim-rise mt-10 pt-8 border-t border-line/70 grid grid-cols-2 gap-8 max-w-[820px]" style={{ ["--d" as string]: "480ms" }}>
            <div>
              <div className="font-mono text-[13px] tracking-[0.22em] uppercase text-dim">Спикер 01</div>
              <div className="text-[22px] font-semibold mt-2">Макарова Людмила Сергеевна</div>
              <div className="text-[16px] text-muted leading-snug mt-1">
                Руководитель Центра применения ИИ в журналистике и массовой коммуникации ННГУ
              </div>
            </div>
            <div>
              <div className="font-mono text-[13px] tracking-[0.22em] uppercase text-dim">Спикер 02</div>
              <div className="text-[22px] font-semibold mt-2">Померанцев Илья Валерьевич</div>
              <div className="text-[16px] text-muted leading-snug mt-1">
                Руководитель проектов Центра ИИ ННГУ, член Комиссии по реализации кодекса этики Альянса ИИ в РФ
              </div>
            </div>
          </div>
        </div>

        <div className="anim-pop shrink-0" style={{ ["--d" as string]: "300ms" }}>
          <NeuralSeal />
        </div>
      </div>
      <div className="absolute left-16 right-16 bottom-14">
        <TickerRow
          items={[
            "дипфейки",
            "манипуляция",
            "авторское право",
            "персональные данные",
            "алгоритмическая предвзятость",
            "прозрачность",
            "AUTOFACTCHECK",
            "кодекс этики Альянса ИИ",
          ]}
        />
      </div>
    </SlideFrame>
  );
}

/* ================= 02 · agenda ================= */

function AgendaRow({
  n,
  time,
  title,
  speaker,
  note,
  color,
  d,
  last = false,
}: {
  n: string;
  time: string;
  title: string;
  speaker: string;
  note: string;
  color: string;
  d: number;
  last?: boolean;
}) {
  return (
    <div className="anim-left flex items-stretch gap-10" style={{ ["--d" as string]: `${d}ms` }}>
      <div className="flex flex-col items-center">
        <div
          className="w-[74px] h-[74px] shrink-0 flex items-center justify-center font-display font-bold text-[26px] border-2"
          style={{ borderColor: color, color }}
        >
          {n}
        </div>
        {!last && <div className="w-[2px] flex-1 my-3" style={{ background: `${color}44` }} />}
      </div>
      <div className={`flex-1 pb-10 ${last ? "" : ""}`}>
        <div className="flex items-baseline gap-6 flex-wrap">
          <span className="font-mono text-[16px] tracking-[0.2em] uppercase" style={{ color }}>
            {time}
          </span>
          <span className="font-mono text-[14px] tracking-wider uppercase text-dim">{note}</span>
        </div>
        <div className="font-display font-semibold text-[34px] leading-tight mt-3 max-w-[1240px]">{title}</div>
        <div className="text-[20px] text-muted mt-3">
          {speaker}
        </div>
      </div>
    </div>
  );
}

export function SlideAgenda() {
  return (
    <SlideFrame index={2} kicker="Программа выступления" accent="#43c6ae">
      <div className="flex gap-20 h-full">
        <div className="flex-1 min-w-0">
          <Display size={68} d={0}>
            Два доклада — <span className="text-teal">одна линия</span>:<br /> от инструмента к этике
          </Display>
          <div className="mt-14 space-y-2">
            <AgendaRow
              n="01"
              time="≈ 7–8 мин"
              title="AUTOFACTCHECK: правда по алгоритму — прикладной ИИ в медиа"
              speaker="Макарова Людмила Сергеевна · Центр применения ИИ в журналистике и МК ННГУ"
              note="прикладной инструмент"
              color="#f2a93b"
              d={150}
            />
            <AgendaRow
              n="02"
              time="≈ 7–8 мин"
              title="Этика ИИ в медиа: грань между риском и прогрессом"
              speaker="Померанцев Илья Валерьевич · Центр ИИ ННГУ, Комиссия по реализации кодекса этики Альянса ИИ в РФ"
              note="этическая рамка"
              color="#43c6ae"
              d={300}
            />
            <AgendaRow
              n="03"
              time="≈ 4–5 мин"
              title="Дискуссия и вопросы аудитории"
              speaker="Оба спикера · открытая сессия"
              note="Q&A"
              color="#f0654f"
              d={450}
              last
            />
          </div>
        </div>
        <div className="anim-rise w-[380px] shrink-0 flex flex-col justify-center" style={{ ["--d" as string]: "500ms" }}>
          <div className="border border-line bg-ink3/60 p-10 relative">
            <span className="corner-tick tl" style={{ ["--tick-color" as string]: "#43c6ae" }} />
            <span className="corner-tick br" style={{ ["--tick-color" as string]: "#43c6ae" }} />
            <div className="font-mono text-[14px] tracking-[0.22em] uppercase text-dim">Тайминг</div>
            <div className="font-display font-extrabold text-[96px] leading-none mt-4 text-teal">
              15–20<span className="text-[40px] align-top ml-2">мин</span>
            </div>
            <div className="mt-8 space-y-4">
              {[
                ["Доклад 01", "40%", "#f2a93b"],
                ["Доклад 02", "40%", "#43c6ae"],
                ["Q&A", "20%", "#f0654f"],
              ].map(([label, w, c]) => (
                <div key={label}>
                  <div className="flex justify-between font-mono text-[14px] uppercase tracking-wider text-muted mb-2">
                    <span>{label}</span>
                    <span style={{ color: c }}>{w}</span>
                  </div>
                  <div className="h-[6px] bg-line/40">
                    <div className="h-full bar-grow" style={{ width: w, background: c, ["--d" as string]: "700ms" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ================= 03 · numbers ================= */

function StatBlock({
  value,
  suffix,
  label,
  src,
  color,
  d,
}: {
  value: string;
  suffix?: string;
  label: string;
  src: string;
  color: string;
  d: number;
}) {
  return (
    <div className="anim-pop border border-line bg-ink3/50 p-10 flex flex-col justify-between min-h-[330px] relative group" style={{ ["--d" as string]: `${d}ms` }}>
      <span className="absolute top-0 left-0 w-full h-[3px]" style={{ background: color }} />
      <div>
        <div className="font-display font-extrabold leading-none" style={{ color }}>
          <span className="text-[92px]">{value}</span>
          {suffix && <span className="text-[44px] align-top ml-2">{suffix}</span>}
        </div>
        <p className="text-[22px] leading-snug text-paper/90 mt-6">{label}</p>
      </div>
      <div className="font-mono text-[13px] tracking-wider uppercase text-dim mt-6">Источник: {src}</div>
    </div>
  );
}

export function SlideNumbers() {
  return (
    <SlideFrame index={3} kicker="Контекст · почему сейчас" accent="#f2a93b">
      <Display size={68}>
        Реклама стала <Mark text="полигоном" /> генеративного ИИ
      </Display>
      <p className="anim-rise text-[24px] text-muted mt-5 max-w-[1200px]" style={{ ["--d" as string]: "150ms" }}>
        Маркетинг первым превратил генерацию контента в конвейер: здесь выше скорость, ниже порог входа — и
        быстрее всего проявляются этические сбои.
      </p>
      <div className="grid grid-cols-4 gap-7 mt-14">
        <StatBlock value="72" suffix="%" label="маркетологов в мире уже применяют генеративный ИИ в рабочих процессах" src="опросы HubSpot / Statista, 2024–25" color="#f2a93b" d={200} />
        <StatBlock value="×10" label="рост инцидентов мошенничества с дипфейками за 2022–2024 годы" src="Sumsub, Deloitte (оценки)" color="#f0654f" d={320} />
        <StatBlock value="30" suffix="%" label="ежегодный прирост рынка рекламы, создаваемой с помощью GenAI" src="отраслевые оценки, 2025" color="#43c6ae" d={440} />
        <StatBlock value="2026" label="вступают в силу нормы прозрачности EU AI Act для синтетического контента" src="EU AI Act, ст. 50" color="#8ca0b4" d={560} />
      </div>
      <div className="anim-rise mt-10 flex items-center gap-4 text-[17px] text-dim font-mono tracking-wider" style={{ ["--d" as string]: "700ms" }}>
        <span className="inline-block w-8 h-[2px] bg-coral" />
        Показатели округлены и приведены по открытым отраслевым исследованиям — порядок величин важнее точных цифр.
      </div>
    </SlideFrame>
  );
}

/* ================= 04 · capabilities ================= */

function PipelineNode({ label, sub, color, d, wide = false }: { label: string; sub: string; color: string; d: number; wide?: boolean }) {
  return (
    <div
      className={`anim-pop border-2 px-8 py-6 text-center ${wide ? "w-[420px]" : "w-[380px]"} bg-ink2 relative`}
      style={{ borderColor: color, ["--d" as string]: `${d}ms` }}
    >
      <div className="font-display font-bold text-[28px] uppercase" style={{ color }}>
        {label}
      </div>
      <div className="text-[17px] text-muted mt-2">{sub}</div>
      <span className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45" style={{ background: color }} />
    </div>
  );
}

const modalities = [
  { t: "Текст", d: "слоганы, сценарии роликов, посты, email-цепочки", c: "#f2a93b" },
  { t: "Изображения", d: "баннеры, продуктовые сцены, key visual под каждый сегмент", c: "#f2a93b" },
  { t: "Видео и звук", d: "клипы, озвучка, джинглы, голос бренда без студии", c: "#f0654f" },
  { t: "Синтетические персоны", d: "виртуальные инфлюенсеры и цифровые двойники звёзд", c: "#f0654f" },
  { t: "Гиперперсонализация", d: "тысячи версий креатива — поведенческие триггеры для каждого сегмента", c: "#43c6ae" },
];

export function SlideCapabilities() {
  return (
    <SlideFrame index={4} kicker="Технология · что умеет GenAI">
      <Display size={62}>
        От брифа до тысячи креативов — <span className="text-amber">за минуты</span>
      </Display>
      <div className="anim-rise mt-12 flex items-center justify-center gap-6" style={{ ["--d" as string]: "150ms" }}>
        <PipelineNode label="Бриф" sub="цель, аудитория, tone of voice" color="#8ca0b4" d={180} />
        <svg width="130" height="24" className="shrink-0">
          <line className="dash-flow" x1="0" y1="12" x2="130" y2="12" stroke="#f2a93b" strokeWidth="2.4" />
        </svg>
        <PipelineNode label="Генеративная модель" sub="LLM · диффузия · video / voice" color="#f2a93b" d={300} />
        <svg width="130" height="24" className="shrink-0">
          <line className="dash-flow" x1="0" y1="12" x2="130" y2="12" stroke="#43c6ae" strokeWidth="2.4" />
        </svg>
        <PipelineNode label="Креативы ×1000" sub="версии под сегменты и площадки" color="#43c6ae" d={420} />
      </div>
      <div className="grid grid-cols-5 gap-6 mt-14">
        {modalities.map((m, i) => (
          <div
            key={m.t}
            className="anim-rise border border-line bg-ink3/50 p-7 hover:border-amber/60 transition-colors relative"
            style={{ ["--d" as string]: `${500 + i * 110}ms` }}
          >
            <div className="font-mono text-[13px] tracking-[0.2em] uppercase mb-4" style={{ color: m.c }}>
              M·0{i + 1}
            </div>
            <div className="font-display font-semibold text-[24px] leading-tight">{m.t}</div>
            <p className="text-[17px] text-muted leading-snug mt-3">{m.d}</p>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

/* ================= 05 · benefits ================= */

function BenefitBar({ label, value, w, color, d }: { label: string; value: string; w: string; color: string; d: number }) {
  return (
    <div className="anim-left" style={{ ["--d" as string]: `${d}ms` }}>
      <div className="flex items-baseline justify-between">
        <span className="text-[23px] font-medium">{label}</span>
        <span className="font-display font-bold text-[26px]" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="h-[10px] bg-line/35 mt-3">
        <div className="h-full bar-grow" style={{ width: w, background: color, ["--d" as string]: `${d + 150}ms` }} />
      </div>
    </div>
  );
}

export function SlideBenefits() {
  return (
    <SlideFrame index={5} kicker="Светлая сторона · зачем это индустрии" accent="#43c6ae">
      <div className="flex gap-16 h-full items-center">
        <div className="flex-1 min-w-0">
          <Kicker color="#43c6ae">Почему индустрия не откажется</Kicker>
          <h2 className="anim-rise font-display font-extrabold uppercase leading-[1.05] mt-7" style={{ fontSize: 72, ["--d" as string]: "120ms" }}>
            ИИ — <span className="text-teal">усилитель</span>,<br /> а не замена смысла
          </h2>
          <p className="anim-rise text-[23px] text-muted leading-relaxed mt-7 max-w-[700px]" style={{ ["--d" as string]: "240ms" }}>
            Генеративные инструменты демократизировали производство: маленькая студия получила возможности
            крупного бренда. Запретить усилитель нельзя — можно и нужно управлять тем, что он усиливает.
          </p>
          <div className="anim-rise mt-9 border-l-[3px] border-teal pl-7 py-2 max-w-[700px]" style={{ ["--d" as string]: "360ms" }}>
            <p className="text-[22px] text-paper/90 italic leading-relaxed">
              «Технология нейтральна. Вопрос этики — это вопрос о целях, границах и ответственности того, кто
              нажимает кнопку».
            </p>
          </div>
        </div>
        <div className="w-[720px] shrink-0 border border-line bg-ink3/50 p-11">
          <div className="font-mono text-[14px] tracking-[0.22em] uppercase text-dim mb-9">
            Эффекты внедрения GenAI в рекламное производство
          </div>
          <div className="space-y-8">
            <BenefitBar label="Скорость производства креатива" value="×10" w="96%" color="#43c6ae" d={300} />
            <BenefitBar label="Стоимость продакшена" value="−90%" w="88%" color="#43c6ae" d={420} />
            <BenefitBar label="Варианты для A/B-тестов" value="×100+" w="80%" color="#f2a93b" d={540} />
            <BenefitBar label="Глубина персонализации сообщения" value="1:1" w="72%" color="#f2a93b" d={660} />
            <BenefitBar label="Доступность для малого бизнеса" value="max" w="64%" color="#8ca0b4" d={780} />
          </div>
          <div className="font-mono text-[13px] text-dim tracking-wider mt-9">
            * усреднённые оценки по кейсам агентств, 2024–2025
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ================= 06 · risk map ================= */

export const risks = [
  { n: "R-01", t: "Обман и дипфейки", d: "Синтетические лица, голоса и «отзывы», неотличимые от реальных", c: "#f0654f", sev: "критический", Icon: IconDeception },
  { n: "R-02", t: "Манипуляция выбором", d: "Гиперперсонализация, дарк-паттерны, давление на уязвимые состояния", c: "#f0654f", sev: "критический", Icon: IconManipulation },
  { n: "R-03", t: "Персональные данные", d: "Профилирование, утечки в промпты, согласие без понимания", c: "#f2a93b", sev: "высокий", Icon: IconData },
  { n: "R-04", t: "Авторское право", d: "Обучение на чужом творчестве, споры о праве на сгенерированное", c: "#f2a93b", sev: "высокий", Icon: IconCopyright },
  { n: "R-05", t: "Алгоритмическая предвзятость", d: "Стереотипы в креативах и дискриминационный таргетинг", c: "#f2a93b", sev: "высокий", Icon: IconBias },
  { n: "R-06", t: "Размывание границ", d: "Реклама, неотличимая от журналистики и «живых» людей", c: "#f0654f", sev: "критический", Icon: IconBoundary },
];

export function SlideRiskMap() {
  return (
    <SlideFrame index={6} kicker="Карта рисков · шесть осей" accent="#f0654f">
      <div className="flex items-end justify-between gap-10">
        <Display size={64}>
          Шесть осей <span className="text-coral">этического риска</span>
        </Display>
        <div className="anim-rise flex gap-3 pb-3" style={{ ["--d" as string]: "200ms" }}>
          <Chip color="#f0654f">критический</Chip>
          <Chip color="#f2a93b">высокий</Chip>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-7 mt-12">
        {risks.map((r, i) => (
          <div
            key={r.n}
            className="anim-rise border border-line bg-ink3/50 p-8 hover:-translate-y-1 hover:bg-ink3 transition-all relative group"
            style={{ ["--d" as string]: `${150 + i * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <r.Icon className="w-[52px] h-[52px]" strokeWidth={1.4} />
              <span className="font-mono text-[15px] tracking-[0.2em]" style={{ color: r.c }}>
                {r.n}
              </span>
            </div>
            <div className="font-display font-semibold text-[27px] leading-tight mt-6">{r.t}</div>
            <p className="text-[18px] text-muted leading-snug mt-3">{r.d}</p>
            <div className="mt-6 pt-5 border-t border-line/70 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: r.c }} />
              <span className="font-mono text-[13px] tracking-[0.18em] uppercase" style={{ color: r.c }}>
                {r.sev} риск
              </span>
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

/* ================= risk detail template ================= */

function RiskSlide({
  index,
  code,
  title,
  subtitle,
  bullets,
  caseCard,
  quote,
}: {
  index: number;
  code: string;
  title: React.ReactNode;
  subtitle: string;
  bullets: { bold?: string; text: React.ReactNode }[];
  caseCard: React.ReactNode;
  quote: string;
}) {
  return (
    <SlideFrame index={index} kicker={`Разбор · ${code}`} accent="#f0654f" ghost={code}>
      <div className="flex gap-16 h-full items-start">
        <div className="flex-1 min-w-0">
          <Display size={64}>
            {title}
          </Display>
          <p className="anim-rise text-[23px] text-muted leading-relaxed mt-5 max-w-[760px]" style={{ ["--d" as string]: "150ms" }}>
            {subtitle}
          </p>
          <div className="mt-9 space-y-6 max-w-[800px]">
            {bullets.map((b, i) => (
              <Bullet key={i} d={250 + i * 130} color="#f0654f" bold={b.bold}>
                {b.text}
              </Bullet>
            ))}
          </div>
        </div>
        <div className="w-[640px] shrink-0 pt-4">
          {caseCard}
          <div className="anim-rise mt-8 border-l-[3px] border-coral pl-6" style={{ ["--d" as string]: "700ms" }}>
            <p className="text-[21px] italic text-paper/85 leading-relaxed">{quote}</p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function CaseCard({ label, color = "#f0654f", children }: { label: string; color?: string; children: React.ReactNode }) {
  return (
    <div className="anim-pop border border-line bg-ink3/60 relative" style={{ ["--d" as string]: "450ms" }}>
      <div className="px-8 py-4 border-b border-line/80 flex items-center justify-between">
        <span className="font-mono text-[14px] tracking-[0.22em] uppercase" style={{ color }}>
          {label}
        </span>
        <span className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-coral/80" />
          <span className="w-2 h-2 rounded-full bg-amber/80" />
          <span className="w-2 h-2 rounded-full bg-teal/80" />
        </span>
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
}

/* ================= 07 · deception ================= */

export function SlideRiskDeception() {
  return (
    <RiskSlide
      index={7}
      code="R-01"
      title={
        <>
          Обман: лицо и голос <span className="text-coral">больше не доказательства</span>
        </>
      }
      subtitle="Дипфейк-технологии позволяют подделать любого человека за минуты. В рекламе это превращает доверие к «живому лицу» в уязвимость."
      bullets={[
        { bold: "Фейковые endorsements — ", text: "«звезда» хвалит продукт, о котором никогда не слышала: голос и мимика синтезированы." },
        { bold: "«Цифровое воскрешение» — ", text: "умершие актёры «снимаются» в роликах: вопрос согласия переходит к наследникам и совести бренда." },
        { bold: "Синтетические отзывы и эксперты — ", text: "несуществующие врачи, косметологи и «реальные покупатели» с фотореалистичными лицами." },
        { bold: "Мошенничество — ", text: "реклама-приманка с подделанным официальным лицом ведёт на фишинговые страницы." },
      ]}
      caseCard={
        <CaseCard label="Кейс-паттерн · синтетический endorsement">
          <div className="flex gap-6 items-center">
            <div className="w-[130px] h-[130px] shrink-0 border-2 border-coral/70 relative overflow-hidden bg-ink2">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="38" r="16" fill="none" stroke="#8ca0b4" strokeWidth="2.5" />
                <path d="M20 86c4-18 16-26 30-26s26 8 30 26" fill="none" stroke="#8ca0b4" strokeWidth="2.5" />
                <path d="M12 12l76 76" stroke="#f0654f" strokeWidth="2" strokeDasharray="5 4" />
              </svg>
              <span className="absolute bottom-1 right-1 font-mono text-[10px] text-coral tracking-widest">SYNTH</span>
            </div>
            <div className="text-[19px] leading-snug text-paper/90">
              Ролик: «известная певица» рекомендует инвест-платформу. Лицо и голос — диффузионная модель,
              согласия нет. Ущерб: репутация звезды, потери аудитории, иск к бренду.
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              ["Риск", "обман", "#f0654f"],
              ["Ущерб", "репутация + суды", "#f2a93b"],
              ["Скорость", "минуты", "#8ca0b4"],
            ].map(([k, v, c]) => (
              <div key={k} className="border border-line/70 py-3">
                <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-dim">{k}</div>
                <div className="font-display font-semibold text-[19px] mt-1" style={{ color: c }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
        </CaseCard>
      }
      quote="Человек привык верить глазам и ушам. Машина научилась и то и другое подделывать — значит, доверие нужно проектировать заново."
    />
  );
}

/* ================= 08 · manipulation ================= */

export function SlideRiskManipulation() {
  return (
    <RiskSlide
      index={8}
      code="R-02"
      title={
        <>
          Манипуляция: <span className="text-coral">персонализация становится давлением</span>
        </>
      }
      subtitle="Генеративный ИИ умеет не только создавать креатив, но и подбирать момент, тон и триггер, при которых конкретный человек с наибольшей вероятностью скажет «да»."
      bullets={[
        { bold: "Эмоциональное микротаргетирование — ", text: "модели оценивают уязвимые состояния: стресс, усталость, импульсивность — и бьют точно в них." },
        { bold: "Дарк-паттерны — ", text: "генерация бесконечных вариантов «тёмных» интерфейсов и формулировок, обходящих осознанный выбор." },
        { bold: "Уязвимые группы — ", text: "дети, подростки, пожилые люди: реклама, скроенная под их когнитивные слабости." },
        { bold: "Масштаб — ", text: "убеждающий дизайн, который раньше делали вручную для тысяч, теперь автоматизирован для миллионов." },
      ]}
      caseCard={
        <CaseCard label="Механика · воронка давления">
          {[
            ["01", "данные о поведении", "история, геолокация, ритм дня", "#8ca0b4"],
            ["02", "психо-профиль", "модель предсказывает триггеры", "#f2a93b"],
            ["03", "генерация триггера", "креатив под эмоцию момента", "#f0654f"],
            ["04", "решение на автопилоте", "покупка раньше, чем осмысление", "#f0654f"],
          ].map(([n, t, s, c], i) => (
            <div key={n} className="flex items-center gap-5 py-3.5">
              <span className="font-display font-bold text-[22px] w-[52px]" style={{ color: c }}>
                {n}
              </span>
              <div className="flex-1">
                <div className="text-[21px] font-medium">{t}</div>
                <div className="text-[16px] text-muted">{s}</div>
              </div>
              {i < 3 && <span className="text-dim text-[20px]">↓</span>}
            </div>
          ))}
        </CaseCard>
      }
      quote="Этика начинается там, где у аудитории остаётся реальная возможность сказать «нет» — информированно и спокойно."
    />
  );
}

/* ================= 09 · data ================= */

export function SlideRiskData() {
  return (
    <SlideFrame index={9} kicker="Разбор · R-03" accent="#f2a93b" ghost="R-03">
      <div className="flex gap-16 h-full items-start">
        <div className="flex-1 min-w-0">
          <Display size={64}>
            Данные: реклама <span className="text-amber">учится на нас</span>
          </Display>
          <p className="anim-rise text-[23px] text-muted leading-relaxed mt-5 max-w-[780px]" style={{ ["--d" as string]: "150ms" }}>
            Персонализация оплачивается данными. Генеративные системы добавляют новый слой риска: данные
            уходят не только в профили, но и в обучение моделей.
          </p>
          <div className="mt-9 space-y-6 max-w-[800px]">
            <Bullet d={250} color="#f2a93b" bold="Профилирование без смысла согласия — ">
              пользователь «разрешает» обработку, не понимая, что его поведение станет топливом для моделей.
            </Bullet>
            <Bullet d={380} color="#f2a93b" bold="Утечки через промпты — ">
              клиентские базы, CRM и инсайты, загруженные в публичные модели, могут остаться в них навсегда.
            </Bullet>
            <Bullet d={510} color="#f2a93b" bold="Деанонимизация — ">
              генеративные модели способны «додумывать» персональные детали из обезличенных наборов.
            </Bullet>
          </div>
        </div>
        <div className="w-[620px] shrink-0 pt-2">
          <CaseCard label="Регуляторная рамка" color="#f2a93b">
            <div className="space-y-5">
              {[
                ["152-ФЗ", "персональные данные в РФ: цель, объём, согласие", "#f2a93b"],
                ["GDPR", "прозрачность автоматизированных решений и профайлинга", "#43c6ae"],
                ["Минимизация", "собирать только то, что необходимо для конкретной цели", "#8ca0b4"],
                ["Privacy by design", "защита данных закладывается в систему, а не прикручивается", "#8ca0b4"],
              ].map(([t, d, c]) => (
                <div key={t} className="border-l-[3px] pl-6 py-1" style={{ borderColor: c }}>
                  <div className="font-display font-semibold text-[23px]" style={{ color: c }}>
                    {t}
                  </div>
                  <div className="text-[18px] text-muted mt-1">{d}</div>
                </div>
              ))}
            </div>
          </CaseCard>
          <div className="anim-rise mt-7 border-l-[3px] border-amber pl-6" style={{ ["--d" as string]: "700ms" }}>
            <p className="text-[21px] italic text-paper/85 leading-relaxed">
              Правило простое: если данные нельзя объяснить пользователю одной фразой — их сбор уже этическая
              проблема.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ================= 10 · copyright ================= */

export function SlideRiskCopyright() {
  const cases = [
    ["2023", "The New York Times против OpenAI", "обучение на журналистских текстах без лицензии", "#f0654f"],
    ["2023–24", "Иски художников к генеративным сервисам", "воспроизведение стиля конкретных авторов", "#f2a93b"],
    ["2024", "EU AI Act", "обязанность раскрывать данные, на которых обучена модель", "#43c6ae"],
    ["2025+", "Рекламные споры за «сгенерированное»", "кто владеет креативом: бренд, агентство или вендор модели?", "#8ca0b4"],
  ];
  return (
    <SlideFrame index={10} kicker="Разбор · R-04" accent="#f2a93b" ghost="R-04">
      <Display size={64}>
        Авторское право: <span className="text-amber">на чём обучен ваш креатив?</span>
      </Display>
      <div className="flex gap-14 mt-12 items-start">
        <div className="flex-1 min-w-0">
          <div className="space-y-0">
            {cases.map(([y, t, d, c], i) => (
              <div key={y} className="anim-left flex gap-8 items-stretch" style={{ ["--d" as string]: `${150 + i * 130}ms` }}>
                <div className="flex flex-col items-center">
                  <span className="font-display font-bold text-[24px] pt-1.5" style={{ color: c }}>
                    {y}
                  </span>
                  {i < cases.length - 1 && <span className="w-[2px] flex-1 my-2" style={{ background: `${c}44` }} />}
                </div>
                <div className="pb-8 flex-1">
                  <div className="text-[24px] font-semibold leading-tight">{t}</div>
                  <div className="text-[19px] text-muted mt-1.5">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[600px] shrink-0">
          <CaseCard label="Открытые вопросы" color="#f2a93b">
            <div className="space-y-6">
              {[
                "Считается ли обученная на чужих работах модель «производным произведением»?",
                "Кому принадлежит рекламный ролик, сгенерированный моделью: бренду, агентству или никому?",
                "«В стиле известного художника» в промпте — вдохновение или нарушение?",
                "Как бренду доказать чистоту креатива, если модель — чёрный ящик?",
              ].map((q, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="font-mono text-[16px] text-amber mt-0.5">Q{i + 1}</span>
                  <p className="text-[20px] leading-snug text-paper/90">{q}</p>
                </div>
              ))}
            </div>
          </CaseCard>
          <div className="anim-rise mt-7 flex items-center gap-3" style={{ ["--d" as string]: "700ms" }}>
            <IconCopyright className="w-7 h-7 text-amber" />
            <span className="font-mono text-[14px] uppercase tracking-[0.18em] text-muted">
              Право догоняет технологию — контракты нужно писать уже сегодня
            </span>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ================= 11 · bias ================= */

export function SlideRiskBias() {
  const bars = [
    ["Руководители в стоковых AI-образах", "78% мужчины", "78%", "#f0654f"],
    ["«Идеальная семья» в генерациях", "стереотипные роли", "65%", "#f2a93b"],
    ["Таргетинг вакансий: STEM-аудитория", "перекос по полу и возрасту", "57%", "#f2a93b"],
  ];
  return (
    <SlideFrame index={11} kicker="Разбор · R-05" accent="#f2a93b" ghost="R-05">
      <div className="flex gap-16 h-full items-start">
        <div className="flex-1 min-w-0">
          <Display size={64}>
            Предвзятость: машина <span className="text-amber">унаследовала наши стереотипы</span>
          </Display>
          <p className="anim-rise text-[23px] text-muted leading-relaxed mt-5 max-w-[780px]" style={{ ["--d" as string]: "150ms" }}>
            Модели обучаются на том, что человечество уже произвело, — и воспроизводят перекосы с машинной
            точностью и массовостью.
          </p>
          <div className="mt-9 space-y-6 max-w-[820px]">
            <Bullet d={280} color="#f2a93b" bold="Стереотипы в креативах — ">
              генерация «по умолчанию» выдаёт усреднённые образы: пол, возраст и этничность искажены в сторону
              большинства обучающей выборки.
            </Bullet>
            <Bullet d={410} color="#f2a93b" bold="Дискриминационный таргетинг — ">
              алгоритмы показа «исключают» целые группы из рекламы работы, кредита, жилья — незаметно для
              рекламодателя.
            </Bullet>
            <Bullet d={540} color="#f2a93b" bold="Цена ошибки — ">
              репутационные скандалы, бойкоты, регуляторные штрафы: предвзятость стала измеримым риском.
            </Bullet>
          </div>
        </div>
        <div className="w-[640px] shrink-0 pt-4">
          <CaseCard label="Иллюстрация · перекосы представлений" color="#f2a93b">
            <div className="space-y-8">
              {bars.map(([label, note, w, c], i) => (
                <div key={label} className="anim-left" style={{ ["--d" as string]: `${500 + i * 140}ms` }}>
                  <div className="text-[20px] font-medium">{label}</div>
                  <div className="text-[16px] text-muted mb-3">{note}</div>
                  <div className="h-[14px] bg-line/35 relative">
                    <div className="h-full bar-grow" style={{ width: w, background: c, ["--d" as string]: `${600 + i * 140}ms` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="font-mono text-[13px] text-dim tracking-wider mt-8">
              Иллюстративные оценки по мотивам публичных исследований генеративных моделей (2023–2025)
            </div>
          </CaseCard>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ================= 12 · boundary ================= */

export function SlideRiskBoundary() {
  return (
    <SlideFrame index={12} kicker="Разбор · R-06" accent="#f0654f" ghost="R-06">
      <div className="flex gap-16 h-full items-start">
        <div className="flex-1 min-w-0">
          <Display size={62}>
            Граница стёрта: <span className="text-coral">кто с вами говорит?</span>
          </Display>
          <p className="anim-rise text-[23px] text-muted leading-relaxed mt-5 max-w-[780px]" style={{ ["--d" as string]: "150ms" }}>
            Реклама всегда маскировалась под жизнь. Генеративный ИИ стёр последнюю границу — между человеком
            и персонажем, между редакцией и рекламным отделом.
          </p>
          <div className="mt-9 space-y-6 max-w-[800px]">
            <Bullet d={280} color="#f0654f" bold="Виртуальные инфлюенсеры — ">
              у синтетической личности миллионы подписчиков и рекламные контракты, но нет ни совести, ни
              ответственности.
            </Bullet>
            <Bullet d={410} color="#f0654f" bold="Нативная реклама + ИИ — ">
              «редакционные» статьи и обзоры пишутся моделью под задачу бренда: читатель не видит шва.
            </Bullet>
            <Bullet d={540} color="#f0654f" bold="Эрозия доверия — ">
              если всё может быть синтезировано, перестаёт работать и честная журналистика, и честная реклама.
            </Bullet>
          </div>
          <div className="anim-rise mt-9 inline-flex items-center gap-4 border border-amber/50 bg-amber/10 px-7 py-4" style={{ ["--d" as string]: "700ms" }}>
            <IconSpark className="w-6 h-6 text-amber" />
            <span className="text-[21px] text-paper/90">
              Именно здесь нужны инструменты проверки — об одном из них расскажет <b>Л.С. Макарова</b>: AUTOFACTCHECK.
            </span>
          </div>
        </div>
        <div className="w-[600px] shrink-0 pt-4">
          <CaseCard label="Реальный кейс · Aitana López">
            <div className="flex gap-6 items-center">
              <div className="w-[120px] h-[120px] shrink-0 border-2 border-coral/70 bg-ink2 relative flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <pattern id="px" width="6" height="6" patternUnits="userSpaceOnUse">
                      <rect width="6" height="6" fill="#16232f" />
                      <rect width="2.6" height="2.6" x="1" y="1" fill="#f0654f" opacity="0.75" />
                    </pattern>
                  </defs>
                  <circle cx="50" cy="38" r="15" fill="url(#px)" stroke="#f0654f" strokeWidth="1.6" />
                  <path d="M22 88c4-18 15-25 28-25s24 7 28 25" fill="url(#px)" stroke="#f0654f" strokeWidth="1.6" />
                </svg>
                <span className="absolute bottom-1 right-1 font-mono text-[10px] text-coral tracking-widest">AI</span>
              </div>
              <div className="text-[19px] leading-snug text-paper/90">
                Испанская виртуальная модель: 300+ тыс. подписчиков, доход до ~$11 000 в месяц, контракты с
                брендами. Человека за аккаунтом не существует.
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                ["Аудитория", "не знает", "#f0654f"],
                ["Маркировка", "часто нет", "#f2a93b"],
                ["Ответственный", "не определён", "#8ca0b4"],
              ].map(([k, v, c]) => (
                <div key={k} className="border border-line/70 py-3">
                  <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-dim">{k}</div>
                  <div className="font-display font-semibold text-[19px] mt-1" style={{ color: c }}>
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </CaseCard>
          <div className="anim-rise mt-7 border-l-[3px] border-coral pl-6" style={{ ["--d" as string]: "720ms" }}>
            <p className="text-[21px] italic text-paper/85 leading-relaxed">
              Право зрителя знать, человек перед ним или алгоритм, — базовое условие честного рынка.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ================= 13 · balance ================= */

const principles = [
  { n: "01", t: "Прозрачность и маркировка", d: "Любой синтетический контент помечается: «создано с помощью ИИ», «виртуальный персонаж».", Icon: IconBoundary, c: "#f2a93b" },
  { n: "02", t: "Верификация фактов", d: "Рекламные утверждения проходят проверку — автоматическую и человеческую. Здесь работает AUTOFACTCHECK.", Icon: IconShield, c: "#43c6ae" },
  { n: "03", t: "Согласие и минимизация данных", d: "Персонализация без слежки: только необходимые данные, только с осмысленного согласия.", Icon: IconData, c: "#43c6ae" },
  { n: "04", t: "Человек в контуре решений", d: "Финальное «да» на публикацию — за человеком; ИИ предлагает, человек отвечает.", Icon: IconScale, c: "#f2a93b" },
  { n: "05", t: "Саморегулирование и аудит", d: "Кодекс этики Альянса ИИ, EU AI Act, внутренние этические комитеты и регулярный аудит моделей.", Icon: IconSpark, c: "#8ca0b4" },
];

export function SlideBalance() {
  return (
    <SlideFrame index={13} kicker="Решение · баланс риска и прогресса" accent="#43c6ae" ghost="±">
      <div className="flex gap-16 h-full items-start">
        <div className="flex-1 min-w-0">
          <Kicker color="#43c6ae">Как удержать баланс</Kicker>
          <h2 className="anim-rise font-display font-extrabold uppercase leading-[1.05] mt-6" style={{ fontSize: 62, ["--d" as string]: "120ms" }}>
            Пять принципов <span className="text-teal">ответственного</span> GenAI
          </h2>
          <div className="mt-9 space-y-5">
            {principles.map((p, i) => (
              <div
                key={p.n}
                className="anim-left flex items-center gap-6 border border-line bg-ink3/40 px-6 py-4 hover:border-teal/50 transition-colors"
                style={{ ["--d" as string]: `${220 + i * 120}ms` }}
              >
                <span className="font-display font-bold text-[22px] w-[54px] shrink-0" style={{ color: p.c }}>
                  {p.n}
                </span>
                <p.Icon className="w-9 h-9 shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="text-[22px] font-semibold">{p.t}</div>
                  <div className="text-[17px] text-muted leading-snug mt-0.5">{p.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[560px] shrink-0 pt-2">
          <div className="anim-pop border border-line bg-ink3/60 p-9 relative" style={{ ["--d" as string]: "450ms" }}>
            <span className="corner-tick tl" style={{ ["--tick-color" as string]: "#43c6ae" }} />
            <span className="corner-tick br" style={{ ["--tick-color" as string]: "#43c6ae" }} />
            <div className="font-mono text-[14px] tracking-[0.22em] uppercase text-dim">Ориентиры регулирования</div>
            <div className="mt-6 space-y-6">
              {[
                ["Кодекс этики Альянса ИИ", "Россия, 2021 · 200+ подписантов, этические комиссии", "#43c6ae"],
                ["EU AI Act", "маркировка дипфейков и прозрачность — с 2026 года", "#f2a93b"],
                ["Маркировка интернет-рекламы", "РФ: токены ОРД — каждая кампания учтена государством", "#8ca0b4"],
                ["Политики платформ", "запрет немаркированных дипфейков в рекламных сетях", "#8ca0b4"],
              ].map(([t, d, c]) => (
                <div key={t} className="border-l-[3px] pl-6" style={{ borderColor: c }}>
                  <div className="font-display font-semibold text-[22px]" style={{ color: c }}>
                    {t}
                  </div>
                  <div className="text-[17px] text-muted mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="anim-rise mt-8 flex items-center gap-6 justify-center" style={{ ["--d" as string]: "700ms" }}>
            <div className="text-center">
              <div className="font-display font-bold text-[30px] text-coral">РИСК</div>
            </div>
            <svg width="200" height="46" viewBox="0 0 200 46">
              <line x1="6" y1="23" x2="194" y2="23" stroke="#24364b" strokeWidth="2" />
              <circle cx="100" cy="23" r="13" fill="#0c141d" stroke="#43c6ae" strokeWidth="2.4" />
              <circle cx="100" cy="23" r="4.5" fill="#43c6ae" className="pulse-dot" />
              <path d="M14 16l-8 7 8 7M186 16l8 7-8 7" stroke="#5f7285" strokeWidth="2" fill="none" />
            </svg>
            <div className="text-center">
              <div className="font-display font-bold text-[30px] text-teal">ПРОГРЕСС</div>
            </div>
          </div>
          <div className="text-center font-mono text-[14px] uppercase tracking-[0.2em] text-muted mt-3">
            Точка равновесия — ответственность
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ================= 14 · speakers ================= */

function SpeakerCard({
  monogram,
  color,
  name,
  role,
  talk,
  tags,
  d,
}: {
  monogram: string;
  color: string;
  name: string;
  role: string;
  talk: string;
  tags: string[];
  d: number;
}) {
  return (
    <div className="anim-rise flex-1 border border-line bg-ink3/50 p-11 relative hover:-translate-y-1.5 transition-transform" style={{ ["--d" as string]: `${d}ms` }}>
      <span className="corner-tick tl" style={{ ["--tick-color" as string]: color }} />
      <span className="corner-tick br" style={{ ["--tick-color" as string]: color }} />
      <div className="flex items-center gap-7">
        <div
          className="w-[110px] h-[110px] shrink-0 flex items-center justify-center font-display font-extrabold text-[40px] relative"
          style={{ color, border: `2px solid ${color}`, background: `${color}14` }}
        >
          {monogram}
          <span className="absolute -bottom-[7px] -right-[7px] w-3.5 h-3.5 rotate-45" style={{ background: color }} />
        </div>
        <div>
          <div className="font-mono text-[13px] tracking-[0.22em] uppercase" style={{ color }}>
            Спикер
          </div>
          <div className="font-display font-bold text-[30px] leading-tight mt-2">{name}</div>
        </div>
      </div>
      <p className="text-[19px] text-muted leading-relaxed mt-7">{role}</p>
      <div className="mt-7 pt-6 border-t border-line/70">
        <div className="font-mono text-[13px] tracking-[0.22em] uppercase text-dim">Тема доклада</div>
        <div className="font-display font-semibold text-[26px] leading-snug mt-3" style={{ color }}>
          «{talk}»
        </div>
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        {tags.map((t) => (
          <span key={t} className="px-3.5 py-1.5 border font-mono text-[14px] tracking-wider uppercase" style={{ borderColor: `${color}55`, color }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SlideSpeakers() {
  return (
    <SlideFrame index={14} kicker="Доклады · спикеры" accent="#f2a93b">
      <Display size={64}>
        Слово — <span className="text-amber">спикерам</span>
      </Display>
      <p className="anim-rise text-[23px] text-muted mt-4" style={{ ["--d" as string]: "150ms" }}>
        Два взгляда на одну проблему: прикладной инструмент и этическая рамка.
      </p>
      <div className="flex gap-10 mt-12">
        <SpeakerCard
          monogram="ЛМ"
          color="#f2a93b"
          name="Макарова Людмила Сергеевна"
          role="Руководитель Центра применения ИИ в журналистике и массовой коммуникации ННГУ им. Н.И. Лобачевского"
          talk="AUTOFACTCHECK: правда по алгоритму — прикладной ИИ в медиа"
          tags={["фактчекинг", "прикладной ИИ", "медиа"]}
          d={250}
        />
        <SpeakerCard
          monogram="ИП"
          color="#43c6ae"
          name="Померанцев Илья Валерьевич"
          role="Руководитель проектов Центра ИИ ННГУ им. Н.И. Лобачевского, член Комиссии по реализации кодекса этики Альянса ИИ в РФ"
          talk="Этика ИИ в медиа: грань между риском и прогрессом"
          tags={["этика ИИ", "саморегулирование", "медиа"]}
          d={400}
        />
      </div>
      <div className="anim-rise mt-10 flex items-center gap-5" style={{ ["--d" as string]: "600ms" }}>
        <span className="inline-block w-10 h-[2px] bg-amber" />
        <span className="font-mono text-[15px] tracking-[0.2em] uppercase text-muted">
          После каждого доклада — 2–3 минуты на вопросы · итоговая дискуссия объединяет обе перспективы
        </span>
      </div>
    </SlideFrame>
  );
}

/* ================= 15 · outro ================= */

export function SlideOutro() {
  return (
    <SlideFrame index={15} kicker="Выводы · спасибо за внимание" accent="#f2a93b" ghost="✦">
      <div className="flex h-full items-center gap-20">
        <div className="flex-1 min-w-0">
          <Kicker>Три тезиса на память</Kicker>
          <div className="mt-9 space-y-7">
            {[
              ["Генеративный ИИ — усилитель.", "Он умножает и возможности, и риски; нейтральных сценариев не бывает.", "#f2a93b"],
              ["Грань между риском и прогрессом — это ответственность.", "Не технология решает, где обман, а где инновация, а человек и институты.", "#f0654f"],
              ["Прозрачность и проверка — условие доверия.", "Маркировка, фактчекинг и человеческий контроль делают ИИ союзником медиа и рекламы.", "#43c6ae"],
            ].map(([t, d, c], i) => (
              <div key={i} className="anim-left flex gap-6 items-start" style={{ ["--d" as string]: `${150 + i * 150}ms` }}>
                <span className="font-display font-bold text-[30px] mt-0.5" style={{ color: c }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="font-display font-semibold text-[27px] leading-snug">{t}</div>
                  <div className="text-[20px] text-muted mt-1.5">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[660px] shrink-0">
          <div className="anim-pop border border-line bg-ink3/60 p-12 relative" style={{ ["--d" as string]: "550ms" }}>
            <span className="corner-tick tl" />
            <span className="corner-tick tr" />
            <span className="corner-tick bl" />
            <span className="corner-tick br" />
            <h2 className="font-display font-extrabold uppercase leading-[1.04]" style={{ fontSize: 66 }}>
              Спасибо <br />
              за <span className="text-amber">внимание</span>
            </h2>
            <div className="mt-8 pt-7 border-t border-line/70 space-y-4">
              <div className="flex items-center gap-4 text-[21px]">
                <IconMic className="w-6 h-6 text-teal shrink-0" />
                Вопросы и дискуссия — прямо сейчас
              </div>
              <div className="text-[19px] text-muted leading-relaxed">
                Центр применения ИИ в журналистике и массовой коммуникации · Центр ИИ ННГУ им.
                Н.И. Лобачевского
              </div>
              <div className="flex items-center gap-3 font-mono text-[16px] tracking-wider text-amber">
                <span className="w-2 h-2 bg-amber inline-block" />
                github.com/veznar/Etica
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

/* ================= registry ================= */

export type SlideDef = {
  id: string;
  nav: string;
  Component: React.FC;
};

export const SLIDES: SlideDef[] = [
  { id: "title", nav: "Титул", Component: SlideTitle },
  { id: "agenda", nav: "Программа", Component: SlideAgenda },
  { id: "numbers", nav: "Контекст в цифрах", Component: SlideNumbers },
  { id: "capabilities", nav: "Что умеет GenAI", Component: SlideCapabilities },
  { id: "benefits", nav: "Зачем индустрии", Component: SlideBenefits },
  { id: "risk-map", nav: "Карта рисков", Component: SlideRiskMap },
  { id: "risk-deception", nav: "R-01 · Обман", Component: SlideRiskDeception },
  { id: "risk-manipulation", nav: "R-02 · Манипуляция", Component: SlideRiskManipulation },
  { id: "risk-data", nav: "R-03 · Данные", Component: SlideRiskData },
  { id: "risk-copyright", nav: "R-04 · Авторское право", Component: SlideRiskCopyright },
  { id: "risk-bias", nav: "R-05 · Предвзятость", Component: SlideRiskBias },
  { id: "risk-boundary", nav: "R-06 · Границы", Component: SlideRiskBoundary },
  { id: "balance", nav: "Баланс", Component: SlideBalance },
  { id: "speakers", nav: "Спикеры", Component: SlideSpeakers },
  { id: "outro", nav: "Выводы", Component: SlideOutro },
];
