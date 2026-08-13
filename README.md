# Brand Professor — Experience Engine

Futuristic website for **Brand Professor** (Events & Exhibitions). Built as a technical evaluation assignment: light green/white brand identity, interactive 3D production storytelling, Live Mission Planner, and an in-product Event Brief Assistant.

> **Live site:** https://SanjanaGowda0074.github.io/brand-professor/  
> **Repository:** https://github.com/SanjanaGowda0074/brand-professor

---

## Submission summary

### 1. Working website
Hosted on **GitHub Pages**:

`https://SanjanaGowda0074.github.io/brand-professor/`

### 2. Source code
This repository is the full source. Share the GitHub repo link in your submission.

### 3. Technology stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 16** (App Router) + **TypeScript** |
| UI | **Tailwind CSS v4** + Brand Professor design tokens |
| 3D | **Three.js** + **React Three Fiber** + **Drei** |
| Motion | **Framer Motion** + **Lenis** (desktop smooth scroll) |
| Product tools | **Live Mission Planner** + **Event Brief Assistant** |
| Fonts | **Syne** (display) + **Outfit** (body) |
| Hosting | **GitHub Pages** (static export) |

### 4. Research & assets

- Brand research from [brandprofessor.in](https://brandprofessor.in/) and [brandprofesor.com](https://brandprofesor.com/)
- Official logo from Brand Professor’s existing brand assets
- Contact: Bangalore · +91 99011 19191 · WhatsApp

### 5. Design & development approach

**Concept:** *Brand Professor Experience Engine* — light green/white, technology-forward production house. Logo and tagline *Experience · Excellence · Exhibition* stay central.

1. Full-bleed hero with logo-first branding + interactive 3D stage  
2. Dual Lab — Events / Exhibitions with live 3D previews  
3. Production systems, field gallery, and mission proof  
4. Live Mission Planner — feasibility, stack, timeline, budget band  
5. Event Brief Assistant — guided intake → production brief  
6. Dispatch / WhatsApp close  

Performance: dynamic 3D import, hero 3D compact on mobile / off on reduced-motion, lightweight geometries.

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
```

Static files are written to the `out/` folder (ready for GitHub Pages).

---

## Host on GitHub Pages

1. Push to `main` on this repository  
2. Repo **Settings → Pages → Source: GitHub Actions**  
3. Wait for the **Deploy to GitHub Pages** workflow  
4. Site URL: `https://SanjanaGowda0074.github.io/brand-professor/`

---

## Contact (Brand Professor)

- Phone: +91 99011 19191  
- WhatsApp: https://wa.me/919901119191  
- HQ: Bangalore, Karnataka, India  

---

## Project structure

```
src/app/                     # App Router pages
src/components/brand/        # Logo
src/components/hero/         # Hero + R3F stage / event scene
src/components/exhibitions/  # 3D booth
src/components/sections/     # Lab, systems, planner, missions, contact
src/components/ai/           # Event brief assistant
src/lib/                     # Brief + mission planner logic
public/brand/logo.png        # Official Brand Professor logo
public/images/               # Field photography
.github/workflows/           # GitHub Pages deploy
```
