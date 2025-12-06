import { useEffect, useRef } from 'react';
import * as HandsModule from '@mediapipe/hands';
import * as CameraModule from '@mediapipe/camera_utils';

const { Hands } = HandsModule as any;
const { Camera } = CameraModule as any;

type Props = { onHands: (landmarks: any[]) => void };

export default function Webcam({ onHands }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });
    hands.onResults((res: any) => {
      onHands(res.multiHandLandmarks || []);
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !videoRef.current) return;
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      ctx.drawImage(
        res.image,
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
      // Optional: draw landmarks for debug
      res.multiHandLandmarks?.forEach((lm: any[]) => {
        ctx.fillStyle = '#00f';
        lm.forEach((p: any) => ctx.fillRect(p.x * canvasRef.current!.width, p.y * canvasRef.current!.height, 3, 3));
      });
    });

    const cam = new Camera(videoRef.current!, {
      onFrame: async () => await hands.send({ image: videoRef.current! }),
      width: 1280,
      height: 720,
    });
    cam.start();

    return () => {
      cam.stop();
      hands.close();
    };
  }, [onHands]);

  return (
    <div className="webcam">
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} width={1280} height={720} />
    </div>
  );
}