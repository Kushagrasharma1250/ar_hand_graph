// src/gestures/types.ts
export type Gesture = "pinch" | "open" | "swipe-left" | "swipe-right" | "point";

export interface HandFrame {
  timestamp: number;
  landmarks: { x: number; y: number; z?: number }[];
}
