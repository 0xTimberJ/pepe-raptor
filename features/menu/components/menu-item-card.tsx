import { Image } from "expo-image";
import { Dimensions, Text, View } from "react-native";
import { pb } from "@/lib/pocketbase";
import type { MenuItem } from "../types/menu-item";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 16 * 2 - 8) / 2; // screen width - padding - gap

interface MenuItemCardProps {
  item: MenuItem;
}

function getImageUrl(record: MenuItem, filename: string): string {
  return pb.files.getURL(record, filename);
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <View
      className="bg-white rounded-xl overflow-hidden shadow-sm"
      style={{ width: CARD_WIDTH }}
    >
      {item.image && (
        <Image
          source={{ uri: getImageUrl(item, item.image) }}
          className="w-full h-32"
          contentFit="cover"
        />
      )}
      <View className="p-3 gap-1">
        <Text
          className="text-base font-semibold text-gray-900"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        {item.description && (
          <Text className="text-xs text-gray-600" numberOfLines={2}>
            {item.description}
          </Text>
        )}
        <Text className="text-sm font-semibold text-blue-600 mt-1">
          {(item.price ?? 0).toFixed(2)} €
        </Text>
      </View>
    </View>
  );
}
