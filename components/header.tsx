import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

export function Header() {
  const router = useRouter();
  const { user, isAuthenticated, checkAuth, refreshUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshUser();
    }
  }, [isAuthenticated, refreshUser]);

  const handleProfilePress = () => {
    if (isAuthenticated) {
      router.push("/loyalty" as any);
    } else {
      router.push("/auth" as any);
    }
  };

  return (
    <View className="bg-primary px-6 py-4">
      <View className="flex-row items-center justify-between">
        <Pressable
          onPress={() => router.push("/")}
          className="flex-row items-center"
        >
          <Text className="text-4xl font-modak text-primary-foreground">
            PepeRaptor
          </Text>
        </Pressable>

        <Pressable
          onPress={handleProfilePress}
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
            {isAuthenticated && user ? (
              <>
                <Text className="text-xs text-primary-foreground/80">
                  {user.points} pts
                </Text>
                <Text className="text-sm font-semibold text-primary-foreground">
                  {user.name || "Mon compte"}
                </Text>
              </>
            ) : (
              <>
                <Text className="text-xs text-primary-foreground/80">
                  Fidelite
                </Text>
                <Text className="text-sm font-semibold text-primary-foreground">
                  Se connecter
                </Text>
              </>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
}
