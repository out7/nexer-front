import { ReferralData, ReferralStatus } from "./types";

export const mockReferralData: ReferralData = {
  stats: {
    total: 8,
    purchased: 3,
    trial: 2,
    inactive: 3,
  },
  referrals: [
    {
      id: "1",
      referrerId: "user123",
      referredCustomerId: "ref1",
      status: ReferralStatus.trial,
      createdAt: "2025-03-14T10:00:00Z",
      updatedAt: "2025-03-14T10:00:00Z",
      referredCustomer: {
        telegramId: 123456789,
        username: "user1",
      },
    },
    {
      id: "2",
      referrerId: "user123",
      referredCustomerId: "ref2",
      status: ReferralStatus.inactive,
      createdAt: "2025-03-13T15:30:00Z",
      updatedAt: "2025-03-13T15:30:00Z",
      referredCustomer: {
        telegramId: 987654321,
        username: "user2",
      },
    },
    {
      id: "3",
      referrerId: "user123",
      referredCustomerId: "ref3",
      status: ReferralStatus.purchased,
      createdAt: "2025-03-12T09:15:00Z",
      updatedAt: "2025-03-12T09:15:00Z",
      referredCustomer: {
        telegramId: 555666777,
        username: "user3",
      },
    },
  ],
};
