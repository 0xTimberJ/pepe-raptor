import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { BurgerCard } from "../components/burger-card";
import { useBurgers } from "../hooks/use-burgers";

export function MenuScreen() {
  const { burgers, loading, error, refetch } = useBurgers();

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

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-6 shadow-sm">
        <Text className="text-3xl font-bold text-gray-900">Menu Burgers</Text>
      </View>

      <FlatList
        data={burgers}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4 gap-3"
        renderItem={({ item }) => <BurgerCard burger={item} />}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-20 px-4">
            <Text className="text-gray-400 text-6xl mb-4">🍔</Text>
            <Text className="text-gray-600 text-lg font-semibold mb-2">
              Aucun burger disponible
            </Text>
            <Text className="text-gray-500 text-sm text-center">
              La base de données est vide.{"\n"}
              Ajoute des burgers dans PocketBase pour les voir ici.
            </Text>
          </View>
        }
      />
    </View>
  );
}
