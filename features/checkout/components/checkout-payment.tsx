import { View, TextInput } from "react-native";
import { Text } from "@/components/ui/text";

interface CheckoutPaymentProps {
  tableNumber: string;
  total: number;
}

export function CheckoutPayment({ tableNumber, total }: CheckoutPaymentProps) {
  return (
    <View className="bg-white rounded-xl p-6">
      <Text className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Paiement par carte
      </Text>
      
      <View className="mb-4">
        <Text className="text-sm text-gray-600 mb-2">Numero de carte</Text>
        <TextInput
          placeholder="1234 5678 9012 3456"
          className="bg-gray-100 rounded-xl px-4 py-3 text-gray-900"
          keyboardType="number-pad"
          maxLength={19}
        />
      </View>
      
      <View className="flex-row gap-4 mb-4">
        <View className="flex-1">
          <Text className="text-sm text-gray-600 mb-2">Date exp.</Text>
          <TextInput
            placeholder="MM/AA"
            className="bg-gray-100 rounded-xl px-4 py-3 text-gray-900"
            maxLength={5}
          />
        </View>
        <View className="flex-1">
          <Text className="text-sm text-gray-600 mb-2">CVV</Text>
          <TextInput
            placeholder="123"
            className="bg-gray-100 rounded-xl px-4 py-3 text-gray-900"
            keyboardType="number-pad"
            maxLength={3}
            secureTextEntry
          />
        </View>
      </View>

      <View className="bg-gray-100 rounded-xl p-4 mt-4">
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Table</Text>
          <Text className="font-semibold text-gray-900">{tableNumber}</Text>
        </View>
        <View className="flex-row justify-between mt-2">
          <Text className="text-gray-600">Total a payer</Text>
          <Text className="font-bold text-primary">{total.toFixed(2)} €</Text>
        </View>
      </View>
    </View>
  );
}
