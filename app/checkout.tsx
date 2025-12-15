import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function Checkout() {
  return (
    <View className="flex-1 bg-gray-50 justify-center items-center px-4">
      <Text className="text-6xl mb-4">💳</Text>
      <Text className="text-xl font-semibold text-gray-900">Checkout</Text>
      <Text className="text-gray-500">À venir...</Text>
    </View>
  );
}
