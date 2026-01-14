import { useState, useCallback, useMemo } from "react";
import { Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";
import * as Haptics from "expo-haptics";
import { REWARD_ITEMS, TIER_INFO } from "../constants/rewards";

export function useRedeem() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tier: string }>();
  const { user, isAuthenticated } = useAuthStore();
  const { addRewardItem } = useCartStore();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const tier = params.tier || "25";
  const tierInfo = TIER_INFO[tier] || TIER_INFO["25"];
  const items = useMemo(() => REWARD_ITEMS[tier] || [], [tier]);
  const userPoints = user?.points || 0;
  const requiredPoints = parseInt(tier);

  const canRedeem = useMemo(
    () => userPoints >= requiredPoints,
    [userPoints, requiredPoints]
  );

  const pointsDeficit = useMemo(
    () => requiredPoints - userPoints,
    [requiredPoints, userPoints]
  );

  const handleSelectItem = useCallback((itemId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedItem(itemId);
  }, []);

  const handleRedeem = useCallback(async () => {
    if (!selectedItem || !canRedeem || !isAuthenticated) return;

    setIsRedeeming(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const item = items.find((i) => i.id === selectedItem);
    if (!item) {
      setIsRedeeming(false);
      return;
    }

    const { addPoints } = useAuthStore.getState();
    await addPoints(-requiredPoints);

    addRewardItem(item.name, item.category, requiredPoints);

    setIsRedeeming(false);

    Alert.alert(
      "🎉 Récompense ajoutée !",
      `${item.name} a été ajouté à votre panier gratuitement.`,
      [
        {
          text: "Voir le panier",
          onPress: () => router.push("/cart"),
        },
        {
          text: "Continuer",
          onPress: () => router.back(),
        },
      ]
    );
  }, [
    selectedItem,
    canRedeem,
    isAuthenticated,
    items,
    requiredPoints,
    addRewardItem,
    router,
  ]);

  return {
    tier,
    tierInfo,
    items,
    userPoints,
    requiredPoints,
    canRedeem,
    pointsDeficit,
    selectedItem,
    isRedeeming,
    isAuthenticated,
    handleSelectItem,
    handleRedeem,
    navigateToAuth: () => router.push("/auth"),
    navigateBack: () => router.back(),
  };
}
