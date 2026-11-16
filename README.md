# Deutsches Kaiserreich · 1871–1918

A German-language educational site introducing the German Empire through a short historical overview, key dates, a geographic orientation map, family trees, and a learning area. The Verdun 3D time-lapse remains available as a focused example from the First World War.

## Project map

- `app/` — Next.js App Router pages and global styles
  - `geschichte/` — empire history, institutions, society, and timeline
  - `entdeckerkarte/` — geographic orientation map for 1914
  - `familie/` — Hohenzollern and Bismarck family trees
  - `schlachtfeld/` — Verdun 3D time-lapse
  - `wissenstrainer/` — interactive learning modes
  - `quellen/` — further reading and project credits
- `components/` — reusable page features and navigation
- `lib/trainer-data.ts` — quiz questions, glossary, and timeline data
- `public/` — static images and other public assets
- `versions/` — preserved baseline source snapshots and release notes

## Historical map note

The map is a geographic orientation aid: it uses present-day country outlines and labels selected places associated with the 1914 empire. It does not claim to reproduce the exact borders or internal administrative boundaries of 1914. Refer to the linked historical map collections for exact boundaries.

## Technology

Next.js App Router, React, TypeScript, Three.js, `react-simple-maps`, and Tailwind CSS 4. Package management uses pnpm.
