import { useState } from "react";

export default function CopyToClipboard({
  downloadUrl,
  children,
}: {
  downloadUrl: string;
  children: React.ReactNode;
}) {
  const [tooltipText, setTooltipText] = useState<string | null>(
    "🔗 Click to copy to clipboard"
  );
  return (
    <div
      className="tooltip tooltip-bottom flex"
      data-tip={tooltipText}
      onClick={() => {
        navigator.clipboard.writeText(downloadUrl ?? "https://humrro.org");
        setTooltipText("✅ Copied!");
        setTimeout(() => {
          setTooltipText("🔗 Click to copy to clipboard");
        }, 5000);
      }}
    >
      {children}
    </div>
  );
}
