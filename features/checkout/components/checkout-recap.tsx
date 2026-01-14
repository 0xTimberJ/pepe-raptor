import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Image } from "expo-image";
import { pb } from "@/lib/pocketbase";
import type { CartItem } from "@/stores/cart-store";

function getImageUrl(record: any, filename: string): string {
  return pb.files.getURL(record, filename);
}

interface CheckoutRecapProps {
  items: CartItem[];
  total: number;
  pointsToEarn: number;
  isAuthenticated: boolean;
}

export function CheckoutRecap({ items, total, pointsToEarn, isAuthenticated }: CheckoutRecapProps) {
  return (
    <>
      {items.map((item) => (
        <View key={item.id} className="flex-row bg-white rounded-xl p-3 mb-3 border border-gray-100">
          {item.product.image && (
            <Image
              source={{ uri: getImageUrl(item.product, item.product.image) }}
              style={{ width: 60, height: 60, borderRadius: 8 }}
              contentFit="cover"
            />
          )}
          <View className="flex-1 ml-3">
            <Text className="font-semibold text-gray-900">{item.product.name}</Text>
            {item.extras.length > 0 && (
              <Text className="text-xs text-gray-500">
                + {item.extras.map((e) => e.name).join(", ")}
              </Text>
            )}
            <Text className="text-sm text-gray-600">x{item.quantity}</Text>
          </View>
          <Text className="font-semibold text-primary">
            {(item.unitPrice * item.quantity).toFixed(2)} €
          </Text>
        </View>
      ))}

      <View className="bg-white rounded-xl p-4 mt-4">
        <View className="flex-row justify-between">
          <Text className="text-lg font-semibold text-gray-900">Total</Text>
          <Text className="text-xl font-bold text-primary">{total.toFixed(2)} €</Text>
        </View>
        {isAuthenticated && (
          <Text className="text-green-600 text-sm mt-2">
            Vous gagnerez {pointsToEarn} points fidelite
          </Text>
        )}
      </View>
    </>
  );
}
