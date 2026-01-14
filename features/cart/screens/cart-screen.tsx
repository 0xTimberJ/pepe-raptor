import { View, Pressable, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useCartStore, type CartItem } from "@/stores/cart-store";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { pb } from "@/lib/pocketbase";
import * as Haptics from "expo-haptics";

function getImageUrl(
  record: { id: string; collectionId?: string; collectionName?: string },
  filename: string
): string {
  return pb.files.getURL(record as any, filename);
}

function CartItemRow({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
}) {
  const handleQuantityChange = (newQty: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onUpdateQuantity(newQty);
  };

  const handleRemove = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onRemove();
  };

  const isReward = item.isReward;

  return (
    <View
      className={`flex-row rounded-xl p-3 mb-3 border ${
        isReward ? "bg-green-50 border-green-200" : "bg-white border-gray-100"
      }`}
    >
      {item.product.image ? (
        <Image
          source={{ uri: getImageUrl(item.product, item.product.image) }}
          style={{ width: 70, height: 70, borderRadius: 8 }}
          contentFit="cover"
        />
      ) : isReward ? (
        <View
          style={{ width: 70, height: 70, borderRadius: 8 }}
          className="bg-green-100 items-center justify-center"
        >
          <Text className="text-3xl">🎁</Text>
        </View>
      ) : null}
      <View className="flex-1 ml-3">
        <Text
          className={`font-semibold ${isReward ? "text-green-800" : "text-gray-900"}`}
        >
          {item.product.name}
        </Text>
        {item.extras.length > 0 && (
          <Text className="text-xs text-gray-500">
            + {item.extras.map((e) => e.name).join(", ")}
          </Text>
        )}
        {item.product.description && isReward && (
          <Text className="text-xs text-green-600 mt-0.5">
            {item.product.description}
          </Text>
        )}
        <Text
          className={`text-sm font-semibold mt-1 ${
            isReward ? "text-green-600" : "text-primary"
          }`}
        >
          {isReward ? "GRATUIT" : `${item.unitPrice.toFixed(2)} €`}
        </Text>
      </View>
      <View className="items-center justify-center">
        {!isReward && (
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => handleQuantityChange(item.quantity - 1)}
              className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
            >
              <Text className="text-lg font-bold text-gray-600">−</Text>
            </Pressable>
            <Text className="text-base font-semibold w-6 text-center">
              {item.quantity}
            </Text>
            <Pressable
              onPress={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
            >
              <Text className="text-lg font-bold text-gray-600">+</Text>
            </Pressable>
          </View>
        )}
        <Pressable onPress={handleRemove} className={isReward ? "" : "mt-2"}>
          <Text className="text-xs text-red-500">Supprimer</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function CartScreen() {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotal,
    getPaidTotal,
    hasOnlyRewards,
  } = useCartStore();
  const router = useRouter();
  const total = getTotal();
  const paidTotal = getPaidTotal();
  const onlyRewards = hasOnlyRewards();

  const paidItems = items.filter((item) => !item.isReward);
  const rewardItems = items.filter((item) => item.isReward);

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center px-4">
        <Text className="text-6xl mb-4">🛒</Text>
        <Text className="text-xl font-semibold text-gray-900 mb-2">
          Panier vide
        </Text>
        <Text className="text-gray-500 text-center mb-6">
          Ajoutez des articles depuis le menu
        </Text>
        <Button onPress={() => router.back()}>
          <Text className="text-white">Voir le menu</Text>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-6 border-b border-gray-200">
        <Text className="text-3xl font-bold text-gray-900">Panier</Text>
        <Text className="text-gray-500">{items.length} article(s)</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {rewardItems.length > 0 && (
          <View className="mb-4">
            <Text className="text-green-700 font-semibold text-sm mb-2 uppercase tracking-wider">
              🎁 Récompenses fidélité
            </Text>
            {rewardItems.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
                onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
              />
            ))}
          </View>
        )}

        {paidItems.length > 0 && (
          <View>
            {rewardItems.length > 0 && (
              <Text className="text-gray-500 font-semibold text-sm mb-2 uppercase tracking-wider">
                Articles
              </Text>
            )}
            {paidItems.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
                onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <View className="bg-white px-4 py-4 border-t border-gray-200">
        {rewardItems.length > 0 && paidItems.length > 0 && (
          <View className="mb-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-500">Récompenses</Text>
              <Text className="text-green-600 font-semibold">OFFERT</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-500">Articles</Text>
              <Text className="text-gray-900">{paidTotal.toFixed(2)} €</Text>
            </View>
          </View>
        )}

        <View className="flex-row justify-between mb-4">
          <Text className="text-lg font-semibold text-gray-900">Total</Text>
          {onlyRewards ? (
            <Text className="text-xl font-bold text-green-600">GRATUIT 🎉</Text>
          ) : (
            <Text className="text-xl font-bold text-primary">
              {paidTotal.toFixed(2)} €
            </Text>
          )}
        </View>

        <Button
          onPress={() => router.push("/checkout" as any)}
          className="w-full"
        >
          <Text className="text-white font-semibold">
            {onlyRewards ? "Valider ma commande" : "Commander"}
          </Text>
        </Button>
      </View>
    </View>
  );
}
