import { components } from "../../lib/api/types/generated";

export enum ReferralStatus {
  inactive = "inactive",
  trial = "trial",
  purchased = "purchased",
}

export type Referral = components["schemas"]["ReferralDto"];

export interface ReferralStats {
  total: number;
  purchased: number;
  trial: number;
  inactive: number;
}

export interface ReferralData {
  stats: ReferralStats;
  referrals: Referral[];
}
