// src/state/useStore.ts
import { create } from "zustand";
import type * as THREE from "three";

type State = {
  scene?: THREE.Scene;
  camera?: THREE.PerspectiveCamera;
  selected?: THREE.Object3D | null;
  addObject: (obj: THREE.Object3D) => void;
  setSelected: (obj: THREE.Object3D | null) => void;
};

export const useStore = create<State>((set, get) => ({
  addObject: (obj) => {
    const scene = get().scene;
    if (scene) scene.add(obj);
  },
  setSelected: (obj) => set({ selected: obj }),
}));
