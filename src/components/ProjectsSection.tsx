import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';
import DownloadButton from './DownloadButton';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  /** Optional — when set, a "Github Repository" button appears on the card */
  liveUrl?: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  /** Optional — when set, a "Download PDF" button appears on the card */
  downloadUrl?: string;
  /** Suggested filename for the download (shown in the save dialog) */
  downloadFileName?: string;
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'Personal',
    name: 'IoTect - A Hybrid Framework for Real-Time Threat Detection in IoT Networks',
    liveUrl: 'https://github.com/aneess11/IoTect-IDS',
    col1Image1: '/IoTect1.png',
    col1Image2: '/IoTect2.png',
    col2Image: '/IoTect3.png',
  },
  {
    number: '02',
    category: 'Personal · Digital Forensics',
    name: 'Operation HydraLeak — Windows corporate breach (case study)',

    col1Image1: '/OH1.png',
    col1Image2: '/OH2.png',
    col2Image: '/OH3.png',
    downloadUrl: '/digital-forensics-investigation.pdf',
    downloadFileName: 'Operation-HydraLeak-Digital-Forensics-Investigation.pdf',
  },
  {
    number: '03',
    category: 'Personal · Cybersecurity',
    name: 'Configuring Firewalls and Intrusion Detection System on Network',

    col1Image1: '/Firewall1.png',
    col1Image2: '/Firewall2.png',
    col2Image: '/Firewall3.png',
  },
  {
    number: '04',
    category: 'Personal · Cybersecurity',
    name: 'Wazuh-based File Integrity Monitoring (FIM) System',

    col1Image1: '/wazuh1.png',
    col1Image2: '/wazuh2.png',
    col2Image: '/wazuh3.png',
    downloadUrl: '/wazuh-file-integrity-monitoring.pdf',
    downloadFileName: 'Wazuh-File-Integrity-Monitoring-System.pdf',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ProjectCard = ({ project, index, total, containerRef }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll progress for THIS card relative to the whole projects scroll range.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  // Cards further down the stack stay full-size; earlier cards scale DOWN
  // as later cards stack on top of them.
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky w-full"
      style={{
        top: `${typeof window !== 'undefined' && window.innerWidth < 768
          ? 72 + index * 16
          : 96 + index * 28}px`,
        height: 'auto',
        minHeight: '60vh',
      }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto h-full w-full flex flex-col gap-4 sm:gap-5 md:gap-6 rounded-[28px] sm:rounded-[32px] md:rounded-[36px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        {/* Top row: number + meta + button */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex flex-row items-start gap-3 sm:gap-6 md:gap-10 min-w-0 w-full">
            <div
              className="shrink-0 font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)' }}
            >
              {project.number}
            </div>

            <div className="flex flex-col gap-1 sm:gap-3 pt-1 sm:pt-3 md:pt-4 min-w-0 flex-1">
              <span
                className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
                style={{ fontSize: 'clamp(0.65rem, 1.2vw, 1rem)' }}
              >
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight"
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <div className="shrink-0 self-start sm:self-auto pt-1 sm:pt-2 md:pt-3 w-full sm:w-auto flex flex-wrap gap-3">
            {project.liveUrl && (
              <LiveProjectButton href={project.liveUrl} className="w-full sm:w-auto" />
            )}
            {project.downloadUrl && (
              <DownloadButton
                href={project.downloadUrl}
                fileName={project.downloadFileName}
                className="w-full sm:w-auto"
              />
            )}
          </div>
        </div>

        {/* Bottom row: two-column image grid */}
        <div
          className="grid grid-cols-[2fr_3fr] gap-3 sm:gap-4 md:gap-5 flex-1 min-h-0 overflow-hidden"
          style={{ gridTemplateRows: '1fr' }}
        >
          {/* Left column – 2 stacked images, proportionally split */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 h-full min-h-0 overflow-hidden">
            <div className="flex-[2] min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl">
              <img
                src={project.col1Image1}
                alt={`${project.name} preview 1`}
                className="block h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="flex-[3] min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl">
              <img
                src={project.col1Image2}
                alt={`${project.name} preview 2`}
                className="block h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>

          {/* Right column – single tall image */}
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl h-full min-h-0">
            <img
              src={project.col2Image}
              alt={`${project.name} preview 3`}
              className="block h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-7xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
