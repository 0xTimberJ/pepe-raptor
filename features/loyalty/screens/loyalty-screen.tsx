import { ScrollView, View, Pressable, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/auth-store";
import * as Haptics from "expo-haptics";

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
  frites: [require("@/assets/images/fries/fries.jpeg")],
  drinks: [
    require("@/assets/images/drinks/coca-cola.jpeg"),
    require("@/assets/images/drinks/coca-zero.jpeg"),
    require("@/assets/images/drinks/cristaline-petillante.jpeg"),
  ],
};

interface RewardTier {
  points: number;
  title: string;
  emoji: string;
  images: any[];
}

const REWARDS: RewardTier[] = [
  {
    points: 25,
    title: "Boissons",
    emoji: "🥤",
    images: IMAGES.drinks,
  },
  {
    points: 45,
    title: "Frites & Desserts",
    emoji: "🍟",
    images: [...IMAGES.frites, ...IMAGES.desserts],
  },
  {
    points: 75,
    title: "Burgers",
    emoji: "🍔",
    images: IMAGES.burgers,
  },
];

export function LoyaltyScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const userPoints = user?.points || 0;

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  // Calculate progress to next reward
  const getNextReward = () => {
    for (const reward of REWARDS) {
      if (userPoints < reward.points) {
        return reward;
      }
    }
    return null;
  };

  const nextReward = getNextReward();
  const progressPercent = nextReward
    ? Math.min((userPoints / nextReward.points) * 100, 100)
    : 100;

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-primary px-4 pt-12 pb-24">
        <Pressable onPress={() => router.back()} className="mb-6">
          <Text className="text-primary-foreground text-lg font-medium">
            ← Retour
          </Text>
        </Pressable>

        <View className="items-center">
          <Text className="text-primary-foreground/80 text-base mb-1">
            {isAuthenticated && user ? `Salut ${user.name} 👋` : "Programme"}
          </Text>
          <Text className="text-primary-foreground text-3xl font-bold">
            Fidélité
          </Text>
        </View>
      </View>

      {/* Points Card - Floating */}
      <View className="px-4 -mt-16">
        <View className="bg-white rounded-2xl p-6 border border-gray-200">
          {isAuthenticated && user ? (
            <>
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gray-500 text-sm uppercase tracking-wider">
                  Mes points
                </Text>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-700 text-xs font-semibold">
                    Actif
                  </Text>
                </View>
              </View>

              <View className="flex-row items-end mb-6">
                <Text className="text-primary text-6xl font-black">
                  {userPoints}
                </Text>
                <Text className="text-gray-400 text-2xl ml-2 mb-2">pts</Text>
              </View>

              {/* Progress bar */}
              {nextReward && (
                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-500 text-xs">
                      Prochain palier
                    </Text>
                    <Text className="text-primary text-xs font-semibold">
                      {nextReward.points - userPoints} pts restants
                    </Text>
                  </View>
                  <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </View>
                  <Text className="text-gray-400 text-xs mt-2 text-center">
                    {nextReward.emoji} {nextReward.title} à {nextReward.points}{" "}
                    pts
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View className="items-center py-4">
              <Text className="text-5xl mb-4">🎁</Text>
              <Text className="text-gray-900 text-xl font-bold mb-2">
                Rejoins le club !
              </Text>
              <Text className="text-gray-500 text-center mb-6">
                Connecte-toi pour cumuler des points{"\n"}et débloquer des
                récompenses
              </Text>
              <Button onPress={() => router.push("/auth" as any)}>
                <Text className="text-white font-bold">Se connecter</Text>
              </Button>
            </View>
          )}
        </View>
      </View>

      {/* Rewards Section */}
      <View className="px-4 mt-8">
        <Text className="text-gray-900 text-2xl font-bold mb-2">
          🏆 Récompenses
        </Text>
        <Text className="text-gray-500 mb-6">
          Échange tes points contre des produits gratuits
        </Text>

        {REWARDS.map((tier) => {
          const canRedeem = userPoints >= tier.points;
          const isLocked = !canRedeem;

          const handleRedeemPress = () => {
            if (canRedeem) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push(`/redeem?tier=${tier.points}` as any);
            }
          };

          return (
            <Pressable
              key={tier.points}
              onPress={handleRedeemPress}
              disabled={isLocked}
              className={`mb-4 rounded-2xl overflow-hidden border-2 ${
                canRedeem
                  ? "border-primary bg-white"
                  : "border-gray-200 bg-gray-100"
              }`}
            >
              <View className="p-4">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center">
                    <Text className="text-3xl mr-3">{tier.emoji}</Text>
                    <View>
                      <Text
                        className={`font-bold text-lg ${
                          canRedeem ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {tier.title}
                      </Text>
                      <Text
                        className={`text-xs ${
                          canRedeem ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {tier.points} points requis
                      </Text>
                    </View>
                  </View>

                  {isLocked ? (
                    <View className="bg-gray-200 px-3 py-1.5 rounded-full">
                      <Text className="text-gray-500 text-xs font-medium">
                        🔒 {tier.points - userPoints} pts
                      </Text>
                    </View>
                  ) : (
                    <View className="bg-primary px-4 py-2 rounded-full">
                      <Text className="text-white text-sm font-bold">
                        Échanger →
                      </Text>
                    </View>
                  )}
                </View>

                {/* Product images */}
                <View className="flex-row justify-center mt-2">
                  {tier.images.slice(0, 4).map((img, index) => (
                    <Image
                      key={index}
                      source={img}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        marginLeft: index > 0 ? -12 : 0,
                        borderWidth: 3,
                        borderColor: canRedeem ? "#fff" : "#e5e7eb",
                      }}
                      resizeMode="cover"
                    />
                  ))}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* How it works */}
      <View className="px-4 mt-4 mb-8">
        <View className="bg-white rounded-2xl p-5 border border-gray-200">
          <Text className="text-gray-900 font-bold text-lg mb-4">
            💡 Comment ça marche ?
          </Text>

          <View className="flex-row items-center mb-3">
            <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center mr-3">
              <Text className="text-primary font-bold">1</Text>
            </View>
            <Text className="text-gray-600 flex-1">
              Chaque euro dépensé = 1 point gagné
            </Text>
          </View>

          <View className="flex-row items-center mb-3">
            <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center mr-3">
              <Text className="text-primary font-bold">2</Text>
            </View>
            <Text className="text-gray-600 flex-1">
              Les points s&apos;accumulent sur ton compte
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center mr-3">
              <Text className="text-primary font-bold">3</Text>
            </View>
            <Text className="text-gray-600 flex-1">
              Échange-les contre des produits gratuits !
            </Text>
          </View>
        </View>
      </View>

      {/* Logout */}
      {isAuthenticated && (
        <View className="px-4 mb-8">
          <Pressable
            onPress={handleLogout}
            className="py-3 border border-red-200 rounded-xl bg-red-50"
          >
            <Text className="text-red-600 text-center font-semibold">
              Se déconnecter
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
