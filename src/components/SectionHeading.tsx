interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}

export default function SectionHeading({ eyebrow, title, subtitle, light = false, center = true }: Props) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''}`}>
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
          <span className="text-gold-500 font-body text-[11px] tracking-[0.35em] uppercase font-medium">
            {eyebrow}
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500" />
        </div>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl md:text-5xl font-light leading-tight mb-4 ${
          light ? 'text-white' : 'text-[#1a1a1a]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-body text-base max-w-2xl leading-relaxed ${
            center ? 'mx-auto' : ''
          } ${light ? 'text-white/50' : 'text-gray-400'}`}
        >
          {subtitle}
        </p>
        )}
    </div>
  );
}
