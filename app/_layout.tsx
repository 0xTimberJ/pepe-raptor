import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";

import EventSource from "react-native-sse";
import "../style/global.css";
// @ts-ignore
global.EventSource = EventSource;

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme ? NAV_THEME[colorScheme] : NAV_THEME["light"];
  const isDark = colorScheme === "dark";

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
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack />
      <PortalHost />
      <ThemeToggle />
    </ThemeProvider>
  );
}
