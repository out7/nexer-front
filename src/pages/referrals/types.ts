export enum ReferralStatus {
  inactive = "inactive",
  trial = "trial",
  purchased = "purchased",
}

export interface Referral {
  id: string;
  referrerId: string;
  referredCustomerId: string;
  status: ReferralStatus;
  createdAt: string;
  updatedAt: string;
  referredCustomer: {
    telegramId: number;
    username?: string;
  };
}

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
