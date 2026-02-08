import { ThemedView } from '@/components/themed-view';
import { getUnassignedItems } from '@/utils/dataHelpers';
import { SymbolView } from 'expo-symbols';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UnassignedItems() {
  const UnassignedItems = getUnassignedItems();

  return (
    <ThemedView className="flex-1">
      <ScrollView contentContainerClassName="flex gap-4 p-4">
        {/* <Text className="text-white">Nieprzypisane przedmioty</Text> */}

        {UnassignedItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            // onPress={handlePress}
            activeOpacity={0.7}
            className="flex-row items-center rounded-[14px] border border-neutral-700 bg-neutral-800/50 p-4">
            {/* GŁÓWNA TREŚĆ (Teksty) */}
            <View className="flex-1 gap-y-1.5">
              <Text className="text-[18px] font-semibold tracking-[-0.5px] text-white">
                {item.name}
              </Text>

              {/* Rząd z ikonkami i danymi */}
              <View className="flex-row gap-x-4">
                {/* Blok Lokalizacji */}
                <View className="flex-row items-center gap-x-1">
                  <SymbolView name="tag" tintColor="rgba(255, 255, 255, 0.5)" size={14} />
                  <Text className="text-[13px] text-white/50">{item.category}</Text>
                </View>

                {/* Blok ID */}
                <View className="flex-row items-center gap-x-1">
                  <SymbolView name="number" tintColor="rgba(255, 255, 255, 0.5)" size={14} />
                  <Text className="text-[13px] text-white/50">{item.id}</Text>
                </View>
              </View>
            </View>

            {/* STRZAŁKA PO PRAWEJ STRONIE */}
            <SymbolView
              name="chevron.right"
              tintColor="rgba(255, 255, 255, 0.2)"
              size={14}
              className="ml-2"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}
