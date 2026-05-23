interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, subtitle, align = "left" }: Props) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-px w-10 bg-flame" />
          <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-flame">{eyebrow}</p>
        </div>
      )}
      <h2 className="mt-5 font-display text-5xl md:text-7xl text-ivory tracking-tight leading-[0.9]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 font-sans text-base md:text-lg text-steel max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
