import { BoxCard } from '@/components/box-card';
import { ThemedView } from '@/components/themed-view';
import { getEmptyBoxes } from '@/utils/dataHelpers';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmptyBoxes() {
  const EmptyBoxes = getEmptyBoxes();

  return (
    <ThemedView className="flex-1">
      <ScrollView contentContainerClassName="flex gap-4 p-4">
        {EmptyBoxes.map((box) => (
          <BoxCard key={box.id} id={box.id} location={box.location} name={box.name} />
        ))}
      </ScrollView>
    </ThemedView>
  );
}
