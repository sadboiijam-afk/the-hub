import type { ReactNode } from "react";

export interface ProductShellProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly children?: ReactNode;
}

export function ProductShell({ eyebrow, title, description, children }: ProductShellProps) {
  return (
    <header
      style={{
        maxWidth: "860px"
      }}
    >
      <p
        style={{
          margin: "0 0 12px",
          color: "var(--accent)",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0"
        }}
      >
        {eyebrow}
      </p>
      <h1
        style={{
          margin: 0,
          color: "var(--text)",
          fontSize: "clamp(40px, 7vw, 82px)",
          lineHeight: 0.96,
          letterSpacing: "0"
        }}
      >
        {title}
      </h1>
      <p
        style={{
          maxWidth: "720px",
          margin: "22px 0 0",
          color: "var(--muted)",
          fontSize: "20px",
          lineHeight: 1.55
        }}
      >
        {description}
      </p>
      {children}
    </header>
  );
}
