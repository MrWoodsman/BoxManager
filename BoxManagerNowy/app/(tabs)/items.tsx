import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ItemCard } from '@/components/item-card';
import { BOXES_DATA, ITEMS_DATA } from '@/constants/data';
import { SymbolView } from 'expo-symbols';

export default function ItemsScreen() {
  // --- STANY ---
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const [newItem, setNewItem] = useState({ name: '', qty: '1', boxId: '' });
  const [boxSearchQuery, setBoxSearchQuery] = useState('');
  const [showBoxSuggestions, setShowBoxSuggestions] = useState(false);

  // --- LOGIKA FILTROWANIA ---
  // Filtrowanie głównej listy przedmiotów
  const filteredItems = useMemo(
    () => ITEMS_DATA.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  // Filtrowanie podpowiedzi pudełek w modalu
  const filteredBoxes = useMemo(
    () =>
      BOXES_DATA.filter(
        (box) =>
          box.name.toLowerCase().includes(boxSearchQuery.toLowerCase()) ||
          box.id.toLowerCase().includes(boxSearchQuery.toLowerCase())
      ),
    [boxSearchQuery]
  );

  // Wybór pudełka z listy podpowiedzi
  const handleSelectBox = (box: (typeof BOXES_DATA)[0]) => {
    setNewItem({ ...newItem, boxId: box.id });
    setBoxSearchQuery(box.name);
    setShowBoxSuggestions(false);
    Keyboard.dismiss();
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* === NAGŁÓWEK === */}
      <SafeAreaView edges={['top']} style={styles.fixedHeader}>
        <View className="mb-4 w-full flex-row items-center justify-between pt-2">
          <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
            Przedmioty
          </ThemedText>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setModalVisible(true)}
            className="h-10 w-10 items-center justify-center rounded-full bg-neutral-800">
            <SymbolView name="plus" size={22} tintColor="white" />
          </TouchableOpacity>
        </View>

        {/* PASEK WYSZUKIWANIA */}
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

      {/* === LISTA PRZEDMIOTÓW === */}
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.cardsGap}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                // Szukamy nazwy pudełka po ID
                location={BOXES_DATA.find((box) => box.id === item.boxId)?.name || 'Nieprzypisane'}
              />
            ))
          ) : (
            <ThemedText style={styles.noResults}>Brak przedmiotów o tej nazwie...</ThemedText>
          )}
        </View>
      </ScrollView>

      {/* === MODAL DODAWANIA === */}
      <Modal
        animationType="fade" // Fade jest kluczowy dla płynności tła
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        {/* Kontener główny - NIE przesuwamy go przez KeyboardAvoidingView */}
        <View className="flex-1 justify-end">
          {/* Backdrop (Tło zamykające) - Statyczne, nie rusza się */}
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              setModalVisible(false);
              setShowBoxSuggestions(false);
            }}>
            <View style={StyleSheet.absoluteFillObject} className="bg-black/60" />
          </TouchableWithoutFeedback>

          {/* TYLKO TO SIĘ RUSZA - KeyboardAvoidingView owija tylko biały box */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // Usunęliśmy ujemny offset, który mógł powodować skakanie
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
            <View
              style={{ backgroundColor: '#171717' }}
              className="rounded-t-[30px] border-t border-neutral-800 p-6 pb-12">
              {/* Pasek do ciągnięcia */}
              <View className="mb-6 h-1.5 w-12 self-center rounded-full bg-neutral-700" />

              <View className="mb-6 flex-row items-center justify-between">
                <Text className="text-2xl font-bold text-white">Nowy przedmiot</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text className="text-lg text-neutral-400">Anuluj</Text>
                </TouchableOpacity>
              </View>

              <View className="gap-y-4">
                {/* Nazwa */}
                <View>
                  <Text className="mb-2 ml-1 text-neutral-400">Nazwa przedmiotu</Text>
                  <TextInput
                    className="rounded-2xl bg-neutral-800 p-4 text-lg text-white"
                    placeholder="np. Taśma klejąca"
                    placeholderTextColor="#555"
                    value={newItem.name}
                    onChangeText={(t) => setNewItem({ ...newItem, name: t })}
                  />
                </View>

                {/* Ilość i Pudełko */}
                <View className="z-50 flex-row gap-x-4">
                  <View className="flex-1">
                    <Text className="mb-2 ml-1 text-neutral-400">Ilość</Text>
                    <TextInput
                      keyboardType="numeric"
                      className="rounded-2xl bg-neutral-800 p-4 text-center text-lg text-white"
                      value={newItem.qty}
                      onChangeText={(t) => setNewItem({ ...newItem, qty: t })}
                    />
                  </View>

                  <View className="relative flex-[2]">
                    <Text className="mb-2 ml-1 text-neutral-400">Pudełko</Text>
                    <View className="h-[60px] flex-row items-center rounded-2xl bg-neutral-800 pr-4">
                      <TextInput
                        className="flex-1 p-4 text-lg text-white"
                        placeholder="Szukaj..."
                        placeholderTextColor="#555"
                        value={boxSearchQuery}
                        onFocus={() => setShowBoxSuggestions(true)}
                        onChangeText={(t) => {
                          setBoxSearchQuery(t);
                          setShowBoxSuggestions(true);
                        }}
                      />
                      <TouchableOpacity onPress={() => console.log('Otwórz skaner')}>
                        <SymbolView name="qrcode.viewfinder" size={24} tintColor="#3b82f6" />
                      </TouchableOpacity>
                    </View>

                    {/* ABSOLUTNE PODPOWIEDZI */}
                    {showBoxSuggestions && boxSearchQuery.length > 0 && (
                      <View
                        style={{ top: 85, left: 0, right: 0, position: 'absolute', zIndex: 1000 }}
                        className="max-h-40 overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-800 shadow-2xl shadow-black">
                        <ScrollView keyboardShouldPersistTaps="always">
                          {filteredBoxes.map((box) => (
                            <TouchableOpacity
                              key={box.id}
                              onPress={() => handleSelectBox(box)}
                              className="border-b border-neutral-700 p-4 active:bg-neutral-700">
                              <Text className="font-medium text-white">{box.name}</Text>
                              <Text className="text-xs text-neutral-500">{box.location}</Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              <TouchableOpacity
                className="mt-8 items-center rounded-2xl bg-blue-600 p-4 shadow-lg shadow-blue-500/50"
                onPress={() => {
                  console.log('Zapisano:', { ...newItem, boxName: boxSearchQuery });
                  setModalVisible(false);
                  setBoxSearchQuery('');
                  setNewItem({ name: '', qty: '1', boxId: '' });
                }}>
                <Text className="text-lg font-bold text-white">Dodaj do spisu</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fixedHeader: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.15)',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  cardsGap: {
    gap: 12,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.5,
  },
});
