export const databaseSchemaPath = "packages/database/prisma/schema.prisma";

export interface DatabasePackageStatus {
  readonly status: "schema-only";
  readonly migrationsCreated: false;
}

export const databasePackageStatus: DatabasePackageStatus = {
  status: "schema-only",
  migrationsCreated: false
};
