import { Stack } from "expo-router";
import EventSource from "react-native-sse";
import "../style/global.css";
// @ts-ignore
global.EventSource = EventSource;

export default function RootLayout() {
  return <Stack />;
}
