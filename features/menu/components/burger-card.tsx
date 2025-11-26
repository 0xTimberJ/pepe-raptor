import { Image } from "expo-image";
import { Text, View } from "react-native";
import { getImageUrl, type Burger } from "../api/burgers";

interface BurgerCardProps {
  burger: Burger;
}

export function BurgerCard({ burger }: BurgerCardProps) {
  return (
    <View className="bg-white rounded-xl p-4 shadow-sm flex-row gap-4">
      {burger.image && (
        <Image
          source={{ uri: getImageUrl(burger, burger.image) }}
          className="w-24 h-24 rounded-lg"
          contentFit="cover"
        />
      )}
      <View className="flex-1 gap-2">
        <Text className="text-lg font-semibold text-gray-900">
          {burger.name}
        </Text>
        {burger.description && (
          <Text className="text-sm text-gray-600" numberOfLines={2}>
            {burger.description}
          </Text>
        )}
        <Text className="text-base font-semibold text-blue-600 mt-1">
          {(burger.price ?? 0).toFixed(2)} €
        </Text>
      </View>
    </View>
  );
}
