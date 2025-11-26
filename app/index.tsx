import { getBurgers, getImageUrl, type Burger } from "@/services/burgers";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Index() {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBurgers();
  }, []);

  const loadBurgers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBurgers();
      setBurgers(data);
      if (data.length === 0) {
        console.log("BDD est vide");
        setBurgers([]);
      }
    } catch (err) {
      setError("Erreur lors du chargement des burgers");
      console.error(err);
      setBurgers([]);
    } finally {
      setLoading(false);
    }
  };

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
        <Text
          onPress={loadBurgers}
          className="text-blue-500 underline text-base"
        >
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
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl p-4 shadow-sm flex-row gap-4">
            {item.image && (
              <Image
                source={{ uri: getImageUrl(item, item.image) }}
                className="w-24 h-24 rounded-lg"
                contentFit="cover"
              />
            )}
            <View className="flex-1 gap-2">
              <Text className="text-lg font-semibold text-gray-900">
                {item.name}
              </Text>
              {item.description && (
                <Text className="text-sm text-gray-600" numberOfLines={2}>
                  {item.description}
                </Text>
              )}
              <Text className="text-base font-semibold text-blue-600 mt-1">
                {(item.price ?? 0).toFixed(2)} €
              </Text>
            </View>
          </View>
        )}
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
