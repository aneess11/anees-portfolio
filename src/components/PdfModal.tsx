import { useEffect } from 'react';
import { X, Download, FileText, ExternalLink } from 'lucide-react';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  fileName?: string;
}

const PdfModal = ({ isOpen, onClose, pdfUrl, title, fileName }: PdfModalProps) => {
  // Lock background scroll when modal is open
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

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 flex h-[90vh] w-full max-w-5xl flex-col rounded-2xl sm:rounded-3xl border border-[#D7E2EA]/20 bg-[#111116] shadow-2xl overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-[#D7E2EA]/10 bg-[#17171d] px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 text-[#F59E0B]">
              <FileText size={18} />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D7E2EA]">
                {title}
              </h3>
              <p className="text-[10px] text-[#D7E2EA]/50 uppercase tracking-widest">
                PDF Investigation Report
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pdfUrl}
              download={fileName ?? true}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/10 px-3 py-1.5 text-xs font-medium text-[#D7E2EA] hover:bg-[#D7E2EA]/20 transition-colors"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download</span>
            </a>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/10 px-3 py-1.5 text-xs font-medium text-[#D7E2EA] hover:bg-[#D7E2EA]/20 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink size={14} />
            </a>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 text-[#D7E2EA]/70 hover:bg-[#D7E2EA]/20 hover:text-white transition-colors"
              aria-label="Close PDF viewer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Embedded Viewer */}
        <div className="relative flex-1 bg-[#0C0C0C]">
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            title={title}
            className="h-full w-full border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PdfModal;
