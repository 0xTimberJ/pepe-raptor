import { useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

import { CheckoutRecap } from "../components/checkout-recap";
import { CheckoutTable } from "../components/checkout-table";
import { CheckoutPayment } from "../components/checkout-payment";
import { CheckoutConfirmation } from "../components/checkout-confirmation";

type CheckoutStep = "recap" | "table" | "payment" | "confirmation";

const STEP_TITLES: Record<Exclude<CheckoutStep, "confirmation">, string> = {
  recap: "Recapitulatif",
  table: "Numero de table",
  payment: "Paiement",
};

export function CheckoutScreen() {
  const router = useRouter();
  const { items, getPaidTotal, hasOnlyRewards, clearCart } = useCartStore();
  const { user, isAuthenticated, addPoints } = useAuthStore();

  const [step, setStep] = useState<CheckoutStep>("recap");
  const [tableNumber, setTableNumber] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const paidTotal = getPaidTotal();
  const onlyRewards = hasOnlyRewards();
  const pointsToEarn = Math.floor(paidTotal);

  const handleValidateRecap = () => {
    if (items.length === 0) return;
    setStep("table");
  };

  const handleValidateTable = () => {
    if (!tableNumber) return;

    if (onlyRewards) {
      handleFreeOrder();
    } else {
      setStep("payment");
    }
  };

  const handleFreeOrder = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    setOrderNumber(`CMD-${Date.now().toString().slice(-6)}`);
    setEarnedPoints(0); // Pas de points gagnés pour les commandes gratuites

    clearCart();
    setStep("confirmation");
  };

  const handlePayment = async () => {
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
  };

  if (step === "confirmation") {
    return (
      <CheckoutConfirmation
        orderNumber={orderNumber}
        tableNumber={tableNumber}
        earnedPoints={earnedPoints}
        isAuthenticated={isAuthenticated}
        onReturnToMenu={() => router.replace("/menu")}
      />
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-primary px-4 py-6">
        <Pressable onPress={() => router.back()} className="mb-2">
          <Text className="text-primary-foreground">← Retour</Text>
        </Pressable>
        <Text className="text-2xl font-bold text-primary-foreground">
          {STEP_TITLES[step]}
        </Text>
        {onlyRewards && step !== "payment" && (
          <View className="mt-2 bg-white/20 px-3 py-1 rounded-full self-start">
            <Text className="text-white text-sm">🎁 Commande gratuite</Text>
          </View>
        )}
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {step === "recap" && (
          <CheckoutRecap
            items={items}
            total={paidTotal}
            pointsToEarn={pointsToEarn}
            isAuthenticated={isAuthenticated}
          />
        )}
        {step === "table" && (
          <CheckoutTable
            tableNumber={tableNumber}
            onTableChange={setTableNumber}
          />
        )}
        {step === "payment" && (
          <CheckoutPayment tableNumber={tableNumber} total={paidTotal} />
        )}
      </ScrollView>

      <View className="bg-white px-4 py-4 border-t border-gray-200">
        {step === "recap" && (
          <Button onPress={handleValidateRecap} disabled={items.length === 0}>
            <Text className="text-white font-semibold">Continuer</Text>
          </Button>
        )}
        {step === "table" && (
          <Button onPress={handleValidateTable} disabled={!tableNumber}>
            <Text className="text-white font-semibold">
              {onlyRewards ? "Valider ma commande" : "Continuer"}
            </Text>
          </Button>
        )}
        {step === "payment" && (
          <Button onPress={handlePayment} disabled={paymentLoading}>
            <Text className="text-white font-semibold">
              {paymentLoading
                ? "Paiement en cours..."
                : `Payer ${paidTotal.toFixed(2)} €`}
            </Text>
          </Button>
        )}
      </View>
    </View>
  );
}
