import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import styles from './ExperienceSection.module.css';

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
type Accent = 'amber' | 'teal' | 'indigo' | 'rose';
type Side = 'left' | 'right';

interface ExperienceEntry {
  id: string;
  side: Side;
  accent: Accent;
  /** Badge text: 'Internship' | 'Training' | 'Freelance' */
  type: string;
  /** 2–3 uppercase initials shown in the avatar circle */
  initials: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  bullets: string[];
  tech: string[];
}

/* ─────────────────────────────────────────────────────────────
   DATA  — update with real details when ready.
   Entries render top-to-bottom in the order defined here.
   ───────────────────────────────────────────────────────────── */
const EXPERIENCES: ExperienceEntry[] = [
  {
    id: 'e01',
    side: 'left',
    accent: 'amber',
    type: 'Internship',
    initials: 'SPS',
    company: 'Software Productivity Strategists Inc',
    role: 'IT Operations & M365 Administrator',
    period: 'Jun 2025 — Sept 2025',
    duration: '4 months',
    bullets: [
      'Worked on managing and supporting daily IT infrastructure tasks and assisted in user account management, email configuration, access control within Microsoft 365.',
      'I also helped with system troubleshooting, software installations, and monitoring network and device performance to ensure smooth IT operations across the organization.',
    ],
    tech: ['Python', 'Microsoft 365', 'Azure AD', 'AI Tools'],
  },
  {
    id: 'e02',
    side: 'right',
    accent: 'teal',
    type: 'Internship',
    initials: 'DEN',
    company: 'Digital Empowerment Network',
    role: 'Cybersecurity Analyst Internee',
    period: 'Jun 2024 — Aug 2024',
    duration: '2 months',
    bullets: [
      'Performed full network scans using Nessus, identified system vulnerabilities, and generated actionable vulnerability reports.',
      'Configured and maintained MFA settings across systems; supported end-users for smooth adoption.',
      'Implemented and fine-tuned firewalls and IDS to monitor, analyze, and control network traffic for threats.',
    ],
    tech: ['Nessus', 'Wireshark', 'IDS', 'MFA', 'Firewall'],
  },
  {
    id: 'e03',
    side: 'left',
    accent: 'indigo',
    type: 'Training',
    initials: 'CYB',
    company: 'Cyborts',
    role: 'Digital Forensics & Malware Analyst',
    period: 'May 2025 — Jun 2025',
    duration: '2 months',
    bullets: [
      'Conducted a multi-stage forensic investigation using FTK Imager, Autopsy, Volatility, Wireshark and Registry tools.',
    ],
    tech: ['Autopsy', 'Volatility 3', 'FTK Imager', 'DFIR', 'Malware Analysis', 'Wireshark'],
  },
  {
    id: 'e04',
    side: 'right',
    accent: 'rose',
    type: 'Training',
    initials: 'ATS',
    company: 'Advance TelecoM Services',
    role: 'Applied AI',
    period: 'Oct 2025 — Dec 2025',
    duration: '3 months',
    bullets: [
      'Hands-on work in Microsoft Azure to develop industrial AI/GenAI use cases and projects by utilizing software tools, APIs and cloud services.',
    ],
    tech: ['Python', 'AWS Cloud Services', 'Machine Learning', 'Azure ML Services', 'Generative AI', 'APIs'],
  },
];

/* ─────────────────────────────────────────────────────────────
   TIMELINE NODE
   Circle on the vertical line with a sonar-ping animation.
   Framer Motion scales it in when scrolled into view.
   ───────────────────────────────────────────────────────────── */
const TimelineNode = ({ accent }: { accent: Accent }) => (
  <div className={`${styles.nodeWrapper} ${styles[accent]}`} aria-hidden="true">
    <motion.div
      className={styles.node}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <span className={styles.nodeDot} />
    </motion.div>
    {/* Infinite sonar ring — pure CSS animation */}
    <span className={styles.sonarRing} />
  </div>
);

/* ─────────────────────────────────────────────────────────────
   EXPERIENCE CARD
   Slides in from its respective side when scrolled into view.
   ───────────────────────────────────────────────────────────── */
const ExperienceCard = ({ entry }: { entry: ExperienceEntry }) => {
  const { accent } = entry;
  const isLeft = entry.side === 'left';

  return (
    <motion.article
      className={`${styles.card} ${styles[accent]}`}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.72, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* ── Header: company circle + name + type badge ── */}
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderLeft}>
          <div className={styles.initials} aria-hidden="true">
            {entry.initials}
          </div>
          <h3 className={styles.companyName}>{entry.company}</h3>
        </div>
        <span className={styles.typeBadge}>{entry.type}</span>
      </div>

      {/* ── Role + dates ── */}
      <div className={styles.roleRow}>
        <span className={styles.role}>{entry.role}</span>
        <div className={styles.dateBlock}>
          <span className={styles.period}>{entry.period}</span>
          <span className={styles.duration}>{entry.duration}</span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* ── Achievement bullets ── */}
      <ul className={styles.bullets}>
        {entry.bullets.map((text, i) => (
          <li key={i} className={styles.bullet}>
            <span className={styles.bulletArrow} aria-hidden="true">›</span>
            <span className={styles.bulletText}>{text}</span>
          </li>
        ))}
      </ul>

      {/* ── Tech stack ── */}
      <div className={styles.techSection}>
        <span className={styles.techLabel}>Tech Stack</span>
        <div className={styles.techPills}>
          {entry.tech.map((t) => (
            <span key={t} className={styles.techPill}>{t}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

/* ─────────────────────────────────────────────────────────────
   ENTRY ROW
   Positions the card, connector line, and timeline node.
   The accent class on this wrapper drives all descendant
   node / connector colours via CSS Modules selectors.
   ───────────────────────────────────────────────────────────── */
const EntryRow = ({ entry }: { entry: ExperienceEntry }) => {
  const isLeft = entry.side === 'left';

  return (
    <div
      className={[
        styles.entry,
        isLeft ? styles.entryLeft : styles.entryRight,
        styles[entry.accent],
      ].join(' ')}
    >
      {/* Card (takes up its half of the row) */}
      <ExperienceCard entry={entry} />

      {/* Horizontal connector: card edge → timeline node */}
      <div className={styles.connector} aria-hidden="true" />

      {/* Glowing node on the timeline line */}
      <TimelineNode accent={entry.accent} />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN SECTION
   ───────────────────────────────────────────────────────────── */
const ExperienceSection = () => (
  <section id="experience" className={styles.section}>

    {/* ── Centred header ── */}
    <FadeIn y={40} className={styles.header}>
      <p className={styles.eyebrow}>
        <span className={styles.eyebrowDot} />
        Proven In Real Environments
      </p>
      <h2 className={styles.heading}>Field Experience</h2>
      <p className={styles.subheading}>Internships · Training · Operations</p>
    </FadeIn>

    {/* ── Timeline ── */}
    <div className={styles.timeline}>

      {/* Vertical amber line — Framer Motion draws it top-to-bottom */}
      <div className={styles.timelineLineWrapper} aria-hidden="true">
        <motion.div
          className={styles.timelineLine}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.04 }}
          transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      {/* Experience entries */}
      {EXPERIENCES.map((entry) => (
        <EntryRow key={entry.id} entry={entry} />
      ))}

    </div>
  </section>
);

export default ExperienceSection;
