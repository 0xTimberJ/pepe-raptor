import { useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "expo-router";

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
  const { items, getTotal, clearCart } = useCartStore();
  const { user, isAuthenticated, addPoints } = useAuthStore();
  
  const [step, setStep] = useState<CheckoutStep>("recap");
  const [tableNumber, setTableNumber] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const total = getTotal();
  const pointsToEarn = Math.floor(total);

  const handleValidateRecap = () => {
    if (items.length === 0) return;
    setStep("table");
  };

  const handleValidateTable = () => {
    if (!tableNumber) return;
    setStep("payment");
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    const pointsToAdd = Math.floor(getTotal());
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const success = Math.random() > 0.1;
    
    if (success) {
      setOrderNumber(`CMD-${Date.now().toString().slice(-6)}`);
      setEarnedPoints(pointsToAdd);
      
      if (isAuthenticated && user) {
        await addPoints(pointsToAdd);
      }
      
      clearCart();
      setStep("confirmation");
    } else {
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
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {step === "recap" && (
          <CheckoutRecap
            items={items}
            total={total}
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
          <CheckoutPayment tableNumber={tableNumber} total={total} />
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
            <Text className="text-white font-semibold">Continuer</Text>
          </Button>
        )}
        {step === "payment" && (
          <Button onPress={handlePayment} disabled={paymentLoading}>
            <Text className="text-white font-semibold">
              {paymentLoading ? "Paiement en cours..." : `Payer ${total.toFixed(2)} €`}
            </Text>
          </Button>
        )}
      </View>
    </View>
  );
}
