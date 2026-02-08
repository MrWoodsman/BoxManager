import { SymbolView } from 'expo-symbols';
import { TouchableOpacity, View, Text } from 'react-native';

interface ItemCardProps {
  id: string;
  name: string;
  location?: string;
}

export function ItemCard({ id, name, location }: ItemCardProps) {
  return (
    <TouchableOpacity
      // onPress={handlePress}
      activeOpacity={0.7}
      className="flex-row items-center rounded-[14px] border border-neutral-700 bg-neutral-800/50 p-4">
      {/* GŁÓWNA TREŚĆ (Teksty) */}
      <View className="flex-1 gap-y-1.5">
        <Text className="text-[18px] font-semibold tracking-[-0.5px] text-white">{name}</Text>

        {/* Rząd z ikonkami i danymi */}
        <View className="flex-row gap-x-4">
          {/* Blok ID */}
          <View className="flex-row items-center gap-x-1">
            <SymbolView name="number" tintColor="rgba(255, 255, 255, 0.5)" size={14} />
            <Text className="text-[13px] text-white/50">{id}</Text>
          </View>

          {/* Blok Lokalizacji */}
          <View className="flex-row items-center gap-x-1">
            <SymbolView name="mappin.and.ellipse" tintColor="rgba(255, 255, 255, 0.5)" size={14} />
            <Text className="text-[13px] text-white/50">{location}</Text>
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
  );
}
