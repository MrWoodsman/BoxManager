import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
// import "react-native-reanimated";

import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
    anchor: "(tabs)",
};

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="modal"
                    options={{ presentation: "modal", title: "Modal" }}
                />
                {/* Te nazwy muszą pasować do Twoich plików w app/ */}
                <Stack.Screen
                    name="empty-boxes"
                    options={{
                        title: "Puste pudełka",
                        headerBackTitle: "Wstecz",
                        headerBackButtonDisplayMode: "minimal",
                    }}
                />
                <Stack.Screen
                    name="unassigned-items"
                    options={{
                        title: "Nieprzypisane",
                        headerBackTitle: "Wstecz",
                        headerBackButtonDisplayMode: "minimal",
                    }}
                />
                <Stack.Screen
                    name="box/[id]"
                    options={{
                        title: "Szczegóły",
                        headerBackTitle: "Wstecz",
                        headerBackButtonDisplayMode: "minimal",
                    }}
                />
                {/* SKANER */}
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
