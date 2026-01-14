import { FlatList, Pressable, Text, View } from "react-native";
import { ItemDetailDialog } from "./item-detail-dialog";
import { MenuItemCard } from "./menu-item-card";
import { useState } from "react";
import type {
  MenuSection as MenuSectionType,
  MenuItem,
} from "../types/menu-item";

interface MenuSectionProps {
  section: MenuSectionType;
}

export function MenuSection({ section }: MenuSectionProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (section.items.length === 0) {
    return null;
  }

  const handleItemPress = (item: MenuItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  return (
    <>
      <View className="mb-6">
        <View className="flex-row items-center gap-2 mb-4 px-4">
          <Text className="text-2xl">{section.emoji}</Text>
          <Text className="text-2xl font-bold text-gray-900">
            {section.title}
          </Text>
        </View>
        <FlatList
          data={section.items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleItemPress(item)}
              className="active:opacity-80"
            >
              <MenuItemCard item={item} />
            </Pressable>
          )}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          scrollEnabled={false}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        />
      </View>
      <ItemDetailDialog
        item={selectedItem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={section.id}
      />
    </>
  );
}
