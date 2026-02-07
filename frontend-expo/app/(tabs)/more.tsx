import { ThemedView } from "@/components/themed-view";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MoreAndSettings() {
  return (
    <ThemedView className="flex-1">
      <SafeAreaView>
        <Text className="text-white">Więcej</Text>
      </SafeAreaView>
    </ThemedView>
  );
}
