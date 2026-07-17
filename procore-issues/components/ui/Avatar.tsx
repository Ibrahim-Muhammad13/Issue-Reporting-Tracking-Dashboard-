import { cn } from "@/lib/utils";
import { initials } from "@/lib/utils";

const PALETTE = [
  "bg-[#FEE2E2] text-[#B91C1C]",
  "bg-[#DBEAFE] text-[#1D4ED8]",
  "bg-[#DCFCE7] text-[#15803D]",
  "bg-[#FEF0E7] text-[#DD5B15]",
  "bg-[#EDE9FE] text-[#6D28D9]",
  "bg-[#FCE7F3] text-[#BE185D]",
];

function paletteIndex(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return sum % PALETTE.length;
}

export function Avatar({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const sizeClasses = size === "sm" ? "h-6 w-6 text-[10px]" : "h-9 w-9 text-xs";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
        sizeClasses,
        PALETTE[paletteIndex(name)]
      )}
      title={name}
    >
      {initials(name)}
    </span>
  );
}
