import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import EventSource from "react-native-sse";
import "../style/global.css";
import { View } from "react-native";
import { Header } from "@/components/header";

// @ts-ignore
global.EventSource = EventSource;

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = NAV_THEME["light"];

  const [loaded, error] = useFonts({
    "Modak-Regular": require("../assets/fonts/Modak-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={theme}>
      <StatusBar style="light" />

      <View className="flex-1">
        <Header />
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <PortalHost />
    </ThemeProvider>
  );
}
