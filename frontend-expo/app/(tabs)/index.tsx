import { Image, StyleSheet, TouchableOpacity, Platform, Text, View } from "react-native";
import * as Haptics from "expo-haptics";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

export default function HomeScreen() {
  // Funkcja wyzwalająca wibracje
  const handlePress = () => {
    // Medium daje fajne, "mięsiste" kliknięcie na iPhone
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    console.log("Pudełko dotknięte!");
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView edges={["top"]} style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <ThemedText type="title">Dashboard</ThemedText>

        {/* SUMMARY CARDS */}
        <View className="flex-row flex-wrap -mx-2 mt-4">
          <View className="w-1/2 p-2">
            <View className="items-center border border-neutral-700 bg-neutral-800 p-4 rounded-lg">
              <Text className="text-white text-5xl font-bold">32</Text>
              <Text className="text-white text-center">Pudełka</Text>
            </View>
          </View>

          <View className="w-1/2 p-2">
            <View className="items-center border border-neutral-700 bg-neutral-800 p-4 rounded-lg">
              <Text className="text-white text-5xl font-bold">262</Text>
              <Text className="text-white text-center">Przedmioty</Text>
            </View>
          </View>
        </View>

        {/* FAST INFO - EMPTY BOX / ITEMMS WITHOUT BOX */}
        <View className="flex gap-2 mt-4">
          <Text className="text-white">Ostrzeżenia</Text>
          <View className="bg-orange-500/25 border-orange-500/25 border py-2 px-4 rounded-full flex-row items-center gap-1">
            <SymbolView
              name="cube.box.fill"
              tintColor={"#fb923c"}
              style={{ width: 16, height: 16 }}
            />
            <Text className="text-orange-400">
              Posiadasz <Text className="font-semibold">3</Text> puste pudełka!
            </Text>
          </View>

          <View className="bg-orange-500/25 border-orange-500/25 border py-2 px-4 rounded-full flex-row items-center gap-1">
            <SymbolView name="tag.fill" tintColor={"#fb923c"} style={{ width: 16, height: 16 }} />
            <Text className="text-orange-400">
              Masz <Text className="font-semibold">95</Text> nie przypisane przedmioty!
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
