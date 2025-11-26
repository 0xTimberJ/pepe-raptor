import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable, Text, View } from "react-native";

export function HomeScreen() {
  const router = useRouter();

  const handleContinueAsGuest = () => {
    router.push("/menu");
  };

  const { colorScheme } = useColorScheme();
  console.log(colorScheme);

  return (
    <View className="flex flex-col flex-1 bg-background justify-center items-center px-6 gap-12">
      <Image
        source={require("@/assets/images/adaptive-icon.png")}
        style={{ width: 128, height: 128 }}
        contentFit="contain"
      />

      <View className="w-full gap-4">
        <Pressable
          disabled
          className="bg-gray-300 rounded-xl py-4 px-6 opacity-50"
        >
          <Text className="text-center text-gray-600 font-semibold text-lg">
            Se connecter
          </Text>
        </Pressable>

        <Pressable
          onPress={handleContinueAsGuest}
          className="bg-primary rounded-xl py-4 px-6 active:bg-primary/80"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Continuer en tant que&nbsp;invité
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
