import { ScrollView, View, Pressable, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";

const IMAGES = {
  burgers: [
    require("@/assets/images/burgers/alley-oop.webp"),
    require("@/assets/images/burgers/bacon-compton.webp"),
    require("@/assets/images/burgers/dr-jack.jpeg"),
  ],
  desserts: [
    require("@/assets/images/desserts/fondant-chocolat.jpeg"),
    require("@/assets/images/desserts/tiramisu.jpeg"),
  ],
  frites: [
    require("@/assets/images/fries/fries.jpeg"),
  ],
  drinks: [
    require("@/assets/images/drinks/coca-cola.jpeg"),
    require("@/assets/images/drinks/coca-zero.jpeg"),
    require("@/assets/images/drinks/cristaline-petillante.jpeg"),
  ],
};

interface RewardTier {
  points: number;
  title: string;
  images: any[];
}

const REWARDS: RewardTier[] = [
  {
    points: 25,
    title: "Boissons",
    images: IMAGES.drinks,
  },
  {
    points: 45,
    title: "Frites & Desserts",
    images: [...IMAGES.frites, ...IMAGES.desserts],
  },
  {
    points: 75,
    title: "Burgers",
    images: IMAGES.burgers,
  },
];

export function LoyaltyScreen() {
  const router = useRouter();
  const userPoints = 0;

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-primary px-4 py-8">
        <Pressable onPress={() => router.back()} className="mb-4">
          <Text className="text-primary-foreground text-lg">← Retour</Text>
        </Pressable>
        <View className="bg-white rounded-2xl p-6 items-center">
          <Text className="text-primary text-lg mb-2">Mes points fidelite</Text>
          <Text className="text-primary text-5xl font-bold">{userPoints}</Text>
          <Text className="text-gray-500 text-sm mt-2">1 euro = 1 point</Text>
        </View>
      </View>

      <View className="flex-1 px-4 py-6">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Recompenses
        </Text>
        <Text className="text-gray-500 mb-6">
          Echangez vos points contre des produits gratuits
        </Text>

        {REWARDS.map((tier) => {
          const canRedeem = userPoints >= tier.points;
          return (
            <View key={tier.points} className="mb-6">
              <View className="flex-row items-center mb-3">
                <View className={`px-4 py-2 rounded-full ${canRedeem ? 'bg-primary' : 'bg-gray-300'}`}>
                  <Text className="text-white font-bold text-lg">{tier.points} pts</Text>
                </View>
                <Text className="ml-3 text-gray-700 font-semibold">{tier.title}</Text>
              </View>

              <Pressable
                disabled={!canRedeem}
                className={`relative h-32 rounded-2xl overflow-hidden ${canRedeem ? 'bg-white border-2 border-primary' : 'bg-gray-100'}`}
              >
                {tier.images.map((img, index) => (
                  <Image
                    key={index}
                    source={img}
                    style={{
                      position: 'absolute',
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      left: 20 + index * 70,
                      top: 25,
                      transform: [{ rotate: `${(index - 1) * 5}deg` }],
                    }}
                    resizeMode="cover"
                  />
                ))}
                {!canRedeem && (
                  <View className="absolute inset-0 bg-black/30 items-center justify-center">
                    <Text className="text-white font-bold text-lg">
                      {tier.points - userPoints} pts manquants
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>
          );
        })}

        <View className="bg-gray-100 rounded-xl p-4 mb-6">
          <Text className="text-gray-800 font-semibold mb-2">Comment ca marche ?</Text>
          <Text className="text-gray-600 text-sm">
            Chaque euro depense = 1 point gagne{"\n"}
            Les points s accumulent sur votre compte{"\n"}
            Echangez-les contre des produits gratuits
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
