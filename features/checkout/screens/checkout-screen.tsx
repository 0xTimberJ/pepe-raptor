import { View, ScrollView, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useCheckout, STEP_TITLES } from "../hooks/use-checkout";
import { CheckoutRecap } from "../components/checkout-recap";
import { CheckoutTable } from "../components/checkout-table";
import { CheckoutPayment } from "../components/checkout-payment";
import { CheckoutConfirmation } from "../components/checkout-confirmation";

export function CheckoutScreen() {
  const {
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
    navigateBack,
    navigateToMenu,
  } = useCheckout();

  if (step === "confirmation") {
    return (
      <CheckoutConfirmation
        orderNumber={orderNumber}
        tableNumber={tableNumber}
        earnedPoints={earnedPoints}
        isAuthenticated={isAuthenticated}
        onReturnToMenu={navigateToMenu}
      />
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-primary px-4 py-6">
        <Pressable onPress={navigateBack} className="mb-2">
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
