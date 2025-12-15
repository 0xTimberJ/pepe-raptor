import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { MenuSection } from "../components/menu-section";
import { useMenu } from "../hooks/use-menu";
import type { MenuSection as MenuSectionType } from "../types/menu-item";
import { CartButton } from "@/components/cart-button";

export function MenuScreen() {
  const {
    burgers,
    desserts,
    drinks,
    frites,
    sauces,
    snacks,
    loading,
    error,
    refetch,
  } = useMenu();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="mt-4 text-gray-600">Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-4">
        <Text className="text-red-500 text-lg font-semibold mb-4">{error}</Text>
        <Text onPress={refetch} className="text-blue-500 underline text-base">
          Réessayer
        </Text>
      </View>
    );
  }

  const sections: MenuSectionType[] = [
    { id: "burgers" as const, title: "Burgers", emoji: "🍔", items: burgers },
    { id: "snacks" as const, title: "Snacks", emoji: "🍟", items: snacks },
    { id: "frites" as const, title: "Frites", emoji: "🍟", items: frites },
    { id: "sauce" as const, title: "Sauces", emoji: "🥫", items: sauces },
    { id: "drinks" as const, title: "Boissons", emoji: "🥤", items: drinks },
    {
      id: "desserts" as const,
      title: "Desserts",
      emoji: "🍰",
      items: desserts,
    },
  ].filter((section) => section.items.length > 0);

  const hasAnyItems = sections.length > 0;

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-6 shadow-sm flex-row justify-between items-center">
        <Text className="text-3xl font-bold text-gray-900">Menu</Text>
        <CartButton />
      </View>

      {hasAnyItems ? (
        <ScrollView
          className="flex-1"
          contentContainerClassName="py-4"
          showsVerticalScrollIndicator={false}
        >
          {sections.map((section) => (
            <MenuSection key={section.id} section={section} />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center py-20 px-4">
          <Text className="text-gray-400 text-6xl mb-4">🍽️</Text>
          <Text className="text-gray-600 text-lg font-semibold mb-2">
            Menu vide
          </Text>
          <Text className="text-gray-500 text-sm text-center">
            Aucun produit disponible.{"\n"}
          </Text>
        </View>
      )}
    </View>
  );
}
