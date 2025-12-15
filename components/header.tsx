import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";

export function Header() {
  const router = useRouter();

  return (
    <View className="bg-primary px-6 py-4 shadow-lg">
      <View className="flex-row items-center justify-between">
        <Pressable onPress={() => router.push("/")} className="flex-row items-center">
          <Text className="text-4xl font-modak text-primary-foreground">
            PepeRaptor
          </Text>
        </Pressable>

        <Pressable 
          onPress={() => router.push("/loyalty" as any)}
          className="flex-row items-center bg-primary-foreground/10 rounded-full px-4 py-2 active:opacity-80"
        >
          <View className="w-10 h-10 rounded-full mr-2 bg-primary-foreground/20 items-center justify-center overflow-hidden">
            <Image
              source={require("../assets/images/raptorfid.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </View>

          <View>
            <Text className="text-xs text-primary-foreground/80">Fidélité</Text>
            <Text className="text-sm font-semibold text-primary-foreground">
              Mon compte
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}