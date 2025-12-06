// src/App.tsx
import { useRef, useState } from 'react';
import Webcam from './components/Webcam';
import ThreeCanvas from './components/ThreeCanvas';
import { detectPinch, detectOpen, detectPoint, detectSwipe } from './gestures/detector';
import { createBarChart } from './charts/bar3d';
import { createGraph } from './charts/graph3d';
import { useStore } from './state/useStore';

export default function App() {
  const framesRef = useRef<any[]>([]);
  const [lastAction, setLastAction] = useState<string>('');
  const setScene = useStore((s: any) => (ctx: any) => Object.assign(s, ctx));

  const onHands = (hands: any[]) => {
    const lm = hands[0];
    if (!lm) return;
    const frame = { timestamp: performance.now(), landmarks: lm };
    framesRef.current.push(frame);
    if (framesRef.current.length > 10) framesRef.current.shift();

    if (detectPinch(frame)) {
      useStore.getState().addObject(createBarChart([0.4, 0.9, 0.2, 0.7]));
      setLastAction('Created bar chart');
    } else if (detectOpen(frame)) {
      useStore.getState().addObject(createGraph(8, [[0,1],[2,5],[3,7]]));
      setLastAction('Created graph');
    } else if (detectPoint(frame)) {
      setLastAction('Point (select)');
      // TODO: raycast to select object under pointer
    } else {
      const swipe = detectSwipe(framesRef.current);
      if (swipe === 'swipe-left' || swipe === 'swipe-right') {
        const scene = useStore.getState().scene as any;
        if (scene) scene.rotation.y += swipe === 'swipe-right' ? 0.1 : -0.1;
        setLastAction(`Rotate scene ${swipe}`);
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#000' }}>
      <Webcam onHands={onHands} />
      <ThreeCanvas onSceneReady={(ctx) => setScene(ctx as any)} />
      <div style={{ position: 'absolute', top: 12, left: 12, color: '#fff' }}>
        <strong>Last action:</strong> {lastAction}
      </div>
    </div>
  );
}