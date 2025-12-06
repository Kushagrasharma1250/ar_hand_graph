// src/components/ThreeCanvas.tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Props = {
  onSceneReady?: (ctx: { scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer }) => void;
};

export default function ThreeCanvas({ onSceneReady }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = mountRef.current!.clientWidth;
    const height = mountRef.current!.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current!.appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    scene.add(light);

    const axes = new THREE.AxesHelper(1.0);
    scene.add(axes);

    const clock = new THREE.Clock();
    const animate = () => {
      clock.getDelta();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mountRef.current!.clientWidth, h = mountRef.current!.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    onSceneReady?.({ scene, camera, renderer });

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      mountRef.current!.removeChild(renderer.domElement);
    };
  }, [onSceneReady]);

  return <div ref={mountRef} className="three-canvas" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />;
}