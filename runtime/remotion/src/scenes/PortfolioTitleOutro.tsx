import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { z } from 'zod';
import { CLAUDE, CLAUDE_FONT } from '../tokens/claude';

/**
 * PortfolioTitleOutro — title-restate outro card for reels that are NOT
 * @NikBearBrown channel reels.
 *
 * WHY THIS EXISTS. `ClaudeTitleOutro` is the right shape — poster serif title
 * restate, terracotta terminal punctuation, handle beneath — but OUTRO-LOCK.md
 * hardcodes its handle to '@NikBearBrown' with "no prop, no lookup, no
 * override". A coursework portfolio film must carry its own author's credit
 * and must not carry an instructor's. `./art scenes "title restate outro card
 * with a handle"` returned ClaudeTitleOutro (locked) and MusiniqueOutroCard
 * (artist-attribution, wrong shape), so this is a logged PUNT.
 *
 * It keeps every part of the lock that is about the LOOK — exact title
 * restate, poster serif, terracotta period, handle beneath, no subline, the
 * two QC fill anchors — and changes only the part that is about WHOSE channel
 * it is. It draws no mascot, so PIXEL-ART LAW has nothing to bind here: grep
 * this file for `rotate` and it is zero because there are no rects to rotate.
 *
 * Polarity is slug-seeded exactly as the lock does it, so the card still
 * varies across reels and is still deterministic per reel.
 */

function seedHash(s: string): number {
  return Array.from(s || 'default').reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

export const portfolioTitleOutroSchema = z.object({
  // Production beat sheets MUST set this to the video's title verbatim.
  title: z.string().default('⚠ SET IN BEAT SHEET'),
  // The author's own handle or name. Required — this component exists so that
  // it is a prop. Never default it to a channel.
  handle: z.string().default('⚠ SET IN BEAT SHEET'),
  // slug seeds the light/dark polarity, as in OUTRO-LOCK.md §Randomness.
  slug: z.string().default(''),
  beatSeconds: z.number().optional(),
});
export type PortfolioTitleOutroProps = z.infer<typeof portfolioTitleOutroSchema>;

const SERIF = CLAUDE_FONT.serif;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export const PortfolioTitleOutro: React.FC<PortfolioTitleOutroProps> = ({ title, handle, slug }) => {
  const frame = useCurrentFrame();
  const o = clamp(interpolate(frame, [0, 14], [0, 1]), 0, 1);

  // Terminal punctuation in terracotta — the one accent on the card.
  const _pm = title.match(/^([\s\S]*?)\s*([.?!…]+)\s*$/);
  const titleBody = _pm ? _pm[1] : title;
  const titlePunct = _pm ? _pm[2] : '.';

  const seed = seedHash(slug || title);
  const isDark = seed % 2 === 1;
  const bg = isDark ? CLAUDE.INK : CLAUDE.PAGE;
  const fg = isDark ? CLAUDE.PAGE : CLAUDE.INK;
  const fgSend = isDark ? CLAUDE.PAGE : CLAUDE.SEND;

  return (
    <AbsoluteFill style={{
      background: bg,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      opacity: o,
    }}>
      {/* QC fill anchors — see ClaudeTitleOutro; bottom anchor clears the
          burn-in exclusion strip at y = 0.94 × 1080. */}
      <div style={{ position: 'absolute', left: 96, top: 54, width: 3, height: 3, background: '#D4D4D4' }} />
      <div style={{ position: 'absolute', right: 96, bottom: 123, width: 3, height: 3, background: '#D4D4D4' }} />

      <div style={{
        fontFamily: SERIF,
        fontWeight: 700,
        fontSize: 72,
        color: fg,
        letterSpacing: '-0.02em',
        textAlign: 'center',
        lineHeight: 1.08,
        maxWidth: 1080,
        padding: '0 60px',
      }}>
        {titleBody}
        <span style={{ color: fgSend }}>{titlePunct}</span>
      </div>

      <div style={{
        fontFamily: SERIF,
        fontSize: 52,
        color: fg,
        marginTop: 28,
        opacity: 0.9,
      }}>
        {handle}
      </div>
    </AbsoluteFill>
  );
};
