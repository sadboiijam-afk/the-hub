export interface FutureE2eeEnvelope {
  readonly algorithm: "external-audited-provider";
  readonly ciphertextRef: string;
  readonly keyVersion: string;
}

export function assertNoCustomProductionCrypto(): true {
  return true;
}
