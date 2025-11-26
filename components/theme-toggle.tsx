import { colorScheme, useColorScheme } from "nativewind";
import { Pressable, Text, View } from "react-native";

export function ThemeToggle() {
  const { colorScheme: currentScheme } = useColorScheme();

  // Only show in development
  if (process.env.NODE_ENV === "production") return null;

  const toggleTheme = () => {
    const newTheme = currentScheme === "light" ? "dark" : "light";
    colorScheme.set(newTheme);
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 16,
        left: 16,
        zIndex: 9999,
      }}
      pointerEvents="box-none"
    >
      <Pressable
        onPress={toggleTheme}
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: currentScheme === "dark" ? "#3b82f6" : "#1e293b",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: 18,
          }}
        >
          {currentScheme === "dark" ? "🌙" : "☀️"}
        </Text>
      </Pressable>
    </View>
  );
}
