const capabilities = [
  ["Identity", "Verified profiles, privacy settings, consent records, and trusted access boundaries."],
  ["Messaging", "Private communication architecture with future E2EE-ready boundaries."],
  ["Communities", "Local groups, channels, reporting, appeals, and moderation workflows."],
  ["Verified merchants", "Profiles, customer chat, service catalogs, and trust signals for local business."],
  ["Mini-apps", "Permissioned apps with reviewed manifests, launch tokens, and privacy-first SDKs."],
  ["Bookings", "Restaurants, services, venues, and experiences organized inside the hub."],
  ["Coupons", "Merchant offers, loyalty moments, and local incentives without spammy mechanics."],
  ["Trust & Safety", "GDPR-aware data rights, DSA-aware reporting, audit trails, and appeals."],
  ["Partner payments later", "Future regulated PSP-based checkout without own-wallet behavior in the MVP."]
];

const trustItems = [
  "GDPR-aware from day one",
  "DSA-aware reporting and appeals",
  "No own wallet in MVP",
  "No stored payment credentials",
  "No private-chat AI training",
  "Future E2EE-ready messaging boundary"
];

const platformItems = [
  ["Reviewed manifests", "Every mini-app declares entry URLs, versions, and intent before launch."],
  ["Permissioned launch", "Scoped launch tokens keep user and merchant context explicit."],
  ["Merchant services", "Bookings, coupons, loyalty, and customer chat become composable surfaces."],
  ["Privacy-first SDK", "Developer ergonomics without raw private-chat access or hidden data flows."]
];

const stack = ["Expo", "Next.js", "NestJS", "Prisma", "PostgreSQL", "Redis", "Cloudflare", "R2", "Durable Objects later"];

function LucidMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
    </span>
  );
}

function MiniGlyph({ tone }: Readonly<{ tone: "mint" | "violet" | "blue" | "rose" }>) {
  return (
    <span className={`mini-glyph ${tone}`} aria-hidden="true">
      <span />
    </span>
  );
}

function HeroDevice() {
  return (
    <div className="hero-device" aria-label="LUCID Hub app preview">
      <div className="phone-shell">
        <div className="phone-screen">
          <div className="phone-top">
            <span>LUCID Hub</span>
            <div>
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="status-card">
            <MiniGlyph tone="mint" />
            <div>
              <strong>Good morning, Emma</strong>
              <span>Your local trust layer is active.</span>
            </div>
            <b>98</b>
          </div>
          <div className="quick-actions">
            {["Chat", "Groups", "Shops", "Book", "Save"].map((item) => (
              <button key={item} type="button">
                <span />
                {item}
              </button>
            ))}
          </div>
          <div className="booking-card">
            <div>
              <span>Upcoming booking</span>
              <strong>Maison Verde</strong>
              <small>Tonight, 19:30</small>
            </div>
            <button type="button">Open</button>
          </div>
          <div className="merchant-list">
            {[
              ["Cafe LUCID", "10% off pastries", "mint"],
              ["Baie & Co.", "Free delivery today", "blue"],
              ["Studio M", "Book now", "violet"]
            ].map(([name, detail, tone]) => (
              <div className="merchant-row" key={name}>
                <span className={`merchant-thumb ${tone}`} />
                <div>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                </div>
                <i />
              </div>
            ))}
          </div>
          <div className="phone-nav">
            {["Home", "Discover", "Create", "Chat", "Profile"].map((item) => (
              <span key={item} className={item === "Create" ? "active" : undefined}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="dashboard-float top">
        <span>EU data residency</span>
        <strong>Policy-ready</strong>
      </div>
      <div className="dashboard-float bottom">
        <span>Merchant pulse</span>
        <strong>24 bookings today</strong>
      </div>
    </div>
  );
}

function PreviewCards() {
  const previews = [
    {
      title: "Home / Discover",
      text: "Local places, communities, offers, and booking moments in one trusted feed.",
      tone: "mint" as const,
      rows: ["Trusted nearby", "Open bookings", "New community"]
    },
    {
      title: "Chat / Community",
      text: "Secure social spaces with reports, appeals, roles, and moderation trails.",
      tone: "blue" as const,
      rows: ["Family group", "Venue channel", "Appeal status"]
    },
    {
      title: "Merchant booking",
      text: "Verified profiles, available slots, coupons, and loyalty touchpoints.",
      tone: "violet" as const,
      rows: ["Maison Verde", "Today 19:30", "10% loyalty"]
    }
  ];

  return (
    <div className="preview-grid">
      {previews.map((preview) => (
        <article className="app-preview" key={preview.title}>
          <div className="preview-window">
            <div className="preview-head">
              <span />
              <span />
              <span />
            </div>
            <MiniGlyph tone={preview.tone} />
            {preview.rows.map((row) => (
              <div className="preview-row" key={row}>
                <i />
                <span>{row}</span>
              </div>
            ))}
          </div>
          <h3>{preview.title}</h3>
          <p>{preview.text}</p>
        </article>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="site-shell">
      <section className="hero" id="product">
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <nav className="top-nav" aria-label="Main navigation">
          <a className="brand" href="#product" aria-label="LUCID Hub home">
            <LucidMark />
            <span>LUCID Hub</span>
          </a>
          <div className="nav-links" aria-label="Product sections">
            <a href="#product">Product</a>
            <a href="#trust">Trust</a>
            <a href="#mini-apps">Mini-apps</a>
            <a href="#merchants">Merchants</a>
            <a href="#developers">Developers</a>
          </div>
          <a className="nav-cta" href="/preview">
            Join waitlist
          </a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1>Europe&rsquo;s trust-first super-app for local life.</h1>
            <p>
              Private messaging, verified communities, local merchants, mini-apps, bookings, coupons, and
              future regulated partner payments &mdash; built for the European market.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="/preview">
                Explore the hub
              </a>
              <a className="secondary-button" href="#trust">
                View trust model
              </a>
            </div>
            <div className="hero-proof" aria-label="LUCID Hub trust signals">
              <span>Privacy by design</span>
              <span>Verified local networks</span>
              <span>Built for Europe</span>
            </div>
          </div>
          <HeroDevice />
        </div>
      </section>

      <section className="section capability-section" aria-labelledby="capability-title">
        <div className="section-heading">
          <p>Product</p>
          <h2 id="capability-title">Everything local life needs, built on trust.</h2>
        </div>
        <div className="capability-grid">
          {capabilities.map(([title, text], index) => (
            <article className="capability-card" key={title}>
              <MiniGlyph tone={index % 4 === 0 ? "mint" : index % 4 === 1 ? "blue" : index % 4 === 2 ? "violet" : "rose"} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section preview-section" id="preview" aria-labelledby="preview-title">
        <div className="section-heading">
          <p>The hub experience</p>
          <h2 id="preview-title">One hub. Many ways to connect.</h2>
        </div>
        <PreviewCards />
      </section>

      <section className="section trust-section" id="trust" aria-labelledby="trust-title">
        <div className="trust-copy">
          <p>Trust at the core</p>
          <h2 id="trust-title">Designed for trust. Built for Europe.</h2>
          <span>
            LUCID Hub starts with privacy, transparency, and accountability so local digital life can scale
            without becoming another extraction platform.
          </span>
        </div>
        <div className="trust-list">
          {trustItems.map((item) => (
            <div key={item}>
              <MiniGlyph tone="mint" />
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section platform-section" id="mini-apps" aria-labelledby="platform-title">
        <div className="platform-copy">
          <p>Mini-app platform</p>
          <h2 id="platform-title">Permissioned mini-apps for the local economy.</h2>
          <span>
            Developers can extend LUCID Hub through reviewed manifests, scoped launch tokens, merchant
            services, and a privacy-first SDK.
          </span>
        </div>
        <div className="platform-grid">
          {platformItems.map(([title, text], index) => (
            <article key={title}>
              <MiniGlyph tone={index % 2 === 0 ? "violet" : "blue"} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="merchants" aria-label="Merchants and developers">
        <article className="merchant-panel">
          <div>
            <p>For merchants</p>
            <h2>Grow locally. Build trust.</h2>
            <span>
              Verified profiles, customer chat, bookings, coupons, loyalty, and future PSP-based checkout
              without storing payment credentials.
            </span>
          </div>
          <div className="merchant-dashboard">
            <div className="dash-head">Cafe LUCID</div>
            <div className="dash-metrics">
              <span>
                <b>24</b>Bookings
              </span>
              <span>
                <b>1,248</b>Views
              </span>
            </div>
            <div className="dash-offer">10% off pastries active</div>
          </div>
        </article>

        <article className="developer-panel" id="developers">
          <div>
            <p>For developers</p>
            <h2>Open platform. Secure by default.</h2>
            <span>
              Build integrations and mini-apps around clear boundaries, typed contracts, and European
              infrastructure assumptions.
            </span>
          </div>
          <div className="architecture-card">
            <strong>LUCID Hub Architecture</strong>
            <span>Client layer</span>
            <span>Secure API gateway</span>
            <span>Core services</span>
            <span>EU data layer</span>
          </div>
        </article>
      </section>

      <section className="tech-strip" aria-label="Technology architecture">
        {stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="final-cta" aria-labelledby="final-title">
        <div>
          <h2 id="final-title">Build the European super-app layer.</h2>
          <p>Join the preview and help shape a local digital life platform built on privacy and trust.</p>
        </div>
        <a className="primary-button" href="/preview">
          Start preview
        </a>
      </section>
    </main>
  );
}
