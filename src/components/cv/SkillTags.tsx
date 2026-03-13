interface SkillTagsProps {
  title: string;
  skills: string[];
  variant?: "primary" | "secondary";
}

export default function SkillTags({ title, skills, variant = "primary" }: SkillTagsProps) {
  const tagClass =
    variant === "primary"
      ? "bg-primary/10 text-primary border border-primary/20"
      : "bg-secondary/10 text-secondary border border-secondary/20";

  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${tagClass}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
