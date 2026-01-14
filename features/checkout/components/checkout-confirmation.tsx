import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

interface CheckoutConfirmationProps {
  orderNumber: string;
  tableNumber: string;
  earnedPoints: number;
  isAuthenticated: boolean;
  onReturnToMenu: () => void;
}

export function CheckoutConfirmation({
  orderNumber,
  tableNumber,
  earnedPoints,
  isAuthenticated,
  onReturnToMenu,
}: CheckoutConfirmationProps) {
  return (
    <View className="flex-1 bg-gray-50 justify-center items-center px-6">
      <View className="bg-white rounded-2xl p-8 items-center w-full border border-gray-200">
        <Text className="text-6xl mb-4">✅</Text>
        <Text className="text-2xl font-bold text-gray-900 mb-2">Merci !</Text>
        <Text className="text-gray-500 text-center mb-6">
          Votre commande a ete enregistree
        </Text>

        <View className="bg-primary/10 rounded-xl p-4 w-full mb-6">
          <Text className="text-center text-gray-600 mb-1">
            Numero de commande
          </Text>
          <Text className="text-center text-2xl font-bold text-primary">
            {orderNumber}
          </Text>
        </View>

        <View className="bg-gray-100 rounded-xl p-4 w-full mb-6">
          <Text className="text-center text-gray-600 mb-1">Table</Text>
          <Text className="text-center text-xl font-semibold text-gray-900">
            {tableNumber}
          </Text>
        </View>

        {isAuthenticated && earnedPoints > 0 && (
          <View className="bg-green-50 rounded-xl p-3 w-full mb-6">
            <Text className="text-center text-green-700">
              +{earnedPoints} points de fidelite ajoutes !
            </Text>
          </View>
        )}

        <Button onPress={onReturnToMenu} className="w-full">
          <Text className="text-white font-semibold">Retour au menu</Text>
        </Button>
      </View>
    </View>
  );
}
