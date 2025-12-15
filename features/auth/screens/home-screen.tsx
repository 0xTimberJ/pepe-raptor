import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

export function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  const handlePrimaryAction = () => {
    if (isAuthenticated) {
      router.push("/menu");
    } else {
      router.push("/auth");
    }
  };

  const handleContinueAsGuest = () => {
    router.push("/menu");
  };

  return (
    <View className="flex flex-col flex-1 justify-center items-center px-6 gap-12">
      <Image
        source={require("@/assets/images/adaptive-icon.png")}
        style={{ width: 128, height: 128 }}
        contentFit="contain"
      />

      <View className="w-full gap-4 flex flex-col items-center">
        <Button
          variant="default"
          onPress={handlePrimaryAction}
          className="min-w-60"
        >
          <Text className="text-white font-semibold">
            {isAuthenticated ? "Commander" : "Se connecter"}
          </Text>
        </Button>

        {!isAuthenticated && (
          <Button 
            variant="secondary" 
            onPress={handleContinueAsGuest} 
            className="min-w-60"
          >
            <Text>Continuer en tant qu&apos;invite</Text>
          </Button>
        )}
      </View>
    </View>
  );
}
