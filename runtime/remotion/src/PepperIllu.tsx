/**
 * PepperIllu.tsx — figures for pepper-context-and-access
 * ("What It Had to Guess").
 *
 * GATE L note: `./art scenes` was run for every beat before authoring. It
 * returned no component for (a) a rough request expanding into six labelled
 * prompt sections, (b) an access ladder where the cost of missing context
 * grows with permission, (c) a prompt with a held-out assumptions block, or
 * (d) a three-way product comparison with a per-column gap line. Those four
 * are a logged PUNT built as new components, not slated. The remaining beats
 * REUSE library components (DescartesLedger / Correction / Checklist /
 * Protocol / Split, ClaudeVerdictArtifact, ClaudeComposerAsk) — a hit is a
 * lead, and those five are generic shapes with generic props.
 *
 * These are written FOR the context/access argument. The grammar is the
 * LABELLED BOX: context that is named is context you can check, and the only
 * honest thing to do with context you do not have is leave it outside the box.
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
 *   PepperSixParts | PepperAccessLadder | PepperAssumptions | PepperAlternatives
 *   PepperScreenshot
 */
import React from 'react';
import { z } from 'zod';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { SparkLine, useP, clamp, remap, ease, SERIF, SANS, MONO, STAGE } from './illustrations/kit';
import { CLAUDE } from './tokens/claude';

const INK = CLAUDE.INK;
const SOFT = CLAUDE.INK_SOFT;
const SPARK = CLAUDE.SPARK;
const SAFE_L = 74;
const SAFE_R = 1206;
const SAFE_W = SAFE_R - SAFE_L;

// ══════════════════════════════════════════════════════════════════════════
// PepperSixParts — a rough request at the top, then the six labelled sections
// it becomes. Each section arrives with the one thing it is FOR, so the
// viewer reads the contract rather than admiring a layout.
// ══════════════════════════════════════════════════════════════════════════
export const pepperSixPartsSchema = z.object({
  beatSeconds: z.number().optional(),
  sparkLine: z.string().default('Six named parts.'),
  rough: z.string().default('help me write a cover letter'),
  roughLabel: z.string().default('WHAT YOU TYPE'),
  roughAt: z.number().optional(),
  /** When set, all six numbered slots and their rules appear here (as the
   *  count is spoken); each label and purpose still lands on its own word. */
  slotsAt: z.number().optional(),
  parts: z.array(z.object({ k: z.string(), v: z.string() })).default([]),
  /** Start fraction per part, aligned to the narration. */
  partsAt: z.array(z.number()).default([]),
  footer: z.string().default(''),
  footerAt: z.number().optional(),
});
export type PepperSixPartsProps = z.infer<typeof pepperSixPartsSchema>;

export const PepperSixParts: React.FC<PepperSixPartsProps> = (p_) => {
  const p = useP();
  const rA = p_.roughAt ?? 0.03;
  const rIn = ease(remap(p, rA, rA + 0.10, 0, 1));
  const n = p_.parts.length || 1;
  // Two columns of three; the last part must COMPLETE by ~0.86.
  const gap = n > 1 ? (0.74 - 0.26) / (n - 1) : 0;
  const colW = Math.floor((SAFE_W - 56) / 2);

  return (
    <AbsoluteFill style={{ background: STAGE }}>
      {/* the rough request — mono, quoted, deliberately thin */}
      <div style={{
        position: 'absolute', left: SAFE_L, width: SAFE_W, top: 112,
        textAlign: 'center', opacity: rIn, transform: `translateY(${(1 - rIn) * 12}px)`,
      }}>
        <div style={{ fontFamily: SANS, fontSize: 24, letterSpacing: '0.14em', color: SOFT }}>
          {p_.roughLabel}
        </div>
        <div style={{ fontFamily: MONO, fontSize: 46, color: INK, marginTop: 10 }}>
          &ldquo;{p_.rough}&rdquo;
        </div>
      </div>

      {/* the rule that separates the ask from the contract */}
      <div style={{
        position: 'absolute', left: SAFE_L + 150, width: SAFE_W - 300, top: 226,
        height: 3, background: SPARK, opacity: 0.9 * rIn,
      }} />

      {p_.parts.map((part, i) => {
        const t0 = p_.partsAt[i] ?? (0.26 + i * gap);
        const a = ease(remap(p, t0, t0 + 0.10, 0, 1));
        const s = p_.slotsAt === undefined ? a
          : ease(remap(p, p_.slotsAt + i * 0.012, p_.slotsAt + i * 0.012 + 0.06, 0, 1));
        const col = i % 2;
        const row = Math.floor(i / 2);
        return (
          <div key={i} style={{
            position: 'absolute',
            left: SAFE_L + col * (colW + 56), width: colW,
            top: 268 + row * 128,
            opacity: Math.max(a, s), transform: `translateY(${(1 - s) * 14}px)`,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
              <div style={{
                fontFamily: SANS, fontSize: 20, fontWeight: 700, color: a > 0.5 ? INK : SOFT,
                border: `2px solid ${a > 0.5 ? INK : SOFT}`, borderRadius: 6, padding: '1px 8px',
                transform: `scale(${1 + 0.22 * Math.sin(Math.PI * a)})`,
              }}>{i + 1}</div>
              <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 700, letterSpacing: '0.06em', color: INK, opacity: a }}>
                {part.k}
              </div>
            </div>
            <div style={{
              marginTop: 6, marginLeft: 44, width: colW - 44,
              fontFamily: SERIF, fontSize: 30, color: INK, lineHeight: 1.22, opacity: a,
            }}>{part.v}</div>
            <div style={{ marginTop: 10, marginLeft: 44, width: colW - 44, height: 2, background: INK, opacity: 0.22 }} />
          </div>
        );
      })}

      {p_.footer && (
        <div style={{
          position: 'absolute', left: SAFE_L, width: SAFE_W, top: 648, textAlign: 'center',
          fontFamily: SANS, fontSize: 30, color: SOFT,
          opacity: ease(remap(p, p_.footerAt ?? 0.88, (p_.footerAt ?? 0.88) + 0.07, 0, 1)),
        }}>{p_.footer}</div>
      )}
      <SparkLine text={p_.sparkLine} />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// PepperAccessLadder — the argument. Four rungs of growing access; the bar
// beside each is what MISSING CONTEXT costs at that rung. The bars grow as
// the rungs land, and a marker shows where this tool deliberately stops.
// ══════════════════════════════════════════════════════════════════════════
export const pepperAccessLadderSchema = z.object({
  beatSeconds: z.number().optional(),
  sparkLine: z.string().default('Access raises the stakes.'),
  axisLabel: z.string().default('COST OF THE CONTEXT IT DID NOT HAVE'),
  rungs: z.array(z.object({
    label: z.string(),
    note: z.string().default(''),
    cost: z.number(),           // 0..1 — bar width fraction
    stop: z.boolean().optional(), // the rung this tool refuses to pass
  })).default([]),
  rungsAt: z.array(z.number()).default([]),
  /** When set, every rung's label shows faint from here; each comes to full
   *  strength, with its bar, on its own words. */
  slotsAt: z.number().optional(),
  footer: z.string().default(''),
  footerAt: z.number().optional(),
});
export type PepperAccessLadderProps = z.infer<typeof pepperAccessLadderSchema>;

export const PepperAccessLadder: React.FC<PepperAccessLadderProps> = (p_) => {
  const p = useP();
  const n = p_.rungs.length || 1;
  const gap = n > 1 ? (0.70 - 0.16) / (n - 1) : 0;
  const labelW = 430;
  const barX = SAFE_L + labelW + 28;
  const barMax = SAFE_R - barX - 36;
  const headIn = ease(remap(p, 0.04, 0.12, 0, 1));

  return (
    <AbsoluteFill style={{ background: STAGE }}>
      <div style={{
        position: 'absolute', left: barX, top: 120, width: barMax,
        fontFamily: SANS, fontSize: 22, letterSpacing: '0.12em', color: SOFT,
        opacity: headIn,
      }}>{p_.axisLabel}</div>
      <div style={{
        position: 'absolute', left: barX, top: 150, width: barMax, height: 2,
        background: INK, opacity: 0.3 * headIn,
      }} />

      {p_.rungs.map((r, i) => {
        const t0 = p_.rungsAt[i] ?? (0.16 + i * gap);
        const a = ease(remap(p, t0, t0 + 0.09, 0, 1));
        const g = clamp(remap(p, t0 + 0.02, t0 + 0.10, 0, 1), 0, 1);
        const grow = g >= 1 ? 1 : 1 + 2.2 * Math.pow(g - 1, 3) + 1.2 * Math.pow(g - 1, 2); // ease-out-back
        const y = 184 + i * 112;
        const isStop = !!r.stop;
        const sl = p_.slotsAt === undefined ? a
          : ease(remap(p, p_.slotsAt + i * 0.02, p_.slotsAt + i * 0.02 + 0.06, 0, 1));
        return (
          <div key={i}>
            <div style={{
              position: 'absolute', left: SAFE_L, top: y, width: labelW,
              opacity: Math.max(a, 0.3 * sl), transform: `translateX(${(1 - sl) * -16}px)`,
            }}>
              <div style={{
                fontFamily: SERIF, fontSize: 34, color: INK, lineHeight: 1.15,
              }}>{r.label}</div>
              {r.note && (
                <div style={{ fontFamily: SANS, fontSize: 22, color: SOFT, marginTop: 4 }}>{r.note}</div>
              )}
            </div>
            {/* the cost bar */}
            <div style={{
              position: 'absolute', left: barX, top: y + 8,
              width: Math.max(3, Math.min(barMax, barMax * clamp(r.cost, 0, 1) * grow)), height: 34,
              background: isStop ? SPARK : INK, opacity: (isStop ? 0.95 : 0.78) * a,
            }} />
            {/* the stop marker — a hard ink rule BELOW the stop rung: this tool does the
                rung, and does not cross into the next one */}
            {isStop && (
              <div style={{
                position: 'absolute', left: SAFE_L, top: y + 96,
                width: SAFE_W * a, height: 3, background: INK, opacity: 0.85,
              }} />
            )}
          </div>
        );
      })}

      {p_.footer && (
        <div style={{
          position: 'absolute', left: SAFE_L, width: SAFE_W, top: 640, textAlign: 'center',
          fontFamily: SERIF, fontSize: 34, color: INK,
          opacity: ease(remap(p, p_.footerAt ?? 0.84, (p_.footerAt ?? 0.84) + 0.08, 0, 1)),
        }}>{p_.footer}</div>
      )}
      <SparkLine text={p_.sparkLine} />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// PepperAssumptions — the held-out block. The prompt builds above the rule;
// everything the writer had to GUESS falls below it and stays there, dimmed
// and outside, until a person ticks it in. Nothing crosses on its own.
// ══════════════════════════════════════════════════════════════════════════
export const pepperAssumptionsSchema = z.object({
  beatSeconds: z.number().optional(),
  sparkLine: z.string().default('What it had to guess.'),
  promptLabel: z.string().default('GOES IN THE PROMPT'),
  promptLines: z.array(z.string()).default([]),
  promptAt: z.array(z.number()).default([]),
  marker: z.string().default('===ASSUMPTIONS==='),
  markerAt: z.number().optional(),
  assumptionsLabel: z.string().default('NEVER INSERTED UNTIL YOU CONFIRM IT'),
  assumptions: z.array(z.string()).default([]),
  assumptionsAt: z.array(z.number()).default([]),
  footer: z.string().default(''),
  footerAt: z.number().optional(),
});
export type PepperAssumptionsProps = z.infer<typeof pepperAssumptionsSchema>;

export const PepperAssumptions: React.FC<PepperAssumptionsProps> = (p_) => {
  const p = useP();
  const nP = p_.promptLines.length || 1;
  const pGap = nP > 1 ? (0.30 - 0.08) / (nP - 1) : 0;
  const mAt = p_.markerAt ?? 0.40;
  const mIn = ease(remap(p, mAt, mAt + 0.08, 0, 1));
  const nA = p_.assumptions.length || 1;
  const aGap = nA > 1 ? (0.80 - 0.50) / (nA - 1) : 0;

  return (
    <AbsoluteFill style={{ background: STAGE }}>
      <div style={{
        position: 'absolute', left: SAFE_L, top: 104,
        fontFamily: SANS, fontSize: 22, letterSpacing: '0.12em', color: SOFT,
        opacity: ease(remap(p, 0.04, 0.10, 0, 1)),
      }}>{p_.promptLabel}</div>

      {p_.promptLines.map((l, i) => {
        const t0 = p_.promptAt[i] ?? (0.08 + i * pGap);
        const a = ease(remap(p, t0, t0 + 0.07, 0, 1));
        return (
          <div key={i} style={{
            position: 'absolute', left: SAFE_L, width: SAFE_W, top: 140 + i * 56,
            fontFamily: MONO, fontSize: 32, color: INK,
            opacity: a, transform: `translateX(${(1 - a) * -12}px)`,
          }}>{l}</div>
        );
      })}

      {/* the marker rule — the whole contract in one line of type */}
      <div style={{
        position: 'absolute', left: SAFE_L, width: SAFE_W, top: 148 + nP * 56,
        opacity: mIn,
      }}>
        <div style={{ height: 3, background: SPARK, width: SAFE_W }} />
        <div style={{
          fontFamily: MONO, fontSize: 32, color: SPARK, marginTop: 10, letterSpacing: '0.04em',
        }}>{p_.marker}</div>
        <div style={{ fontFamily: SANS, fontSize: 22, letterSpacing: '0.12em', color: SOFT, marginTop: 6 }}>
          {p_.assumptionsLabel}
        </div>
      </div>

      {p_.assumptions.map((l, i) => {
        const t0 = p_.assumptionsAt[i] ?? (0.50 + i * aGap);
        const a = ease(remap(p, t0, t0 + 0.08, 0, 1));
        return (
          <div key={i} style={{
            position: 'absolute', left: SAFE_L + 26, width: SAFE_W - 26,
            top: 232 + nP * 56 + i * 52,
            display: 'flex', alignItems: 'center', gap: 18,
            opacity: a, transform: `translateY(${(1 - a) * -10}px)`,
          }}>
            <div style={{ width: 26, height: 26, flexShrink: 0, border: `3px solid ${SOFT}`, borderRadius: 5 }} />
            <div style={{ fontFamily: SERIF, fontSize: 34, color: SOFT }}>{l}</div>
          </div>
        );
      })}

      {p_.footer && (
        <div style={{
          position: 'absolute', left: SAFE_L, width: SAFE_W, top: 640, textAlign: 'center',
          fontFamily: SERIF, fontSize: 30, color: INK,
          opacity: ease(remap(p, p_.footerAt ?? 0.88, (p_.footerAt ?? 0.88) + 0.07, 0, 1)),
        }}>{p_.footer}</div>
      )}
      <SparkLine text={p_.sparkLine} pos="top" />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// PepperAlternatives — three columns that arrive in order. Each carries the
// product's OWN words and, beneath an ink rule, the one thing it does not do.
// The third column's gap line is the only terracotta on the frame.
// ══════════════════════════════════════════════════════════════════════════
export const pepperAlternativesSchema = z.object({
  beatSeconds: z.number().optional(),
  sparkLine: z.string().default('Two I actually looked at.'),
  columns: z.array(z.object({
    name: z.string(),
    source: z.string().default(''),
    quote: z.string().default(''),
    gap: z.string().default(''),
    mine: z.boolean().optional(),
  })).default([]),
  columnsAt: z.array(z.number()).default([]),
  /** Start fraction per gap line, aligned to the spoken contrast. */
  gapsAt: z.array(z.number()).default([]),
  footer: z.string().default(''),
  footerAt: z.number().optional(),
});
export type PepperAlternativesProps = z.infer<typeof pepperAlternativesSchema>;

export const PepperAlternatives: React.FC<PepperAlternativesProps> = (p_) => {
  const p = useP();
  const n = p_.columns.length || 1;
  const gapT = n > 1 ? (0.62 - 0.12) / (n - 1) : 0;
  const gutter = 34;
  const colW = Math.floor((SAFE_W - gutter * (n - 1)) / n);

  return (
    <AbsoluteFill style={{ background: STAGE }}>
      {p_.columns.map((c, i) => {
        const t0 = p_.columnsAt[i] ?? (0.12 + i * gapT);
        const a = ease(remap(p, t0, t0 + 0.10, 0, 1));
        const g0 = p_.gapsAt[i] ?? (t0 + 0.08);
        const gIn = ease(remap(p, g0, g0 + 0.10, 0, 1));
        const x = SAFE_L + i * (colW + gutter);
        return (
          <div key={i}>
            <div style={{
              position: 'absolute', left: x, top: 118, width: colW, height: 124,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              opacity: a, transform: `translateY(${(1 - a) * 14}px)`,
            }}>
              <div style={{
                fontFamily: SANS, fontSize: 28, fontWeight: 700, color: INK, lineHeight: 1.2,
              }}>{c.name}</div>
              {c.source && (
                <div style={{ fontFamily: SANS, fontSize: 22, color: SOFT, marginTop: 4 }}>{c.source}</div>
              )}
            </div>
            <div style={{
              position: 'absolute', left: x, top: 252, width: colW,
              opacity: a, transform: `translateY(${(1 - a) * 14}px)`,
            }}>
              <div style={{ height: 2, background: INK, opacity: 0.28, width: colW * a }} />
              <div style={{
                fontFamily: SERIF, fontSize: 30, color: INK, marginTop: 14, lineHeight: 1.24,
              }}>{c.quote}</div>
            </div>
            {/* the gap line, under a second rule — what it does not do */}
            <div style={{
              position: 'absolute', left: x, top: 452, width: colW, opacity: gIn,
            }}>
              <div style={{ height: 3, background: c.mine ? SPARK : INK, opacity: c.mine ? 0.95 : 0.3, width: colW * gIn }} />
              <div style={{
                fontFamily: SERIF, fontSize: 30, marginTop: 14, lineHeight: 1.24,
                color: c.mine ? INK : SOFT,
                fontWeight: c.mine ? 700 : 400,
              }}>{c.gap}</div>
            </div>
          </div>
        );
      })}

      {p_.footer && (
        <div style={{
          position: 'absolute', left: SAFE_L, width: SAFE_W, top: 648, textAlign: 'center',
          fontFamily: SANS, fontSize: 28, color: SOFT,
          opacity: ease(remap(p, p_.footerAt ?? 0.86, (p_.footerAt ?? 0.86) + 0.08, 0, 1)),
        }}>{p_.footer}</div>
      )}
      <SparkLine text={p_.sparkLine} />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// PepperScreenshot — a REAL screenshot, never a mock-up, moved by a camera.
// The camera walks between rectangles given in the image's own pixels, and a
// terracotta ring marks the region the narration is about. The caption
// carries the provenance — where the image came from and when — on screen.
//
// GATE L: `./art scenes` returned no component for a real screenshot with a
// camera move to a named region (HaiExplainerFig3Command is a "house-style
// mock (not a screenshot)"), so this is a logged PUNT.
// The pixels are the captured application's. Nothing is redrawn over the
// image except the ring, which is outside the image's own UI.
// ══════════════════════════════════════════════════════════════════════════
const rectZ = z.object({ x: z.number(), y: z.number(), w: z.number(), h: z.number() });
type Rect = z.infer<typeof rectZ>;

export const pepperScreenshotSchema = z.object({
  beatSeconds: z.number().optional(),
  sparkLine: z.string().default('The real panel.'),
  src: z.string().default('pepper/panel-result-model-2026-10-10.png'),
  imgW: z.number().default(1280),
  imgH: z.number().default(860),
  /** Camera keyframes: the image-pixel rect that fills the window from `at`. */
  shots: z.array(z.object({ at: z.number(), rect: rectZ })).default([]),
  /** Rings drawn around image-pixel rects, from `at` until `until` (default: end). */
  rings: z.array(z.object({ at: z.number(), until: z.number().optional(), rect: rectZ })).default([]),
  caption: z.string().default(''),
});
export type PepperScreenshotProps = z.infer<typeof pepperScreenshotSchema>;

const VX = SAFE_L, VY = 100, VW = SAFE_W, VH = 522;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const PepperScreenshot: React.FC<PepperScreenshotProps> = (p_) => {
  const p = useP();
  const full: Rect = { x: 0, y: 0, w: p_.imgW, h: p_.imgH };
  const shots = p_.shots.length ? p_.shots : [{ at: 0, rect: full }];

  // camera: hold each shot, ease into the next over 0.07 of the beat
  let cam: Rect = shots[0].rect;
  for (let i = 1; i < shots.length; i++) {
    const t = ease(remap(p, shots[i].at, shots[i].at + 0.07, 0, 1));
    if (t <= 0) break;
    const a = cam, b = shots[i].rect;
    cam = { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), w: lerp(a.w, b.w, t), h: lerp(a.h, b.h, t) };
  }
  const drift = 1 + 0.025 * p;                       // ~2.5% push across the beat
  const s = Math.min(VW / cam.w, VH / cam.h) * drift;
  const ox = VX + VW / 2 - (cam.x + cam.w / 2) * s;
  const oy = VY + VH / 2 - (cam.y + cam.h / 2) * s;
  const inIn = ease(remap(p, 0.0, 0.05, 0, 1));

  return (
    <AbsoluteFill style={{ background: STAGE }}>
      {/* the window — clips the image to the viewport */}
      <div style={{
        position: 'absolute', left: VX, top: VY, width: VW, height: VH, overflow: 'hidden',
        border: `3px solid ${INK}`, borderRadius: 10, background: '#212121', opacity: inIn,
      }}>
        <Img src={staticFile(p_.src)} style={{
          position: 'absolute', left: ox - VX - 3, top: oy - VY - 3,
          width: p_.imgW * s, height: p_.imgH * s,
        }} />
        {p_.rings.map((r, i) => {
          const a = ease(remap(p, r.at, r.at + 0.05, 0, 1)) * (1 - ease(remap(p, r.until ?? 2, (r.until ?? 2) + 0.04, 0, 1)));
          const pad = 6;
          return (
            <div key={i} style={{
              position: 'absolute',
              left: ox - VX - 3 + r.rect.x * s - pad, top: oy - VY - 3 + r.rect.y * s - pad,
              width: r.rect.w * s + pad * 2, height: r.rect.h * s + pad * 2,
              border: `5px solid ${SPARK}`, borderRadius: 10, opacity: a,
            }} />
          );
        })}
      </div>

      {p_.caption && (
        <div style={{
          position: 'absolute', left: SAFE_L, width: SAFE_W, top: 640, textAlign: 'center',
          fontFamily: SANS, fontSize: 24, color: SOFT, opacity: inIn,
        }}>{p_.caption}</div>
      )}
      <SparkLine text={p_.sparkLine} />
    </AbsoluteFill>
  );
};
