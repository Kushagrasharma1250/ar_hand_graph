# AR Hand Graphs

A React + TypeScript + Vite application for hand gesture detection and 3D visualization using MediaPipe.

## Features

- Real-time hand detection using MediaPipe
- 3D visualizations with Three.js
- Gesture recognition (pinch, open palm, point, swipe)
- WebGL-based rendering

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Deployment

### Netlify Deployment

This project is ready to deploy on Netlify. You can deploy it in several ways:

#### 1. Connect Git Repository (Recommended)

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose your Git provider and repository
4. Netlify will automatically detect the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

#### 2. Manual Deployment

```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### 3. Drag & Drop

1. Build the project: `npm run build`
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag the `dist` folder to deploy

## Environment Variables

Currently, no environment variables are required for basic functionality.

## Project Structure

```
src/
├── components/
│   ├── ThreeCanvas.tsx    - 3D canvas component
│   └── Webcam.tsx         - Webcam and hand detection
├── gestures/
│   ├── detector.ts        - Gesture detection logic
│   └── types.ts           - Type definitions
├── charts/
│   ├── bar3d.ts          - 3D bar chart
│   └── graph3d.ts        - 3D graph visualization
├── services/
│   ├── dataloader.ts     - Data loading utilities
│   └── persistence.ts    - Local storage management
├── state/
│   └── useStore.ts       - Zustand state management
└── App.tsx               - Main application component
```

## License

This project is open source.
