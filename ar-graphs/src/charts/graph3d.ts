// src/charts/graph3d.ts
import * as THREE from 'three';

export function createGraph(nodes: number, edges: [number, number][]): THREE.Group {
  const group = new THREE.Group();
  const sphereMat = new THREE.MeshStandardMaterial({ color: 0xffbe0b });
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });

  const positions: THREE.Vector3[] = Array.from({ length: nodes }, (_, i) =>
    new THREE.Vector3(Math.cos((i / nodes) * Math.PI * 2), 0.1, Math.sin((i / nodes) * Math.PI * 2))
  );

  positions.forEach((p) => {
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.06), sphereMat);
    node.position.copy(p);
    group.add(node);
  });

  edges.forEach(([a, b]) => {
    const geo = new THREE.BufferGeometry().setFromPoints([positions[a], positions[b]]);
    const line = new THREE.Line(geo, lineMat);
    group.add(line);
  });

  return group;
}
