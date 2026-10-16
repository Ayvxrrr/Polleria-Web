import type { ReactNode } from 'react';

export function SectionHeading({ eyebrow, title, description, action }: { eyebrow: string; title: ReactNode; description?: string; action?: ReactNode }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>{action}</div>;
}
