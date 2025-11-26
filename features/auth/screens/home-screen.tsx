import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { View } from "react-native";

export function HomeScreen() {
  const router = useRouter();

  const handleContinueAsGuest = () => {
    router.push("/menu");
  };

  const { colorScheme } = useColorScheme();
  console.log(colorScheme);

  return (
    <View className="flex flex-col flex-1 justify-center items-center px-6 gap-12">
      <Image
        source={require("@/assets/images/adaptive-icon.png")}
        style={{ width: 128, height: 128 }}
        contentFit="contain"
      />

      <View className="w-full gap-4">
        <Button variant={"secondary"} onPress={handleContinueAsGuest}>
          <Text>Se connecter</Text>
        </Button>

        <Button onPress={handleContinueAsGuest}>
          <Text>Continuer en tant que invité</Text>
        </Button>
      </View>
    </View>
  );
}
