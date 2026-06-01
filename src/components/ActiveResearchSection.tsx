import { useEffect, useRef } from 'react';
import FadeIn from './FadeIn';
import styles from './ActiveResearchSection.module.css';

/* ─────────────────────────────────────────────────────────────────
   DATA — edit these objects to personalise your ongoing research.
   accent: 'amber' | 'teal'
   status: shown in the blinking badge (e.g. 'In Progress' / 'Researching')
   phase:  current work stage (shown at bottom of card)
   pct:    completion 0–100 (drives the SVG ring + progress bar)
   ───────────────────────────────────────────────────────────────── */
interface ResearchProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: string;
  phase: string;
  pct: number;
  lastUpdated: string;
  accent: 'amber' | 'teal';
}

const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: 'r01',
    accent: 'amber',
    status: 'In Progress',
    title: 'Voice-Controlled AI File Assistant',
    description:
      'Universal remote file access system with multi-platform delivery. Access your laptop files from anywhere via natural voice commands through phone calls, send files instantly to WhatsApp, Email, LinkedIn, Slack, Discord, and other platforms.',
    tech: ['NLU', 'LLM', 'Python', 'APIs', 'STT', 'Voice Auth'],
    phase: 'Phase 2 — Frontend UI/UX Design',
    pct: 30,
    lastUpdated: 'Last updated: 3 days ago',
  },
  {
    id: 'r02',
    accent: 'teal',
    status: 'Researching',
    title: 'Multi-Agent AI Cybersecurity Research Factory',
    description:
      'An “AI Cybersecurity Research Factory” for CTFs and vulnerabilities is basically a system that continuously learns, researches, analyzes, tests, and improves cybersecurity knowledge using AI. A platform where AI agents work together like a cybersecurity research team.',
    tech: ['Python', 'FastAPI', 'LangGraph', 'React', 'Docker', 'APIs'],
    phase: 'Phase 1 — Requirements Gathering',
    pct: 10,
    lastUpdated: 'Last updated: 1 week ago',
  },
];

/* ─────────────────────────────────────────────────────────────────
   SVG circular progress ring
   ───────────────────────────────────────────────────────────────── */
interface ProgressRingProps {
  pct: number;
  accent: 'amber' | 'teal';
}

const RING_R = 30; // radius (px) — viewBox is 72×72, centre at 36,36
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_R; // ≈ 188.5

const ProgressRing = ({ pct, accent }: ProgressRingProps) => {
  const fillRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // Animate the stroke-dashoffset from full (hidden) to the target length
    const el = fillRef.current;
    if (!el) return;
    const offset = RING_CIRCUMFERENCE * (1 - pct / 100);
    // Start hidden, animate to target after a tiny delay
    el.style.strokeDashoffset = String(RING_CIRCUMFERENCE);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.strokeDashoffset = String(offset);
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [pct]);

  return (
    <div className={styles.ringLabelWrapper}>
      {/* SVG ring */}
      <svg
        className={styles.ring}
        viewBox="0 0 72 72"
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0 }}
      >
        <circle
          className={styles.ringBg}
          cx="36"
          cy="36"
          r={RING_R}
        />
        <circle
          ref={fillRef}
          className={`${styles.ringFill} ${styles[accent]}`}
          cx="36"
          cy="36"
          r={RING_R}
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE}
        />
      </svg>
      {/* Percentage label centred inside ring */}
      <span className={styles.ringLabel}>{pct}%</span>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   Individual research card
   ───────────────────────────────────────────────────────────────── */
const ResearchCard = ({ project }: { project: ResearchProject }) => {
  const { accent } = project;

  return (
    <article className={`${styles.card} ${styles[accent]}`}>
      {/* ── Top row: status badge + progress ring ── */}
      <div className={styles.cardTop}>
        {/* Status badge with blinking dot */}
        <span className={`${styles.statusBadge} ${styles[accent]}`}>
          <span className={`${styles.statusDot} ${styles[accent]}`} />
          {project.status}
        </span>

        {/* Circular progress ring */}
        <ProgressRing pct={project.pct} accent={accent} />
      </div>

      {/* ── Title + description ── */}
      <div className={styles.cardMeta}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
      </div>

      {/* ── Tech stack pills ── */}
      <div className={styles.techRow}>
        {project.tech.map((t) => (
          <span key={t} className={styles.techPill}>
            {t}
          </span>
        ))}
      </div>

      {/* ── Footer: phase label + progress bar + last-updated ── */}
      <div className={styles.cardFooter}>
        <div className={styles.phaseRow}>
          <span className={`${styles.phaseLabel} ${styles[accent]}`}>
            {project.phase}
          </span>
          <span className={styles.lastUpdated}>{project.lastUpdated}</span>
        </div>

        {/* Thin animated progress bar */}
        <div className={styles.progressBarTrack}>
          <div
            className={`${styles.progressBarFill} ${styles[accent]}`}
            style={{ width: `${project.pct}%` }}
          />
        </div>
      </div>
    </article>
  );
};

/* ─────────────────────────────────────────────────────────────────
   Section
   ───────────────────────────────────────────────────────────────── */
const ActiveResearchSection = () => (
  <section id="active-research" className={styles.section}>
    {/* ── Section header ── */}
    <FadeIn y={40} className={styles.header}>
      <p className={styles.eyebrow}>
        <span className={styles.eyebrowDot} />
        Currently Active
      </p>
      <h2 className={styles.heading}>Active Research</h2>
      <p className={styles.subheading}>
        Ongoing investigations &amp; research initiatives
      </p>
    </FadeIn>

    {/* ── Cards ── */}
    <div className={styles.grid}>
      {RESEARCH_PROJECTS.map((project, i) => (
        <FadeIn key={project.id} y={50} delay={i * 0.18} duration={0.75}>
          <ResearchCard project={project} />
        </FadeIn>
      ))}
    </div>
  </section>
);

export default ActiveResearchSection;
