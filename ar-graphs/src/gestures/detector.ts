// src/gestures/detectors.ts
import type { Gesture, HandFrame } from './types';

// Pinch: distance between thumb tip (4) and index tip (8) below threshold
export function detectPinch(frame: HandFrame): boolean {
  const t = frame.landmarks[4], i = frame.landmarks[8];
  if (!t || !i) return false;
  const dx = t.x - i.x, dy = t.y - i.y;
  const d = Math.hypot(dx, dy);
  return d < 0.04; // tune
}

// Open palm: fingertip spread and palm area heuristic
export function detectOpen(frame: HandFrame): boolean {
  const tips = [8, 12, 16, 20].map(i => frame.landmarks[i]);
  if (tips.some((p) => !p)) return false;
  const spread = Math.max(...tips.map(p => p.x)) - Math.min(...tips.map(p => p.x));
  return spread > 0.25;
}

// Point: index extended, others curled (simple y distance heuristic)
export function detectPoint(frame: HandFrame): boolean {
  const iTip = frame.landmarks[8], mTip = frame.landmarks[12];
  if (!iTip || !mTip) return false;
  return (mTip.y - iTip.y) > 0.08;
}

// Swipe: based on recent centroid velocity
export function detectSwipe(frames: HandFrame[]): Gesture | null {
  if (frames.length < 3) return null;
  const centroid = (f: HandFrame) => {
    const pts = f.landmarks.filter(Boolean);
    const x = pts.reduce((s: number, p: any) => s + p.x, 0) / pts.length;
    return x;
  };
  const x0 = centroid(frames[0]);
  const xN = centroid(frames[frames.length - 1]);
  const dx = xN - x0;
  if (dx > 0.15) return 'swipe-right';
  if (dx < -0.15) return 'swipe-left';
  return null;
}