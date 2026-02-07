import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { ThemedView } from "@/components/themed-view";
import { useHeaderHeight } from "@react-navigation/elements";

// DATA SOURCE
import { BOXES_DATA } from "@/constants/data";

export default function BoxDetailsScreen() {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight(); // Pobiera dynamiczną wysokość paska (notch + przyciski)

  // Znajdujemy dane pudełka
  const box = BOXES_DATA.find((x) => x.id === id);

  return (
    <ThemedView className="flex-1">
      {/* 1. Konfiguracja przezroczystego nagłówka */}
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true, // Content "wjeżdża" pod nagłówek
          headerBlurEffect: "dark", // Efekt rozmycia na iOS (glassmorphism)
          headerShadowVisible: false,
          headerTintColor: "#fb923c", // Kolor przycisku wstecz
        }}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: headerHeight + 10,
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
      >
        {/* NAGŁÓWEK WIZUALNY */}
        <View className="items-center py-8 bg-neutral-800/50 rounded-3xl border border-neutral-700 mb-6">
          <SymbolView
            name="shippingbox.fill"
            tintColor={"#fb923c"}
            style={{ width: 80, height: 80 }}
          />
          <Text className="text-white text-3xl font-bold mt-4">
            {box?.name || "Nieznane pudełko"}
          </Text>
          <Text className="text-neutral-400">
            {box?.location || "Brak lokalizacji"} | {id}
          </Text>
        </View>

        {/* STATYSTYKI WEWNĄTRZ */}
        <View className="flex-row gap-4 mb-6">
          <View className="flex-1 bg-neutral-800 p-4 rounded-2xl border border-neutral-700">
            <Text className="text-neutral-400 text-xs uppercase">Przedmioty</Text>
            <Text className="text-white text-2xl font-bold">14</Text>
          </View>
          <View className="flex-1 bg-neutral-800 p-4 rounded-2xl border border-neutral-700">
            <Text className="text-neutral-400 text-xs uppercase">Waga</Text>
            <Text className="text-white text-2xl font-bold">2.5 kg</Text>
          </View>
        </View>

        {/* LISTA PRZEDMIOTÓW (Makieta) */}
        <Text className="text-white text-xl font-bold mb-4">Zawartość</Text>

        {[1, 2, 3, 4, 5, 6].map((item) => (
          <View
            key={item}
            className="flex-row items-center bg-neutral-800 p-4 rounded-xl border border-neutral-700 mb-2"
          >
            <View className="bg-orange-500/20 p-2 rounded-lg mr-3">
              <SymbolView name="tag.fill" tintColor="#fb923c" style={{ width: 16, height: 16 }} />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Przedmiot testowy {item}</Text>
              <Text className="text-neutral-500 text-sm">ID: 44321{item}</Text>
            </View>
            <SymbolView name="chevron.right" tintColor="#444" style={{ width: 14, height: 14 }} />
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}
