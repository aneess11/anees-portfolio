# Anees Ahmed — Cybersecurity Portfolio

> **A premium, cinematic dark portfolio for a Cybersecurity & Digital Forensics professional.**
> Built with React · TypeScript · Vite · Tailwind CSS · Framer Motion · Three.js · GSAP

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://anees-portfolio.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-aneeesahmed-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/aneeesahmed/)
[![GitHub](https://img.shields.io/badge/GitHub-aneess11-black?style=for-the-badge&logo=github)](https://github.com/aneess11)

---

## ✨ Features

- **Cinematic Video Hero** — full-screen talking-head video with ambient blur layer, Three.js particle overlay, and GSAP-powered scroll animations
- **Field Experience Timeline** — alternating left/right timeline with animated glowing nodes, sonar-ping effects, and 4 accent color variants
- **Sticky-stacking Project Cards** — scroll-driven cards with scale compression effect
- **PDF Download Buttons** — direct download links for forensic investigation reports
- **Active Research Section** — SVG progress rings, blinking status badges, and live phase tracking for ongoing projects
- **Fully Responsive** — optimised for mobile, tablet, and desktop
- **Apple-level polish** — micro-animations, glassmorphism, hover lifts, ambient glows throughout

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS + CSS Modules |
| Animations | Framer Motion + GSAP |
| 3D / Particles | Three.js |
| Icons | Lucide React |
| Font | Kanit (Google Fonts, weights 300–900) |
| Deployment | Vercel |

---

## 📄 Portfolio Sections

| # | Section | Description |
|---|---|---|
| 1 | **Hero** | Fullscreen cinematic video with particle overlay and scroll reveal |
| 2 | **About** | Bio, skills grouped by Languages / Frameworks / Cybersecurity / AI |
| 3 | **Field Experience** | Alternating timeline — SPS · DEN · Cyborts · Independent Research |
| 4 | **Services** | Core service offerings with animated reveal |
| 5 | **Projects** | Sticky-stacking cards — IoTect · HydraLeak · Firewalls · Wazuh FIM |
| 6 | **Active Research** | Ongoing investigations with SVG progress rings |
| 7 | **Contact** | Email · WhatsApp · LinkedIn · GitHub |

---

## 🚀 Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/aneess11/anees-portfolio.git
cd anees-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# → http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview the production build
npm run preview
```

---

## 📁 Project Structure

```
anees-portfolio/
├── public/
│   ├── intro_anees.mp4                        # Hero video
│   ├── digital-forensics-investigation.pdf    # Project 02 — download
│   ├── wazuh-file-integrity-monitoring.pdf    # Project 04 — download
│   └── *.png                                  # Project screenshots
│
├── src/
│   ├── App.tsx                                # Section composition
│   ├── main.tsx                               # React entry point
│   ├── index.css                              # Global styles + design tokens
│   └── components/
│       ├── CinematicHero.tsx                  # Video hero + particles + GSAP
│       ├── AboutSection.tsx                   # Bio + animated skills
│       ├── ExperienceSection.tsx              # Alternating timeline
│       ├── ExperienceSection.module.css       # Timeline CSS Module
│       ├── ServicesSection.tsx                # Services grid
│       ├── ProjectsSection.tsx                # Sticky-stacking project cards
│       ├── ActiveResearchSection.tsx          # Ongoing projects + progress rings
│       ├── ActiveResearchSection.module.css   # Research CSS Module
│       ├── ContactSection.tsx                 # Contact methods
│       ├── DownloadButton.tsx                 # PDF download pill button
│       ├── LiveProjectButton.tsx              # Project link button
│       ├── ContactButton.tsx                  # CTA button
│       ├── FadeIn.tsx                         # Scroll-triggered fade wrapper
│       └── AnimatedText.tsx                   # Character-by-character reveal
│
├── index.html                                 # Page title + meta tags
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🎨 Customisation Guide

| What to update | File |
|---|---|
| Experience entries | `src/components/ExperienceSection.tsx` → `EXPERIENCES` array |
| Projects + PDFs | `src/components/ProjectsSection.tsx` → `PROJECTS` array |
| Active Research | `src/components/ActiveResearchSection.tsx` → `RESEARCH_PROJECTS` array |
| About bio + skills | `src/components/AboutSection.tsx` |
| Contact methods | `src/components/ContactSection.tsx` → `CONTACT_METHODS` array |
| Hero video | `public/intro_anees.mp4` |
| Global colours + font | `src/index.css` + `tailwind.config.js` |
| Page title + SEO meta | `index.html` |

---

## ☁️ Deploy to Vercel

```bash
# Push to GitHub (already done ✅)
# Then import at https://vercel.com/new
# → Select this repo → click Deploy
# No environment variables needed
```

---

## 📬 Contact

**Anees Ahmed** — Cybersecurity & Digital Forensics
- 📧 [cena55777@gmail.com](mailto:cena55777@gmail.com)
- 💼 [linkedin.com/in/aneeesahmed](https://www.linkedin.com/in/aneeesahmed/)
- 🐙 [github.com/aneess11](https://github.com/aneess11)
- 💬 [WhatsApp](https://wa.me/923130838466)

---

*Designed & built by Anees Ahmed · Pak-Austria Fachhochschule · Software Engineering*
