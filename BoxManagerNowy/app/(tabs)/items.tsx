import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  ScrollView,
  TextInput,
  Dimensions, // Potrzebne do ograniczenia wysokości
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ItemCard } from '@/components/item-card';
import { BOXES_DATA, ITEMS_DATA } from '@/constants/data';
import { SymbolView } from 'expo-symbols';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ItemsScreen() {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // --- STANY ---
  const [searchQuery, setSearchQuery] = useState('');
  const [newItem, setNewItem] = useState({ name: '', qty: '1', boxId: '' });
  const [boxSearchQuery, setBoxSearchQuery] = useState('');
  const [showBoxSuggestions, setShowBoxSuggestions] = useState(false);

  // --- FILTROWANIE ---
  const filteredItems = useMemo(
    () => ITEMS_DATA.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const filteredBoxes = useMemo(
    () =>
      BOXES_DATA.filter(
        (b) =>
          b.name.toLowerCase().includes(boxSearchQuery.toLowerCase()) ||
          b.id.toLowerCase().includes(boxSearchQuery.toLowerCase())
      ),
    [boxSearchQuery]
  );

  // --- AKCJE ---
  const openSheet = useCallback(() => bottomSheetRef.current?.present(), []);
  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
    Keyboard.dismiss();
  }, []);

  const handleSelectBox = (box: (typeof BOXES_DATA)[0]) => {
    setNewItem({ ...newItem, boxId: box.id });
    setBoxSearchQuery(box.name);
    setShowBoxSuggestions(false);
    Keyboard.dismiss();
  };

  // --- BACKDROP ---
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        opacity={0.6}
      />
    ),
    []
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* === HEADER === */}
      <SafeAreaView edges={['top']} style={styles.fixedHeader}>
        <View className="mb-4 flex-row items-center justify-between pt-2">
          <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
            Przedmioty
          </ThemedText>

          <TouchableOpacity
            onPress={openSheet}
            className="h-11 w-11 items-center justify-center rounded-full bg-neutral-800">
            <SymbolView name="plus" size={24} tintColor="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchSection}>
          <IconSymbol name="magnifyingglass" size={18} color="#8E8E93" />
          <TextInput
            placeholder="Szukaj przedmiotu..."
            placeholderTextColor="#8E8E93"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </SafeAreaView>

      {/* === LISTA === */}
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
        keyboardShouldPersistTaps="handled">
        <View style={{ gap: 12 }}>
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              location={BOXES_DATA.find((b) => b.id === item.boxId)?.name || 'Nieprzypisane'}
            />
          ))}
        </View>
      </ScrollView>

      {/* === BOTTOM SHEET === */}
      <BottomSheetModal
        ref={bottomSheetRef}
        // ❌ USUNĄŁEM snapPoints={['90%']} - to był winowajca!
        enableDynamicSizing={true} // Modal dopasuje się do treści
        maxDynamicContentSize={SCREEN_HEIGHT * 0.9} // Ale nie urośnie więcej niż 90% ekranu
        // --- KONFIGURACJA PŁYNNOŚCI ---
        keyboardBehavior="interactive" // Modal "jeździ" na klawiaturze (góra/dół płynnie)
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        // ------------------------------

        enablePanDownToClose
        backdropComponent={renderBackdrop}
        topInset={insets.top}
        backgroundStyle={{ backgroundColor: '#171717', borderRadius: 32 }}>
        <BottomSheetScrollView
          contentContainerStyle={[styles.modalContent, { paddingBottom: insets.bottom + 24 }]}
          keyboardShouldPersistTaps="handled">
          {/* HEADER MODALU */}
          <View className="mb-6 flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-white">Nowy przedmiot</Text>
            <TouchableOpacity onPress={closeSheet}>
              <SymbolView name="xmark.circle.fill" size={28} tintColor="#333" />
            </TouchableOpacity>
          </View>

          {/* INPUTY */}
          <View style={{ gap: 20 }}>
            <View>
              <Text style={styles.label}>Nazwa</Text>
              <BottomSheetTextInput
                style={styles.input}
                placeholder="Co dodajesz?"
                placeholderTextColor="#555"
                value={newItem.name}
                onChangeText={(t) => setNewItem({ ...newItem, name: t })}
              />
            </View>

            <View className="flex-row" style={{ gap: 16 }}>
              <View className="flex-1">
                <Text style={styles.label}>Ilość</Text>
                <BottomSheetTextInput
                  style={[styles.input, { textAlign: 'center' }]}
                  keyboardType="numeric"
                  value={newItem.qty}
                  onChangeText={(t) => setNewItem({ ...newItem, qty: t })}
                />
              </View>

              <View className="relative flex-[2]">
                <Text style={styles.label}>Pudełko</Text>

                <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
                  <BottomSheetTextInput
                    style={{ flex: 1, color: 'white', fontSize: 18 }}
                    placeholder="Szukaj..."
                    placeholderTextColor="#555"
                    value={boxSearchQuery}
                    onFocus={() => setShowBoxSuggestions(true)}
                    onChangeText={(t) => {
                      setBoxSearchQuery(t);
                      setShowBoxSuggestions(true);
                    }}
                  />

                  <SymbolView name="qrcode.viewfinder" size={24} tintColor="#3b82f6" />
                </View>

                {showBoxSuggestions && boxSearchQuery.length > 0 && (
                  <View style={styles.suggestions}>
                    <ScrollView keyboardShouldPersistTaps="always">
                      {filteredBoxes.map((box) => (
                        <TouchableOpacity
                          key={box.id}
                          onPress={() => handleSelectBox(box)}
                          className="border-b border-neutral-800 p-4">
                          <View className="flex-row gap-2">
                            <Text className="font-bold text-white">{box.name}</Text>
                            <Text className="font-bold text-neutral-600">{box.id}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* BUTTON */}
          <TouchableOpacity
            className="mt-8 items-center rounded-2xl bg-blue-600 p-4"
            onPress={() => {
              console.log('Dodano:', newItem);
              closeSheet();
            }}>
            <Text className="text-lg font-bold text-white">Dodaj do spisu</Text>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fixedHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(150,150,150,0.15)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 17,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  modalContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  label: {
    marginBottom: 6,
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#262626',
    color: 'white',
    paddingHorizontal: 16,
    borderRadius: 16,
    fontSize: 18,
    height: 58,
  },
  suggestions: {
    position: 'absolute',
    top: 82,
    left: 0,
    right: 0,
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    zIndex: 1000,
    elevation: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
    maxHeight: 200, // Zwiększyłem trochę, żeby było widać więcej
  },
});
