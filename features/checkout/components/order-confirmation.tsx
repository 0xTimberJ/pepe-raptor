import { View } from "react-native";
import { Text } from "@/components/ui/text";
import Animated, { FadeIn } from "react-native-reanimated";

interface OrderConfirmationProps {
  orderNumber: string;
  total: number;
}

export function OrderConfirmation({
  orderNumber,
  total,
}: OrderConfirmationProps) {
  return (
    <View className="flex-1 items-center justify-center p-8">
      <Animated.View
        entering={FadeIn}
        className="bg-white rounded-2xl border-2 border-green-200 p-8 w-full max-w-md"
        style={{
          shadowColor: "#10b981",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.2,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        <View className="items-center">
          <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center mb-6">
            <Text className="text-6xl">✓</Text>
          </View>
          
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Commande validée !
          </Text>
          
          <Text className="text-gray-600 text-center mb-8">
            Votre paiement a été confirmé
          </Text>

          <View className="bg-gray-50 rounded-xl p-6 w-full border border-gray-200 mb-6">
            <Text className="text-sm text-gray-600 text-center mb-2">
              Numéro de commande
            </Text>
            <Text
              className="text-4xl font-bold text-gray-900 text-center font-mono"
              selectable
            >
              {orderNumber}
            </Text>
          </View>

          <View className="w-full gap-4 mb-6">
            <View className="flex-row justify-between items-center pb-3 border-b border-gray-200">
              <Text className="text-gray-600 text-base">Montant payé</Text>
              <Text className="font-bold text-gray-900 text-xl">
                {total.toFixed(2)} €
              </Text>
            </View>
            
            <View className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <Text className="text-blue-900 font-semibold text-center mb-2">
                Votre commande sera prête dans
              </Text>
              <Text className="text-blue-900 text-3xl font-bold text-center">
                15-20 min
              </Text>
            </View>
          </View>

          <Text className="text-gray-500 text-sm text-center">
            Vous pouvez présenter ce numéro au comptoir{"\n"}pour récupérer
            votre commande
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}
