/**
 * DescartesIllu.tsx — figures for claude-liam-descartes-doubt
 * ("What Would Have to Be True").
 *
 * GATE L note: `./art scenes` found no component for a claim/condition
 * inspection protocol, an artifact-vs-world split, or a rhetorical→engineering
 * correction, so these are a logged PUNT built as new components, not slated.
 *
 * These are written FOR radical doubt and are not adapted from another reel.
 * The grammar is the checkbox: a claim becomes a set of boxes somebody can
 * tick, and the limits are the boxes that stay open.
 *
 * FILL-THE-CANVAS note: GATE V counts a pixel as ink only when it sits >28/255
 * off the background, and this brand's white cards are 22 off the cream stage —
 * invisible to the metric. These figures carry their fill with INK glyphs and
 * ink rules spanning the safe area, not with white panels.
 *
 * Every scene is a pure function of the audio clock via useP(), and every
 * composition is sized from `beatSeconds` so the clock spans the whole beat.
 *
 * Composition IDs:
 *   DescartesProtocol | DescartesSplit | DescartesCorrection
 *   DescartesChecklist | DescartesLedger
 */
import React from 'react';
import { z } from 'zod';
import { AbsoluteFill } from 'remotion';
import { SparkLine, useP, clamp, remap, ease, SERIF, SANS, MONO, STAGE } from './illustrations/kit';
import { CLAUDE } from './tokens/claude';

const INK = CLAUDE.INK;
const SOFT = CLAUDE.INK_SOFT;
const SPARK = CLAUDE.SPARK;
const SAFE_L = 74;
const SAFE_R = 1206;

// ══════════════════════════════════════════════════════════════════════════
// DescartesProtocol — the move itself. A claim lands, the question cuts in,
// and the two possible ANSWERS resolve: the one that mistakes the artifact
// for the world, and the one that produces a list.
// ══════════════════════════════════════════════════════════════════════════
export const descartesProtocolSchema = z.object({
  beatSeconds: z.number().optional(),
  sparkLine: z.string().default('Doubt, as a checklist.'),
  claim: z.string().default('"Low-acuity."'),
  question: z.string().default('What would have to be true for this to be wrong?'),
  conditions: z.array(z.string()).default([]),
  footer: z.string().default(''),
  /** Start fraction per condition, aligned to the narration. */
  conditionsAt: z.array(z.number()).default([]),
  footerAt: z.number().optional(),
  /** When set, every numbered box appears at this fraction (as the count is
   *  spoken) and each condition's text arrives on its own word. */
  slotsAt: z.number().optional(),
  /** When the claim and the question land. Omitted = 0.04 / 0.20. */
  claimAt: z.number().optional(),
  questionAt: z.number().optional(),
  /** Opacity the claim holds before claimAt (e.g. 0.3); omitted = hidden until claimAt. */
  claimPreview: z.number().optional(),
});
export type DescartesProtocolProps = z.infer<typeof descartesProtocolSchema>;

export const DescartesProtocol: React.FC<DescartesProtocolProps> = (p_) => {
  const p = useP();
  const cA = p_.claimAt ?? 0.04;
  const qA = p_.questionAt ?? 0.20;
  const claimIn = ease(remap(p, cA, cA + 0.10, 0, 1));
  const qIn = ease(remap(p, qA, qA + 0.10, 0, 1));
  const nC = p_.conditions.length;
  return (
    <AbsoluteFill style={{ background: STAGE }}>
      <div style={{
        position: 'absolute', left: SAFE_L, right: 1280 - SAFE_R, top: 128,
        textAlign: 'center', fontFamily: SERIF, fontSize: 78, color: INK,
        // with claimPreview, the claim sits faint from the start (the pitch's own claim)
        // and comes up to full strength on the word that names it
        opacity: p_.claimPreview === undefined ? claimIn
          : Math.max(ease(remap(p, 0.02, 0.08, 0, 1)) * p_.claimPreview, claimIn),
        transform: `translateY(${(1 - (p_.claimPreview === undefined ? claimIn : 1)) * 14}px) scale(${
          p_.claimPreview === undefined ? 1 : 1 + 0.04 * Math.sin(Math.PI * claimIn)})`,
      }}>{p_.claim}</div>

      <div style={{
        position: 'absolute', left: SAFE_L, right: 1280 - SAFE_R, top: 226,
        textAlign: 'center', fontFamily: SERIF, fontSize: 42, color: INK,
        opacity: qIn,
      }}>{p_.question}</div>

      <div style={{
        position: 'absolute', left: SAFE_L + 40 + ((SAFE_R - SAFE_L) - 80) * (1 - qIn) / 2,
        width: ((SAFE_R - SAFE_L) - 80) * qIn, top: 292,
        height: 3, background: SPARK, opacity: 0.9 * clamp(qIn * 2, 0, 1),
      }} />

      {p_.conditions.map((c, i) => {
        // last answer must COMPLETE at ~0.84, so solve the gap from the count
        const gap = nC > 1 ? (0.72 - 0.34) / (nC - 1) : 0;
        const t0 = p_.conditionsAt[i] ?? (0.34 + i * gap);
        const ci = ease(remap(p, t0, t0 + 0.12, 0, 1));
        const si = p_.slotsAt === undefined ? ci : ease(remap(p, p_.slotsAt, p_.slotsAt + 0.06, 0, 1));
        return (
          <div key={i} style={{
            position: 'absolute', left: SAFE_L + 30, width: (SAFE_R - SAFE_L) - 60,
            top: 336 + i * 98, display: 'flex', alignItems: 'center', gap: 22,
            opacity: Math.max(ci, si), transform: `translateX(${(1 - si) * -18}px)`,
          }}>
            <div style={{
              width: 46, height: 46, flexShrink: 0,
              border: `3px solid ${INK}`, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: SANS, fontSize: 24, fontWeight: 700, color: INK,
            }}>{i + 1}</div>
            <div style={{ fontFamily: SERIF, fontSize: 40, color: INK, lineHeight: 1.2, opacity: ci,
              transform: `translateX(${(1 - ci) * -12}px)` }}>{c}</div>
          </div>
        );
      })}

      {p_.footer && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 622, textAlign: 'center',
          fontFamily: SANS, fontSize: 32, color: SOFT,
          opacity: ease(remap(p, p_.footerAt ?? 0.88, (p_.footerAt ?? 0.88) + 0.08, 0, 1)),
        }}>{p_.footer}</div>
      )}
      <SparkLine text={p_.sparkLine} />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// DescartesSplit — the artifact/world gap. Left: what was reported.
// Right: what was actually the case. The rule between them is the gap.
// ══════════════════════════════════════════════════════════════════════════
export const descartesSplitSchema = z.object({
  beatSeconds: z.number().optional(),
  sparkLine: z.string().default('Artifact, then world.'),
  leftLabel: z.string().default('THE ARTIFACT'),
  rightLabel: z.string().default('THE WORLD'),
  leftLines: z.array(z.string()).default([]),
  rightLines: z.array(z.string()).default([]),
  gapLine: z.string().default(''),
  /** Optional one-line setup shown BEFORE the columns, so a cold open on a
   *  two-column compare does not begin as an unexplained pair of lists. */
  intro: z.string().default(''),
  /** Start fractions, so each reveal lands on the phrase that names it.
   *  Omitted = the previous hardcoded behaviour. */
  introAt: z.number().optional(),
  leftAt: z.number().optional(),
  rightAt: z.number().optional(),
  gapAt: z.number().optional(),
  /** Strike the left column through as the right one arrives — for a beat
   *  where the left side is not merely partial but false. */
  strikeLeft: z.boolean().default(false),
});
export type DescartesSplitProps = z.infer<typeof descartesSplitSchema>;

const Col: React.FC<{
  x: number; w: number; label: string; lines: string[]; reveal: number;
  accent?: boolean; dy?: number; strike?: number;
  side?: number;
}> = ({ x, w, label, lines, reveal, accent, dy = 0, strike = 0, side = 0 }) => (
  <>
    <div style={{
      position: 'absolute', left: x, width: w, top: 138 + dy,
      // one line, always: a heading that wraps gets cut in half by the rule below it
      fontFamily: SANS, fontSize: Math.min(40, Math.floor(w / Math.max(1, label.length) / 0.70)),
      fontWeight: 700, letterSpacing: 2, whiteSpace: 'nowrap',
      color: accent ? INK : SOFT, opacity: clamp(reveal * 4, 0, 1),
      transform: `translateX(${side * (1 - clamp(reveal * 3, 0, 1)) * 18}px)`,
    }}>{label}</div>
    <div style={{
      position: 'absolute', left: x, width: w * clamp(reveal * 3, 0, 1), top: 194 + dy, height: 3,
      background: accent ? SPARK : INK, opacity: 0.8,
    }} />
    {lines.map((l, i) => {
      const li = ease(remap(reveal, i * 0.26, i * 0.26 + 0.34, 0, 1));
      return (
        <div key={i} style={{
          position: 'absolute', left: x, width: w, top: 228 + dy + i * 114,
          fontFamily: SERIF, fontSize: 39, lineHeight: 1.24,
          color: accent ? INK : SOFT,
          opacity: li, transform: `translateY(${(1 - li) * 12}px)`,
        }}>
          {l}
          {strike > 0 && (
            <div style={{
              position: 'absolute', left: 0, top: '52%',
              width: `${Math.min(1, strike * (1 - i * 0.12)) * 100}%`,
              height: 3, background: SPARK, opacity: 0.85,
            }} />
          )}
        </div>
      );
    })}
  </>
);

export const DescartesSplit: React.FC<DescartesSplitProps> = (p_) => {
  const p = useP();
  const hasIntro = Boolean(p_.intro);
  // With an intro the columns wait for it, so the viewer is told what they are
  // looking at before two unlabelled lists start filling in.
  const lA = p_.leftAt  ?? (hasIntro ? 0.18 : 0.06);
  const rA = p_.rightAt ?? (hasIntro ? 0.54 : 0.44);
  const gA = p_.gapAt   ?? 0.90;
  const iA = p_.introAt ?? 0.03;
  const lRev = ease(remap(p, lA, Math.min(rA + 0.04, lA + 0.20), 0, 1));
  const rRev = ease(remap(p, rA, Math.min(gA - 0.02, rA + 0.30), 0, 1));
  const gap = ease(remap(p, gA, gA + 0.08, 0, 1));
  const introIn = ease(remap(p, iA, iA + 0.10, 0, 1));
  const dy = hasIntro ? 54 : 0;
  const colW = 512;
  return (
    <AbsoluteFill style={{ background: STAGE }}>
      {hasIntro && (
        <div style={{
          position: 'absolute', left: SAFE_L, right: 1280 - SAFE_R, top: 110,
          textAlign: 'center', fontFamily: SERIF, fontSize: 44, color: INK,
          opacity: introIn, transform: `translateY(${(1 - introIn) * 10}px)`,
        }}>{p_.intro}</div>
      )}
      <Col x={SAFE_L} w={colW} label={p_.leftLabel} lines={p_.leftLines} reveal={lRev} dy={dy} side={-1}
           strike={p_.strikeLeft ? ease(remap(p, rA + 0.04, gA, 0, 1)) : 0} />
      <div style={{
        position: 'absolute', left: 640, top: 132 + dy, width: 2, height: (430 - dy) * clamp(lRev * 2, 0, 1),
        background: INK, opacity: 0.22,
      }} />
      <Col x={SAFE_R - colW} w={colW} label={p_.rightLabel} lines={p_.rightLines} reveal={rRev} accent dy={dy} side={1} />
      {p_.gapLine && (
        <div style={{
          position: 'absolute', left: SAFE_L, right: 1280 - SAFE_R, top: 604,
          textAlign: 'center', fontFamily: SERIF, fontSize: 36, color: INK, opacity: gap,
        }}>{p_.gapLine}</div>
      )}
      <SparkLine text={p_.sparkLine} />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// DescartesCorrection — a claim compatible with every outcome is struck out,
// and the version that forbids an observation resolves beneath it as the
// three things it must specify: metric, threshold, window.
// ══════════════════════════════════════════════════════════════════════════
export const descartesCorrectionSchema = z.object({
  beatSeconds: z.number().optional(),
  sparkLine: z.string().default('Make it falsifiable.'),
  before: z.string().default(''),
  beforeNote: z.string().default('compatible with every outcome'),
  parts: z.array(z.object({ k: z.string(), v: z.string() })).default([]),
  after: z.string().default(''),
  /** Start fraction per column, aligned to the narration. */
  partsAt: z.array(z.number()).default([]),
  afterAt: z.number().optional(),
  /** Verbatim evidence for WHY the claim fails, shown where the parts will
   *  land, from evidenceAt until the first part arrives. */
  evidence: z.array(z.object({ src: z.string(), code: z.string() })).default([]),
  evidenceAt: z.number().optional(),
  evidenceNote: z.string().default(''),
  /** Strike line [left, width] in stage px — sized to the claim it strikes. */
  strikeSpan: z.array(z.number()).length(2).optional(),
  /** Set the struck claim in INK instead of SOFT — keeps glyph contrast where
   *  the strike crosses it, and suits a claim whose first half is true. */
  beforeInk: z.boolean().default(false),
});
export type DescartesCorrectionProps = z.infer<typeof descartesCorrectionSchema>;

export const DescartesCorrection: React.FC<DescartesCorrectionProps> = (p_) => {
  const p = useP();
  const inB = ease(remap(p, 0.04, 0.14, 0, 1));
  const strike = ease(remap(p, 0.26, 0.40, 0, 1));
  return (
    <AbsoluteFill style={{ background: STAGE }}>
      <div style={{
        position: 'absolute', left: SAFE_L, right: 1280 - SAFE_R, top: 132,
        textAlign: 'center', fontFamily: SERIF, fontSize: 60,
        color: p_.beforeInk ? INK : SOFT, opacity: inB,
      }}>{p_.before}</div>
      <div style={{
        position: 'absolute', left: p_.strikeSpan?.[0] ?? 300, top: 168,
        width: strike * (p_.strikeSpan?.[1] ?? 680), height: 4, background: SPARK,
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 214, textAlign: 'center',
        fontFamily: SANS, fontSize: 36, color: SOFT, opacity: strike,
      }}>{p_.beforeNote}</div>

      {p_.evidence.length > 0 && (() => {
        const e0 = p_.evidenceAt ?? 0.28;
        const e1 = p_.partsAt[0] ?? 0.42;
        const eo = ease(remap(p, e0, e0 + 0.07, 0, 1)) * (1 - ease(remap(p, e1 - 0.05, e1, 0, 1)));
        return (
          <div style={{ position: 'absolute', left: SAFE_L, width: SAFE_R - SAFE_L, top: 300, opacity: eo }}>
            {p_.evidence.map((ev, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 28, marginBottom: 40,
                opacity: ease(remap(p, e0 + i * 0.05, e0 + i * 0.05 + 0.07, 0, 1)) }}>
                <div style={{ width: 300, flexShrink: 0, textAlign: 'right', fontFamily: SANS, fontSize: 28, color: SOFT }}>{ev.src}</div>
                <div style={{ fontFamily: MONO, fontSize: 36, color: INK }}>{ev.code}</div>
              </div>
            ))}
            {p_.evidenceNote && (
              <div style={{ marginTop: 44, textAlign: 'center', fontFamily: SERIF, fontSize: 36, color: INK,
                opacity: ease(remap(p, e0 + 0.10, e0 + 0.17, 0, 1)) }}>{p_.evidenceNote}</div>
            )}
          </div>
        );
      })()}

      {p_.parts.map((pt, i) => {
        const t0 = p_.partsAt[i] ?? (0.42 + i * 0.16);
        const pi = ease(remap(p, t0, t0 + 0.11, 0, 1));
        const x = SAFE_L + i * 380;
        return (
          <div key={i} style={{
            position: 'absolute', left: x, width: 356, top: 282,
            opacity: pi, transform: `translateY(${(1 - pi) * 16}px)`,
          }}>
            <div style={{
              fontFamily: SANS, fontSize: 44, fontWeight: 700, letterSpacing: 2,
              color: SPARK, marginBottom: 14,
            }}>{pt.k.toUpperCase()}</div>
            <div style={{ width: `${pi * 100}%`, height: 3, background: INK, opacity: 0.75, marginBottom: 16 }} />
            {/* pre-line so the authored line breaks in the value actually land */}
            <div style={{ fontFamily: MONO, fontSize: 31, color: INK, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{pt.v}</div>
          </div>
        );
      })}

      {p_.after && (
        <div style={{
          position: 'absolute', left: SAFE_L, right: 1280 - SAFE_R, top: 552,
          textAlign: 'center', fontFamily: SERIF, fontSize: 37, color: INK,
          opacity: ease(remap(p, p_.afterAt ?? 0.90, (p_.afterAt ?? 0.90) + 0.08, 0, 1)), lineHeight: 1.28,
        }}>{p_.after}</div>
      )}
      <SparkLine text={p_.sparkLine} />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// The reel's own grammar: a claim becomes boxes somebody can tick, and the
// limits are the boxes that stay open.
// ══════════════════════════════════════════════════════════════════════════

// The tick is an L of two borders, which only reads as a checkmark once it is
// rotated -45°; unrotated it renders as a corner mark. Not a pixel-art scene,
// so rotation is safe here.
const CheckBox: React.FC<{ state: number; empty?: boolean }> = ({ state, empty }) => (
  <div style={{
    width: 54, height: 54, flexShrink: 0,
    border: `3px solid ${state > 0.05 ? (empty ? SOFT : INK) : '#D6D1C4'}`,
    borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    {empty ? (
      <div style={{ width: 22, height: 3, background: SOFT, opacity: state }} />
    ) : (
      <div style={{
        width: 26, height: 13, borderLeft: `5px solid ${SPARK}`, borderBottom: `5px solid ${SPARK}`,
        transform: `translate(2px,-4px) rotate(-45deg) scale(${clamp(state * 1.15, 0, 1)})`,
        transformOrigin: 'left bottom', opacity: state,
      }} />
    )}
  </div>
);

const CheckRow: React.FC<{ y: number; title: string; sub: string; state: number; empty?: boolean }> =
({ y, title, sub, state, empty }) => (
  <div style={{
    position: 'absolute', left: SAFE_L, width: SAFE_R - SAFE_L, top: y,
    display: 'flex', gap: 26, alignItems: 'flex-start',
    opacity: clamp(state * 2, 0, 1), transform: `translateX(${(1 - clamp(state * 2, 0, 1)) * -16}px)`,
  }}>
    <CheckBox state={state} empty={empty} />
    <div>
      <div style={{ fontFamily: SERIF, fontSize: 46, color: INK, lineHeight: 1.15 }}>{title}</div>
      <div style={{ fontFamily: SANS, fontSize: 30, color: SOFT, marginTop: 10 }}>{sub}</div>
    </div>
  </div>
);

export const descartesChecklistSchema = z.object({
  beatSeconds: z.number().optional(),
  sparkLine: z.string().default('Queries, not opinions.'),
  rows: z.array(z.object({ title: z.string(), sub: z.string() })).default([]),
  footer: z.string().default(''),
  /** unticked = the boxes this move cannot close (the limits beat) */
  unticked: z.boolean().default(false),
  /** Start fraction per row, aligned to the narration. */
  rowsAt: z.array(z.number()).default([]),
  footerAt: z.number().optional(),
});
export type DescartesChecklistProps = z.infer<typeof descartesChecklistSchema>;

export const DescartesChecklist: React.FC<DescartesChecklistProps> = (p_) => {
  const p = useP();
  const n = Math.max(1, p_.rows.length);
  return (
    <AbsoluteFill style={{ background: STAGE }}>
      {p_.rows.map((r, i) => {
        const t0 = p_.rowsAt[i] ?? (0.14 + i * ((0.76 - 0.14) / Math.max(1, n - 1 || 1)));
        return <CheckRow key={i} y={168 + i * 152} title={r.title} sub={r.sub}
                         state={ease(remap(p, t0, t0 + 0.13, 0, 1))} empty={p_.unticked} />;
      })}
      {p_.footer && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 632, textAlign: 'center',
          fontFamily: SERIF, fontSize: 36, color: INK,
          opacity: ease(remap(p, p_.footerAt ?? 0.88, (p_.footerAt ?? 0.88) + 0.09, 0, 1)),
        }}>{p_.footer}</div>
      )}
      <SparkLine text={p_.sparkLine} />
    </AbsoluteFill>
  );
};

/** An external check landing on a claim, one measured figure at a time. */
/** Count a numeric value up as its row lands, so six figures arrive as six
 *  measurements rather than a block of text. Keeps any prefix/suffix. */
const countUp = (value: string, t: number) => {
  // Only whole counts roll. A rate or a decimal caught mid-count reads as a
  // different, wrong figure ("AUC 0.29"), and this reel is specifically about
  // numbers that mislead — so those land at their true value immediately.
  if (/[.%]/.test(value)) return value;
  const m = value.match(/^([^0-9-]*)([-0-9.,]+)(.*)$/);
  if (!m || t >= 1) return value;
  const [, pre, num, post] = m;
  const dec = (num.split('.')[1] || '').length;
  const target = parseFloat(num.replace(/,/g, ''));
  if (!isFinite(target)) return value;
  const now = target * t;
  const shown = dec > 0
    ? now.toFixed(dec)
    : Math.round(now).toLocaleString('en-US');
  return `${pre}${shown}${post}`;
};

export const descartesLedgerSchema = z.object({
  beatSeconds: z.number().optional(),
  sparkLine: z.string().default('Unrefuted is not validated.'),
  claim: z.string().default(''),
  rows: z.array(z.object({ label: z.string(), value: z.string(), damning: z.boolean().optional() })).default([]),
  closing: z.string().default(''),
  source: z.string().default(''),
  /** Start fraction per row, aligned to the spoken figure. */
  rowsAt: z.array(z.number()).default([]),
  /** Roll whole counts up to their value. Off when a mid-roll frame would
   *  read as a different, false result ("37 of 75 pass"). */
  count: z.boolean().default(true),
  /** When the source line appears. Provenance can sit on screen from the start. */
  sourceAt: z.number().optional(),
  /** Vertical step between rows, in stage px. */
  rowGap: z.number().default(62),
});
export type DescartesLedgerProps = z.infer<typeof descartesLedgerSchema>;

export const DescartesLedger: React.FC<DescartesLedgerProps> = (p_) => {
  const p = useP();
  const n = Math.max(1, p_.rows.length);
  const claimIn = ease(remap(p, 0.04, 0.13, 0, 1));
  return (
    <AbsoluteFill style={{ background: STAGE }}>
      <div style={{
        position: 'absolute', left: SAFE_L, right: 1280 - SAFE_R, top: 120,
        fontFamily: SERIF, fontSize: 46, color: SOFT, opacity: claimIn,
      }}>{p_.claim}</div>
      <div style={{
        position: 'absolute', left: SAFE_L, width: (SAFE_R - SAFE_L) * claimIn, top: 182,
        height: 3, background: INK, opacity: 0.35,
      }} />
      {p_.rows.map((r, i) => {
        const t0 = p_.rowsAt[i] ?? (0.18 + i * ((0.80 - 0.18) / Math.max(1, n - 1 || 1)));
        const s = ease(remap(p, t0, t0 + 0.10, 0, 1));
        const cnt = ease(remap(p, t0, t0 + 0.22, 0, 1));
        return (
          <div key={i} style={{
            position: 'absolute', left: SAFE_L, width: SAFE_R - SAFE_L, top: 214 + i * p_.rowGap,
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            opacity: s, transform: `translateY(${(1 - s) * 10}px)`,
          }}>
            <div style={{ fontFamily: SERIF, fontSize: 34, color: INK }}>{r.label}</div>
            <div style={{
              fontFamily: MONO, fontSize: 36, fontWeight: 600,
              color: r.damning ? SPARK : INK,
              transform: `translateX(${(1 - s) * 24}px) scale(${r.damning
                ? 1 + 0.18 * Math.sin(Math.PI * clamp(remap(p, t0 + 0.04, t0 + 0.14, 0, 1), 0, 1)) : 1})`,
              transformOrigin: 'right center',
            }}>{p_.count ? countUp(r.value, cnt) : r.value}</div>
          </div>
        );
      })}
      {p_.closing && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 612, textAlign: 'center',
          fontFamily: SERIF, fontSize: 36, color: INK,
          opacity: ease(remap(p, 0.86, 0.95, 0, 1)),
        }}>{p_.closing}</div>
      )}
      {p_.source && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 34, textAlign: 'center',
          fontFamily: SANS, fontSize: 28, color: SOFT,
          opacity: ease(remap(p, p_.sourceAt ?? 0.90, (p_.sourceAt ?? 0.90) + 0.08, 0, 1)),
        }}>{p_.source}</div>
      )}
      <SparkLine text={p_.sparkLine} />
    </AbsoluteFill>
  );
};
