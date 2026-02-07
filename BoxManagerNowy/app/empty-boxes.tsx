import { ThemedView } from "@/components/themed-view";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EmptyBoxes() {
  return (
    <ThemedView className="flex-1">
      <Text className="text-white">Puste pudełka</Text>
    </ThemedView>
  );
}
