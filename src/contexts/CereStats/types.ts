export interface CereStatsContextInterface {
  fetchEraPoints: (v: string, e: number) => void;
  payouts: any;
  // The Cere Stats does not currently support `poolClaims`.
  // We need it to maintain consistency with the `useSubscan` hook and for possible future support of `poolClaims`.
  poolClaims: [];
}
