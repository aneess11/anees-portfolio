import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import CinematicLayer from './CinematicLayer';
import styles from './CinematicHero.module.css';

/* ──────────────────────────────────────────────
   Configuration — edit these to personalise
   ────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Active Research', href: '#active-research' },
  { label: 'Contact', href: '#contact' },
];

const HERO_NAME = 'Anees';
const HERO_TAGLINE = 'Portfolio · 2026';
const HERO_SUBTITLE = 'Innovation in Security and Next-generation Digital Intelligence';
const VIDEO_SRC = '/intro_anees.mp4';

/* ──────────────────────────────────────────────
   CinematicHero Component
   ────────────────────────────────────────────── */
const CinematicHero = () => {
  /* ── Refs ── */
  const sectionRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* ── State ── */
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* ──────────────────────────────────────────
     GSAP cinematic entrance timeline
     ────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // Cinematic "fade-from-black" curtain
      tl.to(
        curtainRef.current,
        { opacity: 0, duration: 1.6, ease: 'power2.inOut' },
        0.15,
      );

      // Navigation slides in from top
      tl.from(
        navRef.current,
        { y: -30, opacity: 0, duration: 0.9 },
        0.5,
      );

      // Tagline fades up
      tl.from(
        taglineRef.current,
        { y: 30, opacity: 0, duration: 0.8 },
        0.7,
      );

      // Name rises dramatically from below
      tl.from(
        nameRef.current,
        { y: 90, opacity: 0, duration: 1.15, ease: 'power4.out' },
        0.9,
      );

      // Subtitle fades up
      tl.from(
        subtitleRef.current,
        { y: 25, opacity: 0, duration: 0.8 },
        1.35,
      );

      // Bottom bar (scroll indicator + controls)
      tl.from(
        bottomRef.current,
        { y: 25, opacity: 0, duration: 0.8 },
        1.6,
      );
    });

    return () => ctx.revert();
  }, []);

  /* ── Auto-hide "Tap for sound" badge after 5 s ── */
  useEffect(() => {
    const timer = setTimeout(() => setShowSoundHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  /* ── Auto-mute when user scrolls past the hero ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          const v = mainVideoRef.current;
          if (v && !v.muted) {
            v.muted = true;
            setMuted(true);
          }
        }
      },
      { threshold: 0, rootMargin: '-50% 0px 0px 0px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* ── Handlers ── */
  const toggleMute = () => {
    const v = mainVideoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    setShowSoundHint(false);
  };

  const togglePlay = () => {
    const main = mainVideoRef.current;
    const bg = bgVideoRef.current;
    if (!main) return;

    if (main.paused) {
      main.play();
      bg?.play();
      setPlaying(true);
    } else {
      main.pause();
      bg?.pause();
      setPlaying(false);
    }
  };

  const scrollToAbout = () => {
    const about = document.getElementById('about');
    if (about) about.scrollIntoView({ behavior: 'smooth' });
  };

  /* ──────────────────────────────────────────
     Render
     ────────────────────────────────────────── */
  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* ── Cinematic curtain (fades out via GSAP) ── */}
      <div ref={curtainRef} className={styles.curtain} />

      {/* ── Blurred ambient background video ── */}
      <video
        ref={bgVideoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={styles.videoBg}
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* ── Main foreground video ── */}
      <video
        ref={mainVideoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={styles.videoMain}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* ── Cinematic gradient overlays ── */}
      <div className={styles.overlays}>
        <div className={styles.gradientLeft} />
        <div className={styles.gradientBottom} />
        <div className={styles.gradientTop} />
        <div className={styles.vignette} />
        <div className={styles.warmGlow} />
        <div className={styles.blueGlow} />
      </div>

      {/* ── Three.js cinematic particle layer ── */}
      <CinematicLayer />

      {/* ── Content ── */}
      <div className={styles.content}>
        {/* ── Top bar: navigation ── */}
        <nav ref={navRef} className={styles.nav} aria-label="Main navigation">
          {/* Logo / name — always visible */}
          <span className={styles.navLogo}>Anees Ahmed</span>

          {/* Desktop nav links */}
          <ul className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: email btn + hamburger */}
          <div className={styles.navRight}>
            <a href="#contact" className={styles.emailBtn}>
              Email me
            </a>
            {/* Hamburger — visible only on mobile */}
            <button
              className={styles.hamburger}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
            </button>
          </div>
        </nav>

        {/* ── Mobile menu overlay ── */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu} role="dialog" aria-label="Navigation menu">
            <ul className={styles.mobileMenuLinks}>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={styles.mobileMenuLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Hero text ── */}
        <div className={styles.heroText}>
          <p ref={taglineRef} className={styles.tagline}>
            {HERO_TAGLINE}
          </p>
          <h1 ref={nameRef} className={styles.name}>
            {HERO_NAME}
          </h1>
          <p ref={subtitleRef} className={styles.subtitle}>
            {HERO_SUBTITLE}
          </p>
        </div>

        {/* ── Bottom bar: scroll indicator + controls ── */}
        <div ref={bottomRef} className={styles.bottomBar}>
          {/* Scroll indicator */}
          <button
            onClick={scrollToAbout}
            className={styles.scrollIndicator}
            aria-label="Scroll to next section"
          >
            <span className={styles.scrollLabel}>Scroll</span>
            <div className={styles.scrollLine}>
              <span className={styles.scrollLinePulse} />
            </div>
          </button>

          {/* Media controls */}
          <div className={styles.controls}>
            {showSoundHint && (
              <span className={styles.soundHint}>Tap for sound</span>
            )}

            <button
              onClick={togglePlay}
              aria-label={playing ? 'Pause video' : 'Play video'}
              className={styles.controlBtn}
            >
              {playing ? (
                <Pause size={18} strokeWidth={1.8} />
              ) : (
                <Play size={18} strokeWidth={1.8} />
              )}
            </button>

            <button
              onClick={toggleMute}
              aria-label={muted ? 'Unmute video' : 'Mute video'}
              className={styles.controlBtn}
            >
              {muted ? (
                <VolumeX size={18} strokeWidth={1.8} />
              ) : (
                <Volume2 size={18} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
