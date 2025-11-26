import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import EventSource from "react-native-sse";
import "../style/global.css";
// @ts-ignore
global.EventSource = EventSource;

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme ? NAV_THEME[colorScheme] : NAV_THEME["light"];
  const isDark = colorScheme === "dark";

  return (
    <ThemeProvider value={theme}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack />
      <PortalHost />
      <ThemeToggle />
    </ThemeProvider>
  );
}
