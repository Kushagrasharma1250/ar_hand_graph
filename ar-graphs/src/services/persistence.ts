// src/services/persistence.ts
import * as THREE from 'three';

export function saveScene(scene: THREE.Scene) {
  const payload = scene.children.map((o: THREE.Object3D) => ({ type: o.type, pos: o.position.toArray() }));
  localStorage.setItem('scene', JSON.stringify(payload));
}
export function loadScene(_scene: THREE.Scene) {
  JSON.parse(localStorage.getItem('scene') || '[]');
  // Recreate objects as needed based on type
}