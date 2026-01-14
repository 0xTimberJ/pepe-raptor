import { useState, useCallback, useMemo } from "react";
import { useRouter } from "expo-router";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import * as Haptics from "expo-haptics";

export type CheckoutStep = "recap" | "table" | "payment" | "confirmation";

export const STEP_TITLES: Record<
  Exclude<CheckoutStep, "confirmation">,
  string
> = {
  recap: "Recapitulatif",
  table: "Numero de table",
  payment: "Paiement",
};

export function useCheckout() {
  const router = useRouter();
  const { items, getPaidTotal, hasOnlyRewards, clearCart } = useCartStore();
  const { user, isAuthenticated, addPoints } = useAuthStore();

  const [step, setStep] = useState<CheckoutStep>("recap");
  const [tableNumber, setTableNumber] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const paidTotal = useMemo(() => getPaidTotal(), [getPaidTotal]);
  const onlyRewards = useMemo(() => hasOnlyRewards(), [hasOnlyRewards]);
  const pointsToEarn = useMemo(() => Math.floor(paidTotal), [paidTotal]);

  const handleValidateRecap = useCallback(() => {
    if (items.length === 0) return;
    setStep("table");
  }, [items.length]);

  const handleFreeOrder = useCallback(async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    setOrderNumber(`CMD-${Date.now().toString().slice(-6)}`);
    setEarnedPoints(0);

    clearCart();
    setStep("confirmation");
  }, [clearCart]);

  const handleValidateTable = useCallback(() => {
    if (!tableNumber) return;

    if (onlyRewards) {
      handleFreeOrder();
    } else {
      setStep("payment");
    }
  }, [tableNumber, onlyRewards, handleFreeOrder]);

  const handlePayment = useCallback(async () => {
    setPaymentLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const success = Math.random() > 0.1;

    if (success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      setOrderNumber(`CMD-${Date.now().toString().slice(-6)}`);
      setEarnedPoints(pointsToEarn);

      if (isAuthenticated && user && pointsToEarn > 0) {
        await addPoints(pointsToEarn);
      }

      clearCart();
      setStep("confirmation");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      alert("Paiement refuse. Veuillez reessayer.");
    }

    setPaymentLoading(false);
  }, [pointsToEarn, isAuthenticated, user, addPoints, clearCart]);

  return {
    step,
    items,
    tableNumber,
    setTableNumber,
    orderNumber,
    earnedPoints,
    paymentLoading,
    paidTotal,
    onlyRewards,
    pointsToEarn,
    isAuthenticated,
    handleValidateRecap,
    handleValidateTable,
    handlePayment,
    navigateBack: () => router.back(),
    navigateToMenu: () => router.replace("/menu"),
  };
}
