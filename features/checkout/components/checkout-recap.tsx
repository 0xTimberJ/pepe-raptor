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

export function CheckoutRecap({
  items,
  total,
  pointsToEarn,
  isAuthenticated,
}: CheckoutRecapProps) {
  const rewardItems = items.filter((item) => item.isReward);
  const paidItems = items.filter((item) => !item.isReward);
  const hasRewards = rewardItems.length > 0;
  const hasPaidItems = paidItems.length > 0;

  return (
    <>
      {/* Récompenses */}
      {hasRewards && (
        <View className="mb-4">
          <Text className="text-green-700 font-semibold text-sm mb-2 uppercase tracking-wider">
            🎁 Récompenses fidélité
          </Text>
          {rewardItems.map((item) => (
            <View
              key={item.id}
              className="flex-row bg-green-50 rounded-xl p-3 mb-2 border border-green-200"
            >
              <View
                style={{ width: 60, height: 60, borderRadius: 8 }}
                className="bg-green-100 items-center justify-center"
              >
                <Text className="text-2xl">🎁</Text>
              </View>
              <View className="flex-1 ml-3">
                <Text className="font-semibold text-green-800">
                  {item.product.name}
                </Text>
                <Text className="text-xs text-green-600">
                  {item.product.description}
                </Text>
              </View>
              <Text className="font-semibold text-green-600">GRATUIT</Text>
            </View>
          ))}
        </View>
      )}

      {/* Articles payants */}
      {hasPaidItems && (
        <View>
          {hasRewards && (
            <Text className="text-gray-500 font-semibold text-sm mb-2 uppercase tracking-wider">
              Articles
            </Text>
          )}
          {paidItems.map((item) => (
            <View
              key={item.id}
              className="flex-row bg-white rounded-xl p-3 mb-3 border border-gray-100"
            >
              {item.product.image && (
                <Image
                  source={{
                    uri: getImageUrl(item.product, item.product.image),
                  }}
                  style={{ width: 60, height: 60, borderRadius: 8 }}
                  contentFit="cover"
                />
              )}
              <View className="flex-1 ml-3">
                <Text className="font-semibold text-gray-900">
                  {item.product.name}
                </Text>
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
        </View>
      )}

      {/* Total */}
      <View className="bg-white rounded-xl p-4 mt-4 border border-gray-100">
        {hasRewards && hasPaidItems && (
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Récompenses</Text>
            <Text className="text-green-600 font-semibold">OFFERT</Text>
          </View>
        )}
        <View className="flex-row justify-between">
          <Text className="text-lg font-semibold text-gray-900">
            Total à payer
          </Text>
          {total === 0 ? (
            <Text className="text-xl font-bold text-green-600">GRATUIT 🎉</Text>
          ) : (
            <Text className="text-xl font-bold text-primary">
              {total.toFixed(2)} €
            </Text>
          )}
        </View>
        {isAuthenticated && pointsToEarn > 0 && (
          <Text className="text-green-600 text-sm mt-2">
            Vous gagnerez {pointsToEarn} points fidélité
          </Text>
        )}
        {isAuthenticated && pointsToEarn === 0 && hasRewards && (
          <Text className="text-gray-500 text-sm mt-2">
            Pas de points gagnés pour les commandes gratuites
          </Text>
        )}
      </View>
    </>
  );
}
