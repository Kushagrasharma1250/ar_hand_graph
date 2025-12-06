// src/charts/bar3d.ts
import * as THREE from 'three';

export function createBarChart(data: number[]): THREE.Group {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color: 0x3a86ff });
  const spacing = 0.2;
  data.forEach((value, idx) => {
    const geom = new THREE.BoxGeometry(0.15, value, 0.15);
    const mesh = new THREE.Mesh(geom, material);
    mesh.position.set(idx * (0.15 + spacing), value / 2, 0);
    group.add(mesh);
  });
  // ground plane and axes
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({ color: 0x111, side: THREE.DoubleSide }));
  plane.rotation.x = -Math.PI / 2;
  group.add(plane);
  return group;
}
