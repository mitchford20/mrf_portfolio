# Portfolio Box Grid

A modern, interactive portfolio template built with Next.js, TailwindCSS, shadcn/ui, and dnd-kit.

## Features
- **Draggable, animated grid** of info boxes (profile, skills, experience, projects, testimonials, etc.)
- **Dark/light mode toggle** (sun/moon switch, top right, persists your choice)
- **Varying box sizes** (small, medium, large)
- **Fully responsive to drag-and-drop** (desktop only)
- **Easy to customize**: add, remove, or resize boxes with a simple config

## Tech Stack
- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [TailwindCSS](https://tailwindcss.com/) (custom dark/light palette)
- [shadcn/ui](https://ui.shadcn.com/) (UI components)
- [dnd-kit](https://dndkit.com/) (drag-and-drop)

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the dev server:**
   ```bash
   npm run dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000)**

## Customizing Boxes
- Edit `src/components/draggable-grid.tsx`:
  - To **add a box**: add an object to the `initialBoxes` array (unique `id`, `size`, `title`, `content`).
  - To **change size**: set the `size` property to `'small'`, `'medium'`, or `'large'`.
  - To **change content**: edit the `title` and `content` fields.
- See code comments for more details.

## License
MIT
