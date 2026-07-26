import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Eye, Terminal as TerminalIcon } from 'lucide-react';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';
import DownloadButton from './DownloadButton';
import PdfModal from './PdfModal';
import TerminalModal from './TerminalModal';

interface TerminalTab {
  id: string;
  filename: string;
  language: string;
  code: string;
}

interface ProjectData {
  number: string;
  category: string;
  categoryTag: 'cybersecurity' | 'dfir' | 'ai';
  name: string;
  liveUrl?: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  downloadUrl?: string;
  downloadFileName?: string;
  terminalTabs?: TerminalTab[];
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'Personal · AI & Threat Detection',
    categoryTag: 'ai',
    name: 'IoTect - A Hybrid Framework for Real-Time Threat Detection in IoT Networks',
    liveUrl: 'https://github.com/aneess11/IoTect-IDS',
    col1Image1: '/IoTect1.png',
    col1Image2: '/IoTect2.png',
    col2Image: '/IoTect3.png',
    terminalTabs: [
      {
        id: 't1',
        filename: 'iotect_detector.py',
        language: 'python',
        code: `import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import torch
import torch.nn as nn

class IoTThreatClassifier(nn.Module):
    """
    Hybrid Deep Learning + Machine Learning Threat Detection System
    Monitors MQTT/CoAP IoT Traffic for DDoS, Man-in-the-Middle, and Anomaly Injection.
    """
    def __init__(self, input_dim=42):
        super(IoTThreatClassifier, self).__init__()
        self.fc1 = nn.Linear(input_dim, 128)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(0.3)
        self.fc2 = nn.Linear(128, 64)
        self.out = nn.Linear(64, 4) # 0: Normal, 1: Mirai, 2: DDoS, 3: Spoofing

    def forward(self, x):
        x = self.dropout(self.relu(self.fc1(x)))
        x = self.relu(self.fc2(x))
        return self.out(x)

# Real-time Packet Feature Extractor
def analyze_iot_packet(flow_features):
    model = IoTThreatClassifier()
    model.eval()
    tensor_input = torch.tensor(flow_features, dtype=torch.float32)
    with torch.no_grad():
        predictions = model(tensor_input)
        alert_class = torch.argmax(predictions, dim=1).item()
    return alert_class`,
      },
      {
        id: 't2',
        filename: 'snort_iot_rules.rules',
        language: 'snort',
        code: `# IoTect Custom Snort Rules for IoT Edge Gateways
alert tcp $HOME_NET any -> $EXTERNAL_NET 1883 (msg:"IOTECT ALERT: Unauthenticated MQTT Publish Attempt"; content:"|10|"; offset:0; depth:1; sid:1000001; rev:1;)
alert udp $HOME_NET any -> $EXTERNAL_NET 5683 (msg:"IOTECT ALERT: CoAP Amplification Reflection Flood Detected"; threshold: type threshold, track by_src, count 100, seconds 1; sid:1000002; rev:1;)`,
      },
    ],
  },
  {
    number: '02',
    category: 'Personal · Digital Forensics',
    categoryTag: 'dfir',
    name: 'Operation HydraLeak — Windows corporate breach (case study)',
    col1Image1: '/OH1.png',
    col1Image2: '/OH2.png',
    col2Image: '/OH3.png',
    downloadUrl: '/digital-forensics-investigation.pdf',
    downloadFileName: 'Operation-HydraLeak-Digital-Forensics-Investigation.pdf',
    terminalTabs: [
      {
        id: 't1',
        filename: 'volatility_memory_dump.log',
        language: 'bash',
        code: `$ python3 vol.py -f hydraleak_memdump.raw windows.pslist
PID    PPID   ImageFileName         Offset(V)          Threads  Handles  ExitTime
-----------------------------------------------------------------------------------
4088   1420   svchost.exe          0xfffffa8003a11060  12       320      2025-05-14 11:22:04
5120   4088   cmd.exe              0xfffffa8003b22010  1        42       N/A
6844   5120   powershell.exe       0xfffffa8003c44090  8        198      N/A

$ python3 vol.py -f hydraleak_memdump.raw windows.netscan
Offset(P)          Proto  LocalAddr:Port          ForeignAddr:Port      PID    State
-----------------------------------------------------------------------------------
0x3f9011a0         TCPv4  192.168.1.105:49812     185.220.101.5:443     6844   ESTABLISHED [EXFILTRATION]`,
      },
      {
        id: 't2',
        filename: 'hydraleak_yara.yar',
        language: 'yara',
        code: `rule HydraLeak_Exfiltration_Payload {
    meta:
        description = "Detects obfuscated PowerShell stager used in HydraLeak breach"
        author = "Anees Ahmed (DFIR Analyst)"
        date = "2025-05-15"
    strings:
        $s1 = "Invoke-Expression" ascii nocase
        $s2 = "[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String" ascii
        $s3 = "netsh advfirewall set allprofiles state off" ascii
    condition:
        all of ($s*) and filesize < 50KB
}`,
      },
    ],
  },
  {
    number: '03',
    category: 'Personal · Cybersecurity',
    categoryTag: 'cybersecurity',
    name: 'Configuring Firewalls and Intrusion Detection System on Network',
    col1Image1: '/Firewall1.png',
    col1Image2: '/Firewall2.png',
    col2Image: '/Firewall3.png',
    terminalTabs: [
      {
        id: 't1',
        filename: 'pfsense_rules.conf',
        language: 'conf',
        code: `# pfSense Network Perimeter Stateful Inspection Rules
pass in quick on wan proto tcp from any to 192.168.10.50 port { 80 443 } flags S/SA keep state (max 5000, source-track rule, max-src-nodes 100, max-src-states 50)
block drop in log quick on wan from <emerging_threats_blocklist> to any
block in log quick on lan proto tcp from 192.168.10.0/24 to 192.168.20.0/24 port { 22 3389 }`,
      },
    ],
  },
  {
    number: '04',
    category: 'Personal · Cybersecurity',
    categoryTag: 'cybersecurity',
    name: 'Wazuh-based File Integrity Monitoring (FIM) System',
    col1Image1: '/wazuh1.png',
    col1Image2: '/wazuh2.png',
    col2Image: '/wazuh3.png',
    downloadUrl: '/wazuh-file-integrity-monitoring.pdf',
    downloadFileName: 'Wazuh-File-Integrity-Monitoring-System.pdf',
    terminalTabs: [
      {
        id: 't1',
        filename: 'wazuh_fim_rules.xml',
        language: 'xml',
        code: `<group name="syscheck,fim_custom,">
  <!-- Custom Wazuh FIM Rule: Unauthorized Binary Modification in System32 -->
  <rule id="100250" level="12">
    <if_sid>550</if_sid>
    <field name="file">^C:\\\\Windows\\\\System32</field>
    <description-[#D7E2EA]>CRITICAL: Unauthorized modification detected in System32 directory ($(file))</description-[#D7E2EA]>
    <mitre>
      <id>T1036</id>
      <id>T1565.001</id>
    </mitre>
  </rule>
</group>`,
      },
    ],
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  onOpenPdf: (url: string, title: string, fileName?: string) => void;
  onOpenTerminal: (title: string, tabs: TerminalTab[]) => void;
}

const ProjectCard = ({
  project,
  index,
  total,
  onOpenPdf,
  onOpenTerminal,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky w-full mb-12 sm:mb-16"
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
        className="origin-top mx-auto h-full w-full flex flex-col gap-4 sm:gap-5 md:gap-6 rounded-[28px] sm:rounded-[32px] md:rounded-[36px] border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Top row: number + meta + button group */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-row items-start gap-3 sm:gap-6 md:gap-8 min-w-0 flex-1">
            <div
              className="shrink-0 font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
            >
              {project.number}
            </div>

            <div className="flex flex-col gap-1 sm:gap-2 pt-1 sm:pt-2 min-w-0 flex-1">
              <span
                className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
                style={{ fontSize: 'clamp(0.65rem, 1.1vw, 0.9rem)' }}
              >
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.8rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          {/* Action buttons */}
          <div className="shrink-0 flex flex-wrap items-center gap-2.5 pt-1 sm:pt-2">
            {project.liveUrl && (
              <LiveProjectButton href={project.liveUrl} className="w-full sm:w-auto" />
            )}

            {project.terminalTabs && project.terminalTabs.length > 0 && (
              <button
                onClick={() => onOpenTerminal(project.name, project.terminalTabs!)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#14B8A6]/40 bg-[#14B8A6]/10 px-5 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#14B8A6] hover:bg-[#14B8A6]/20 transition-all"
              >
                <TerminalIcon size={15} />
                <span>View Spec</span>
              </button>
            )}

            {project.downloadUrl && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() =>
                    onOpenPdf(project.downloadUrl!, project.name, project.downloadFileName)
                  }
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#F59E0B]/50 bg-[#F59E0B]/10 px-4 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#F59E0B] hover:bg-[#F59E0B]/20 transition-all"
                  title="Preview PDF in browser"
                >
                  <Eye size={15} />
                  <span>Preview</span>
                </button>
                <DownloadButton
                  href={project.downloadUrl}
                  fileName={project.downloadFileName}
                  className="flex-1 sm:flex-initial"
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom row: two-column image grid */}
        <div
          className="grid grid-cols-[2fr_3fr] gap-3 sm:gap-4 md:gap-5 flex-1 min-h-0 overflow-hidden"
          style={{ gridTemplateRows: '1fr' }}
        >
          {/* Left column – 2 stacked images */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 h-full min-h-0 overflow-hidden">
            <div className="flex-[2] min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-[#D7E2EA]/10">
              <img
                src={project.col1Image1}
                alt={`${project.name} preview 1`}
                className="block h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="flex-[3] min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-[#D7E2EA]/10">
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
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#D7E2EA]/10 h-full min-h-0">
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'cybersecurity' | 'dfir' | 'ai'>('all');
  
  // Modals state
  const [pdfModalState, setPdfModalState] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
    fileName?: string;
  }>({ isOpen: false, url: '', title: '' });

  const [terminalModalState, setTerminalModalState] = useState<{
    isOpen: boolean;
    title: string;
    tabs: TerminalTab[];
  }>({ isOpen: false, title: '', tabs: [] });

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.categoryTag === activeFilter;
  });

  const handleOpenPdf = (url: string, title: string, fileName?: string) => {
    setPdfModalState({ isOpen: true, url, title, fileName });
  };

  const handleOpenTerminal = (title: string, tabs: TerminalTab[]) => {
    setTerminalModalState({ isOpen: true, title, tabs });
  };

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 shadow-[0_-25px_60px_rgba(0,0,0,0.9)]"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-6 sm:mb-8"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      {/* Category Filter Pills */}
      <FadeIn delay={0.1} y={20}>
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12 sm:mb-16 md:mb-20">
          {[
            { id: 'all', label: `All Projects (${PROJECTS.length})` },
            { id: 'cybersecurity', label: 'Cybersecurity' },
            { id: 'dfir', label: 'Digital Forensics' },
            { id: 'ai', label: 'AI & IDS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                activeFilter === tab.id
                  ? 'border border-[#D7E2EA] bg-[#D7E2EA] text-[#0C0C0C] shadow-[0_0_20px_rgba(215,226,234,0.3)]'
                  : 'border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 text-[#D7E2EA]/70 hover:border-[#D7E2EA]/50 hover:text-[#D7E2EA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </FadeIn>

      <div className="mx-auto max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.number}
                project={project}
                index={i}
                total={filteredProjects.length}
                onOpenPdf={handleOpenPdf}
                onOpenTerminal={handleOpenTerminal}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pdf Modal */}
      <PdfModal
        isOpen={pdfModalState.isOpen}
        onClose={() => setPdfModalState((s) => ({ ...s, isOpen: false }))}
        pdfUrl={pdfModalState.url}
        title={pdfModalState.title}
        fileName={pdfModalState.fileName}
      />

      {/* Terminal Modal */}
      <TerminalModal
        isOpen={terminalModalState.isOpen}
        onClose={() => setTerminalModalState((s) => ({ ...s, isOpen: false }))}
        title={terminalModalState.title}
        tabs={terminalModalState.tabs}
      />
    </section>
  );
};

export default ProjectsSection;
