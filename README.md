# Plastic Sunset — 02

> A Y2K × Lo-Fi focus space. Built with React + Three.js.

## Overview

Plastic Sunset is an immersive digital workspace that blends Y2K aesthetics with Lo-Fi atmosphere.  
This version (**02**) is a refined iteration focused on UI clarity, performance options, and interaction polish.

## Features

- **3D Scene** — Sunset environment rendered with React Three Fiber, HDR lighting, and post-processing effects
- **Pomodoro Timer** — Focus / Break cycle with configurable durations and cycle count indicator
- **Music Player** — Lo-Fi BGM playlist with persistent playback across routes
- **Todo List** — Sticky notes with drag, edit, and color cycling
- **Stickers** — Draggable single-color icon stickers; double-click to remove
- **Settings** — Music volume, SFX volume, pixelation, and effects quality (tunes 3D performance)

## Changes in v02

- Added **Effects Quality** slider — controls Bloom, Pixelation, Vignette, camera wiggle, and shadow resolution
- Pixelation slider connected to live 3D scene
- Mood panel replaced with **icon sticker system** (12 Lucide icons, drag + double-click delete)
- Todolist clear button requires two-tap confirmation; clears stickers too
- Music player controls replaced with Lucide icons
- Pomodoro cycle indicator redesigned as dot progress row
- Pomodoro status label gains a color dot (green / blue / amber)
- Global scrollbar styled to match glassmorphism UI
- Settings page RWD fixed — fully scrollable, full viewport
- Lighting improved: hemisphere light, fill bounce light, shadow frustum tuning

## Stack

| | |
|---|---|
| Framework | React 18 + Vite |
| 3D | React Three Fiber · Three.js · @react-three/drei |
| Post-processing | @react-three/postprocessing |
| State | Zustand |
| Audio | Howler.js |
| Icons | Lucide React |
| Styling | Tailwind CSS v4 |
| Deploy | Firebase Hosting |

## Getting Started

```bash
npm install
npm run dev
```

## Credits

Music: [HoliznaCC0](https://freemusicarchive.org/music/holiznacc0/) — CC0 License
