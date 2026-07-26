import { useState, useEffect } from 'react';
import { X, Copy, Check, Terminal as TerminalIcon, Code, ShieldCheck } from 'lucide-react';

interface TerminalTab {
  id: string;
  filename: string;
  language: string;
  code: string;
}

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tabs: TerminalTab[];
}

const TerminalModal = ({ isOpen, onClose, title, tabs }: TerminalModalProps) => {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || '');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (tabs.length > 0 && !tabs.find(t => t.id === activeTabId)) {
      setActiveTabId(tabs[0].id);
    }
  }, [tabs, activeTabId]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleCopy = () => {
    if (!activeTab) return;
    navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Terminal Window */}
      <div className="relative z-10 flex h-[85vh] w-full max-w-4xl flex-col rounded-2xl border border-[#14B8A6]/30 bg-[#09090D] shadow-[0_0_50px_rgba(20,184,166,0.15)] overflow-hidden font-mono text-sm">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#22222b] bg-[#121218] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
            <span className="ml-2 flex items-center gap-1.5 text-xs text-[#D7E2EA]/60 font-sans font-medium">
              <TerminalIcon size={14} className="text-[#14B8A6]" />
              {title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 px-2.5 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider text-[#14B8A6]">
              <ShieldCheck size={12} /> VERIFIED SPEC
            </span>
            <button
              onClick={onClose}
              className="text-[#D7E2EA]/50 hover:text-white transition-colors"
              aria-label="Close terminal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-[#22222b] bg-[#0E0E14] px-4 pt-2">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-2 rounded-t-lg border-t border-x px-3.5 py-2 text-xs transition-colors whitespace-nowrap ${
                  activeTabId === tab.id
                    ? 'border-[#22222b] bg-[#09090D] text-[#14B8A6] font-semibold'
                    : 'border-transparent text-[#D7E2EA]/50 hover:text-[#D7E2EA]'
                }`}
              >
                <Code size={13} />
                {tab.filename}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="mb-1 flex items-center gap-1.5 rounded-lg border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 px-3 py-1.5 text-xs font-sans text-[#D7E2EA] hover:bg-[#D7E2EA]/15 transition-colors shrink-0"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Terminal Body / Code View */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 text-xs sm:text-sm text-[#D7E2EA]/90 leading-relaxed bg-[#09090D]">
          <div className="mb-3 text-[11px] text-[#F59E0B]/80 select-none">
            # Security Rule / Code Definition — {activeTab?.filename}
          </div>
          <pre className="font-mono whitespace-pre-wrap break-words text-[#38BDF8]">
            <code>{activeTab?.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default TerminalModal;
