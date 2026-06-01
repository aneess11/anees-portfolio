import { Download } from 'lucide-react';

interface DownloadButtonProps {
  /** URL to the file (typically a path inside /public) */
  href: string;
  /** Visible button label */
  label?: string;
  /** Suggested filename the browser should use when saving */
  fileName?: string;
  className?: string;
}

/**
 * Premium download-pill button.
 *
 * Uses the HTML5 `download` attribute so the browser triggers a
 * save-dialog instead of navigating away. A subtle animated
 * download icon reinforces the action.
 */
const DownloadButton = ({
  href,
  label = 'Download PDF',
  fileName,
  className = '',
}: DownloadButtonProps) => {
  return (
    <a
      href={href}
      download={fileName ?? true}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-[#D7E2EA]/50 bg-[#D7E2EA]/[0.06] px-7 py-3 sm:px-9 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] whitespace-nowrap backdrop-blur-sm transition-all duration-300 hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/15 hover:shadow-[0_0_28px_rgba(215,226,234,0.08)] ${className}`}
    >
      <Download
        size={17}
        strokeWidth={2}
        className="transition-transform duration-300 group-hover:translate-y-[2px]"
      />
      {label}
    </a>
  );
};

export default DownloadButton;
