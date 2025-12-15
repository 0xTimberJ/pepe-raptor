import { Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";
import { useCartStore } from "@/stores/cart-store";
import { useRouter } from "expo-router";

export function CartButton() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push("/cart" as any)}
      className="relative p-2"
    >
      <Text className="text-2xl">🛒</Text>
      {itemCount > 0 && (
        <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[20px] h-5 items-center justify-center px-1">
          <Text className="text-white text-xs font-bold">{itemCount}</Text>
        </View>
      )}
    </Pressable>
  );
}
