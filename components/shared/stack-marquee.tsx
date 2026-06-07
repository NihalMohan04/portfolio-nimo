type Props = {
  items: string[];
  speed?: number;
};

export function StackMarquee({ items, speed = 40 }: Props) {
  const doubled = [...items, ...items];
  return (
    <div
      className="relative w-full overflow-hidden border-y border-border/60 bg-card/30 py-3"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
      }}
    >
      <div
        className="flex w-max gap-8 font-mono text-sm text-muted-foreground"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-3 whitespace-nowrap"
          >
            <span className="text-primary">●</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
