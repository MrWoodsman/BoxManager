import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
        <Stack.Screen
          name="scanner"
          options={{
            presentation: "formSheet", // Zmień na formSheet
            sheetAllowedDetents: [0.5], // Pozwól na 50% i 75% wysokości
            sheetInitialDetentIndex: 0, // Startuj od 50%
            sheetGrabberVisible: true, // Pokaż ten szary pasek u góry do przesuwania
            headerShown: false, // Ukryj nagłówek, bo mamy "Grabber"
            contentStyle: { backgroundColor: "white" }, // Białe tło samej karty
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
