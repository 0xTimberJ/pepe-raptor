import { View, Pressable, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useCartStore, type CartItem } from "@/stores/cart-store";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { pb } from "@/lib/pocketbase";

function getImageUrl(record: { id: string; collectionId?: string; collectionName?: string }, filename: string): string {
  return pb.files.getURL(record as any, filename);
}

function CartItemRow({ item, onRemove, onUpdateQuantity }: {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
}) {
  return (
    <View className="flex-row bg-white rounded-xl p-3 mb-3 shadow-sm">
      {item.product.image && (
        <Image
          source={{ uri: getImageUrl(item.product, item.product.image) }}
          style={{ width: 70, height: 70, borderRadius: 8 }}
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
        <Text className="text-sm text-blue-600 font-semibold mt-1">
          {item.unitPrice.toFixed(2)} €
        </Text>
      </View>
      <View className="items-center justify-center">
        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={() => onUpdateQuantity(item.quantity - 1)}
            className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
          >
            <Text className="text-lg font-bold text-gray-600">−</Text>
          </Pressable>
          <Text className="text-base font-semibold w-6 text-center">{item.quantity}</Text>
          <Pressable
            onPress={() => onUpdateQuantity(item.quantity + 1)}
            className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
          >
            <Text className="text-lg font-bold text-gray-600">+</Text>
          </Pressable>
        </View>
        <Pressable onPress={onRemove} className="mt-2">
          <Text className="text-xs text-red-500">Supprimer</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function CartScreen() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const router = useRouter();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center px-4">
        <Text className="text-6xl mb-4">🛒</Text>
        <Text className="text-xl font-semibold text-gray-900 mb-2">Panier vide</Text>
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
      <View className="bg-white px-4 py-6 shadow-sm">
        <Text className="text-3xl font-bold text-gray-900">Panier</Text>
        <Text className="text-gray-500">{items.length} article(s)</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onRemove={() => removeItem(item.id)}
            onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
          />
        ))}
      </ScrollView>

      <View className="bg-white px-4 py-4 border-t border-gray-200">
        <View className="flex-row justify-between mb-4">
          <Text className="text-lg font-semibold text-gray-900">Total</Text>
          <Text className="text-xl font-bold text-blue-600">{total.toFixed(2)} €</Text>
        </View>
        <Button onPress={() => router.push("/checkout" as any)} className="w-full">
          <Text className="text-white font-semibold">Commander</Text>
        </Button>
      </View>
    </View>
  );
}
