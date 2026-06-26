# Open Decisions

Product:

- Which geography launches first?
- Is the first MVP centered on merchants, communities, creators, or venues?
- Which booking workflow is the first vertical?
- What verification evidence is required for merchants?

Architecture:

- Should Next.js apps deploy to Cloudflare Pages, Workers, or another host initially?
- Will realtime use plain WebSockets first or Durable Objects later?
- Which queue abstraction should wrap Redis and future Cloudflare Queues?
- Which search backend should be selected first?

Database:

- Which Prisma relations and cascade rules should be explicit in the first migration?
- What retention rules apply to messages, reports, bookings, and audit logs?
- Which fields need encryption at rest beyond platform defaults?

Security and compliance:

- What is the initial RBAC model?
- Who can access private-message review tooling, if anyone?
- What is the DSA policy taxonomy?
- What vendors require DPA review before launch?

Payments:

- Which regulated PSP will be integrated first?
- What payment methods are in MVP?
- What refund and dispute workflows are required?

Mini-apps:

- What permissions are allowed in v1?
- What is the app review checklist?
- What WebView bridge APIs are allowed?
