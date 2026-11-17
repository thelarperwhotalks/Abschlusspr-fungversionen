# Deutsches Kaiserreich · 1871–1918

A German-language educational site introducing the German Empire through a short historical overview, key dates, interactive map comparisons of current borders and Europe in 1914, family trees, and a learning area.

## Project map

- `app/` — Next.js App Router pages and global styles
  - `geschichte/` — empire history, institutions, society, and timeline
  - `entdeckerkarte/` — interactive present-day and 1914 map comparisons
  - `familie/` — Hohenzollern and Bismarck family trees
  - `wissenstrainer/` — interactive learning modes
  - `quellen/` — further reading and project credits
- `components/` — reusable page features and navigation
- `lib/trainer-data.ts` — quiz questions, glossary, and timeline data
- `public/` — static images and other public assets
- `versions/` — preserved baseline source snapshots and release notes

## Historical map note

The map comparison uses Natural Earth / `world-atlas` for current country outlines and the CC BY 4.0 dataset “Map of Europe, c. 1914” by Jack Kavanagh (Zenodo, DOI 10.5281/zenodo.21341486) for historical boundaries. The 1914 view is clipped to Europe and presents a single historical snapshot; it does not show every internal administrative boundary.

## Technology

Next.js App Router, React, TypeScript, `react-simple-maps`, and Tailwind CSS 4. Package management uses pnpm.
