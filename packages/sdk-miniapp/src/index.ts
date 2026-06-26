export type MiniAppPermission =
  | "profile:read"
  | "booking:create"
  | "coupon:redeem"
  | "notifications:request";

export interface MiniAppManifest {
  readonly appId: string;
  readonly name: string;
  readonly version: string;
  readonly entryUrl: string;
  readonly permissions: readonly MiniAppPermission[];
}

export function validateManifestShape(manifest: MiniAppManifest): boolean {
  return (
    manifest.appId.length > 0 &&
    manifest.name.length > 0 &&
    manifest.version.length > 0 &&
    manifest.entryUrl.startsWith("https://")
  );
}
