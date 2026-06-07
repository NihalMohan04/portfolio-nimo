import { cn } from "@/lib/utils";

type Props = {
  available: boolean;
  label: string;
  className?: string;
};

export function StatusBadge({ available, label, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-75",
            available ? "bg-primary animate-ping" : "bg-muted-foreground",
          )}
        />
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            available ? "bg-primary" : "bg-muted-foreground",
          )}
        />
      </span>
      {label}
    </span>
  );
}
