import { adminQueues } from "@lucid/shared-types";
import { ProductShell } from "@lucid/ui";

export default function AdminHomePage() {
  return (
    <main className="admin-page">
      <ProductShell
        eyebrow="Operations console"
        title="Trust and compliance workspace"
        description="A Phase 0 admin shell for merchant verification, reports, mini-app reviews, audit logs, and feature flags."
      />
      <section className="queue-list" aria-label="Admin queues">
        {adminQueues.map((queue) => (
          <article className="queue-row" key={queue.name}>
            <div>
              <h2>{queue.name}</h2>
              <p>{queue.description}</p>
            </div>
            <span>{queue.phase}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
