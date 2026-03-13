interface Language {
  name: string;
  level: string;
  percent: number;
}

interface LanguageBarProps {
  languages: Language[];
}

export default function LanguageBar({ languages }: LanguageBarProps) {
  return (
    <div className="space-y-4">
      {languages.map((lang) => (
        <div key={lang.name}>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{lang.name}</span>
            <span className="text-xs text-muted-foreground">{lang.level}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-700"
              style={{ width: `${lang.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
