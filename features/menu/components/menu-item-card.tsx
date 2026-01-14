import { Image } from "expo-image";
import { Text, View, useWindowDimensions } from "react-native";
import { getImageUrl } from "@/lib/image";
import type { MenuItem } from "../types/menu-item";

const PADDING = 16;
const GAP = 8;
const CONTENT_HEIGHT = 100;

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { width: screenWidth } = useWindowDimensions();

  const cardWidth = (screenWidth - PADDING * 2 - GAP) / 2;
  const imageSize = cardWidth;
  const cardHeight = imageSize + CONTENT_HEIGHT;

  return (
    <View
      className="bg-white rounded-xl overflow-hidden border border-gray-100"
      style={{ width: cardWidth, height: cardHeight }}
    >
      {item.image ? (
        <Image
          source={{ uri: getImageUrl(item, item.image) }}
          style={{ width: imageSize, height: imageSize }}
          contentFit="cover"
        />
      ) : (
        <View
          className="bg-gray-200 items-center justify-center"
          style={{ width: imageSize, height: imageSize }}
        >
          <Text className="text-4xl">🍔</Text>
        </View>
      )}
      <View className="p-3 flex-1 justify-between">
        <View>
          <Text
            className="text-base font-semibold text-gray-900 mb-1"
            numberOfLines={2}
          >
            {item.name}
          </Text>
          {item.description && (
            <Text className="text-xs text-gray-600" numberOfLines={2}>
              {item.description}
            </Text>
          )}
        </View>
        <Text className="text-sm font-semibold text-blue-600">
          {(item.price ?? 0).toFixed(2)} €
        </Text>
      </View>
    </View>
  );
}
