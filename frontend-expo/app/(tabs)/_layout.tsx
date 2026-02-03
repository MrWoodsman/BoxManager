import { Tabs, useRouter } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter(); // Hook do nawigacji

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="scanner-trigger" // Nazwa techniczna, nie musi istnieć w plikach
        options={{
          title: "Skanuj",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={32} name="qrcode.viewfinder" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Blokujemy normalne przełączenie zakładki
            router.push("/scanner"); // Otwieramy nasz modalny tray
          },
        }}
      />
      <Tabs.Screen
        name="boxes"
        options={{
          title: "Boxes",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="cube.box.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
