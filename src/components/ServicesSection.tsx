import FadeIn from './FadeIn';


const SERVICES = [
  {
    number: '01',
    title: 'AI & Machine Learning Solutions',
    description:
      'Developing intelligent AI solutions that transform data into actionable insights and automate decision-making processes.',
  },
  {
    number: '02',
    title: 'Cybersecurity & SOC Operations',
    description:
      'Helping organizations strengthen their security posture through monitoring, threat analysis, and proactive defense strategies.',
  },
  {
    number: '03',
    title: 'Digital Forensics & Incident Response',
    description:
      'Conducting digital investigations to uncover attack paths, analyze incidents, and support security operations.',
  },
  {
    number: '04',
    title: 'Prompt Engineering & LLM Automation',
    description:
      'Crafting reliable prompts and automation flows that turn LLMs into production-grade tools for content, analysis, and decision support.',
  },
  {
    number: '05',
    title: 'Research & Innovation',
    description:
      'Exploring emerging technologies and developing innovative solutions for real-world challenges.',
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative z-10 w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 shadow-[0_-25px_60px_rgba(0,0,0,0.9)]"
    >
      <FadeIn y={40}>
        <h2
          className="text-center font-black uppercase text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28 leading-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex flex-row items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: '1px solid rgba(12, 12, 12, 0.15)',
                ...(i === SERVICES.length - 1
                  ? { borderBottom: '1px solid rgba(12, 12, 12, 0.15)' }
                  : {}),
              }}
            >
              <div
                className="shrink-0 font-black text-[#0C0C0C] leading-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </div>

              <div className="group flex flex-col gap-3 sm:gap-4 md:gap-5 pt-2 sm:pt-3 md:pt-4">
                <h3
                  className="font-medium uppercase text-[#0C0C0C] leading-tight relative inline-block w-fit"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.title}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#0C0C0C]/60 transition-all duration-500 group-hover:w-full" />
                </h3>
                <p
                  className="font-light leading-relaxed text-[#0C0C0C] max-w-2xl"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.6,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
