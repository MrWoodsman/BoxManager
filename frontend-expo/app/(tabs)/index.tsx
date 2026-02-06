import { Image, StyleSheet, TouchableOpacity, Platform, Text } from "react-native";
import * as Haptics from "expo-haptics";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <Text className="text-oranges">TEST</Text>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  // Styl dla Twojego przycisku
  boxButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    // Cień na iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Cień na Android
    elevation: 3,
  },
});
