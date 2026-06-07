type Props = {
  label: string;
  index?: string;
  description?: string;
};

export function SectionHeading({ label, index, description }: Props) {
  return (
    <div className="flex items-baseline gap-3">
      {index ? (
        <span className="font-mono text-xs text-muted-foreground">
          [{index}]
        </span>
      ) : null}
      <h2 className="font-mono text-sm text-primary sm:text-base">
        <span className="text-muted-foreground">{"// "}</span>
        {label}
      </h2>
      <span
        aria-hidden
        className="h-px flex-1 bg-gradient-to-r from-border to-transparent"
      />
      {description ? (
        <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
          {description}
        </span>
      ) : null}
    </div>
  );
}
