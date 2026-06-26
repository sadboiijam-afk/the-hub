import { defineConfig } from "prisma/config";

const localValidationDatabaseUrl =
  "postgresql://lucid:replace-with-local-dev-password@localhost:5432/lucid_hub";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations"
  },
  datasource: {
    url: process.env.DATABASE_URL ?? localValidationDatabaseUrl
  }
});
