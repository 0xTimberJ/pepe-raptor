import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import EventSource from "react-native-sse";
import "../style/global.css";
// @ts-ignore
global.EventSource = EventSource;

export default function RootLayout() {
  return (
    <ThemeProvider value={NAV_THEME["light"]}>
      <StatusBar style="light" />
      <Stack />
      <PortalHost />
      <ThemeToggle />
    </ThemeProvider>
  );
}
