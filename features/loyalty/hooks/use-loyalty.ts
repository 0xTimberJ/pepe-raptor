import { useEffect, useCallback } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/auth-store";
import * as Haptics from "expo-haptics";
import { REWARDS, type RewardTier } from "../constants/rewards";

export function useLoyalty() {
  const router = useRouter();
  const { user, isAuthenticated, logout, refreshUser } = useAuthStore();
  const userPoints = user?.points || 0;

  useEffect(() => {
    if (isAuthenticated) {
      refreshUser();
    }
  }, [isAuthenticated, refreshUser]);

  const handleLogout = useCallback(() => {
    logout();
    router.replace("/");
  }, [logout, router]);

  const getNextReward = useCallback((): RewardTier | null => {
    for (const reward of REWARDS) {
      if (userPoints < reward.points) {
        return reward;
      }
    }
    return null;
  }, [userPoints]);

  const canRedeemTier = useCallback(
    (tier: RewardTier) => userPoints >= tier.points,
    [userPoints]
  );

  const handleRedeemPress = useCallback(
    (tier: RewardTier) => {
      if (canRedeemTier(tier)) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push(`/redeem?tier=${tier.points}` as any);
      }
    },
    [canRedeemTier, router]
  );

  const nextReward = getNextReward();
  const progressPercent = nextReward
    ? Math.min((userPoints / nextReward.points) * 100, 100)
    : 100;

  return {
    user,
    isAuthenticated,
    userPoints,
    nextReward,
    progressPercent,
    rewards: REWARDS,
    canRedeemTier,
    handleRedeemPress,
    handleLogout,
    navigateToAuth: () => router.push("/auth" as any),
    navigateBack: () => router.back(),
  };
}
