import { phaseZeroModules } from "@lucid/shared-types";
import { ProductShell } from "@lucid/ui";

export default function HomePage() {
  return (
    <main className="page">
      <ProductShell
        eyebrow="Phase 0 scaffold"
        title="LUCID Hub"
        description="A privacy-first European platform for trusted local businesses, communities, bookings, coupons, and future regulated partner payments."
      />
      <section className="module-grid" aria-label="Phase 0 module boundaries">
        {phaseZeroModules.map((module) => (
          <article className="module-card" key={module.name}>
            <h2>{module.name}</h2>
            <p>{module.status}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
