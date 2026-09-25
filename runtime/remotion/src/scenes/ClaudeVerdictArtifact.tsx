import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { z } from 'zod';
import { CLAUDE, CLAUDE_FONT } from '../tokens/claude';

/**
 * ClaudeVerdictArtifact — reusable verdict/artifact page in the Claude fidelity skin.
 * Renders an artifact window card (cream stage, white card, staggered lines).
 * Per ILLUSTRATE LAW this is a UI beat (verdict) — the Claude UI is the subject here.
 *
 * 2026-07 (your-turn skill): card enlarged from 860px to fill the frame at
 * legible size (was a ~45%-width UI mock marooned in dead space). Line numbers
 * are drawn by the component from list position; a defensive sanitizer strips
 * any leading "N." / "N)" an author typed into a line so the number never
 * renders twice. Feed artifactLines as BARE sentences.
 */

export const claudeVerdictArtifactSchema = z.object({
  artifactTitle: z.string().default('Verdict'),
  artifactHeading: z.string().default('The split'),
  brandLabel: z.string().optional(),
  artifactLines: z.array(z.string()).default([
    'Chat: synchronous judgment — you, in the loop.',
    'Cowork: asynchronous recipes — runs while you rehearse.',
    'Code: the pipeline room — systems you own.',
  ]),
});
export type ClaudeVerdictArtifactProps = z.infer<typeof claudeVerdictArtifactSchema>;

const SERIF = CLAUDE_FONT.serif;
const SANS = CLAUDE_FONT.ui;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

// Strip a leading "1." / "2)" / "3 -" an author may have typed into the line —
// the component owns the numbering, so authored digits would double-render.
const stripLeadNum = (s: string) => s.replace(/^\s*\d+\s*[.)\-–—:]\s*/, '');


export const ClaudeVerdictArtifact: React.FC<ClaudeVerdictArtifactProps> = ({
  artifactTitle, artifactHeading, artifactLines, brandLabel,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, durationInFrames } = useVideoConfig();

  const cardIn = spring({ frame, fps, config: { damping: 28, stiffness: 140, mass: 0.8 } });
  const headIn = spring({ frame: frame - 8, fps, config: { damping: 28, stiffness: 140, mass: 0.8 } });

  // Fill the frame: ~88% of width, capped so ultrawide stays readable.
  const cardW = Math.min(width * 0.92, 1760);
  const lines = (artifactLines ?? []).map(stripLeadNum);

  // FILL-THE-CANVAS: type scales to the room the line count leaves. Short
  // verdicts rendered at ~52% of the safe area on a fixed 28px body. Reels
  // with 6+ lines keep the original sizes, so existing cuts are unchanged.
  const n = lines.length;
  const bodySize = n <= 4 ? 48 : n <= 5 ? 44 : n <= 6 ? 34 : 28;
  const headSize = n <= 5 ? 74 : n <= 6 ? 54 : 46;
  const lineGap = n <= 5 ? 46 : n <= 6 ? 32 : 26;

  return (
    <AbsoluteFill style={{ background: '#F2F0E9', alignItems: 'center', justifyContent: 'center' }}>
      {brandLabel && <div style={{position:'absolute',right:width*.07,bottom:'6.5%',fontFamily:SERIF,fontSize:28,color:CLAUDE.INK}}>{brandLabel}</div>}
      {/* Artifact card */}
      <div style={{
        width: cardW,
        background: CLAUDE.CARD,
        borderRadius: 24,
        boxShadow: '0 20px 72px rgba(61,57,41,0.16)',
        border: `1px solid ${CLAUDE.BORDER}`,
        overflow: 'hidden',
        transform: `scale(${clamp(cardIn, 0, 1)})`,
        opacity: clamp(cardIn, 0, 1),
      }}>
        {/* Title bar */}
        <div style={{
          background: CLAUDE.PAGE, borderBottom: `1px solid ${CLAUDE.BORDER}`,
          padding: '22px 40px', display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <span style={{ fontFamily: SERIF, fontSize: 30, color: CLAUDE.INK, fontWeight: 600 }}>
            {artifactTitle}
          </span>
        </div>

        {/* Artifact body */}
        <div style={{ padding: '48px 60px 54px' }}>
          {/* Heading */}
          <div style={{
            fontFamily: SERIF, fontSize: headSize, fontWeight: 700, color: CLAUDE.INK,
            marginBottom: 36,
            opacity: clamp(headIn, 0, 1),
          }}>
            {artifactHeading}
          </div>

          {/* Lines */}
          {lines.map((line, i) => {
            // Stagger across the beat, not a fixed 7-frame offset. The old
            // spacing landed every line inside ~2s, so an 18s verdict beat sat
            // static for 16s. Lines now finish arriving at ~80% of the beat.
            const slot = Math.max(7, (durationInFrames * 0.80 - 16) / Math.max(1, lines.length));
            const lineIn = spring({ frame: frame - (16 + i * slot), fps, config: { damping: 28, stiffness: 140, mass: 0.8 } });
            const op = clamp(lineIn, 0, 1);
            const ty = (1 - op) * 12;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 22,
                marginBottom: lineGap, opacity: op, transform: `translateY(${ty}px)`,
              }}>
                <span style={{ fontFamily: SANS, fontSize: bodySize, color: CLAUDE.SPARK, flexShrink: 0, marginTop: 3, fontWeight: 700 }}>
                  {i + 1}.
                </span>
                <span style={{ fontFamily: SANS, fontSize: bodySize, color: CLAUDE.INK, lineHeight: 1.55 }}>
                  {line}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
