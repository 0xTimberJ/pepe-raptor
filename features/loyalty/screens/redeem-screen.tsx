import { ScrollView, View, Pressable, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { useRedeem } from "../hooks/use-redeem";

export function RedeemScreen() {
  const {
    tierInfo,
    items,
    userPoints,
    requiredPoints,
    canRedeem,
    pointsDeficit,
    selectedItem,
    isRedeeming,
    isAuthenticated,
    handleSelectItem,
    handleRedeem,
    navigateToAuth,
    navigateBack,
  } = useRedeem();

  if (!isAuthenticated) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center px-6">
        <Text className="text-5xl mb-4">🔒</Text>
        <Text className="text-gray-900 text-xl font-bold mb-2">
          Connexion requise
        </Text>
        <Text className="text-gray-500 text-center mb-6">
          Connecte-toi pour échanger tes points
        </Text>
        <Pressable
          onPress={navigateToAuth}
          className="bg-primary px-8 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Se connecter</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-primary px-4 pt-12 pb-6">
        <Pressable onPress={navigateBack} className="mb-4">
          <Text className="text-primary-foreground text-lg font-medium">
            ← Retour
          </Text>
        </Pressable>

        <View className="flex-row items-center">
          <Text className="text-4xl mr-3">{tierInfo.emoji}</Text>
          <View>
            <Text className="text-primary-foreground text-2xl font-bold">
              {tierInfo.title}
            </Text>
            <Text className="text-primary-foreground/80">
              Choisis ta récompense
            </Text>
          </View>
        </View>
      </View>

      <View className="px-4 py-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-gray-500 text-sm">Tes points</Text>
            <Text className="text-primary text-2xl font-bold">
              {userPoints} pts
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-gray-500 text-sm">Coût</Text>
            <Text className="text-red-500 text-2xl font-bold">
              -{requiredPoints} pts
            </Text>
          </View>
        </View>
        {!canRedeem && (
          <View className="mt-3 bg-red-50 p-3 rounded-xl border border-red-200">
            <Text className="text-red-600 text-center">
              ⚠️ Il te manque {pointsDeficit} points
            </Text>
          </View>
        )}
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        <Text className="text-gray-500 text-sm mb-4 uppercase tracking-wider">
          Sélectionne un produit
        </Text>

        {items.map((item) => {
          const isSelected = selectedItem === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => handleSelectItem(item.id)}
              className={`mb-4 rounded-2xl overflow-hidden border-2 ${
                isSelected ? "border-primary" : "border-gray-200"
              }`}
            >
              <View className="bg-white p-4 flex-row items-center">
                <Image
                  source={item.image}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                  }}
                  resizeMode="cover"
                />
                <View className="flex-1 ml-4">
                  <Text className="text-gray-400 text-xs uppercase tracking-wider">
                    {item.category}
                  </Text>
                  <Text className="text-gray-900 text-lg font-bold mt-1">
                    {item.name}
                  </Text>
                  <Text className="text-green-600 text-sm font-semibold mt-1">
                    GRATUIT avec {requiredPoints} pts
                  </Text>
                </View>
                {isSelected && (
                  <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                    <Text className="text-white font-bold">✓</Text>
                  </View>
                )}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      <View className="px-4 py-4 bg-white border-t border-gray-200">
        <Pressable
          onPress={handleRedeem}
          disabled={!selectedItem || !canRedeem || isRedeeming}
          className={`py-4 rounded-xl ${
            selectedItem && canRedeem ? "bg-primary" : "bg-gray-200"
          }`}
        >
          <Text
            className={`text-center font-bold text-lg ${
              selectedItem && canRedeem ? "text-white" : "text-gray-400"
            }`}
          >
            {isRedeeming
              ? "Échange en cours..."
              : selectedItem
                ? `Échanger pour ${requiredPoints} pts`
                : "Sélectionne un produit"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
