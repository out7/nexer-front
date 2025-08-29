import { api } from "../axios";
import { operations } from "./types/generated";

export const getReferrals = async () => {
  try {
    const response =
      await api.get<
        operations["ReferralController_getMyReferrals"]["responses"]["200"]["content"]["application/json"]
      >("/referrals/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching referrals:", error);
    throw error;
  }
};
