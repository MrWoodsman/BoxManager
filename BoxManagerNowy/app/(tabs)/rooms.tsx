import React, { useState } from "react"; // Dodajemy useState do filtrowania
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { BoxCard } from "@/components/box-card";
import { IconSymbol } from "@/components/ui/icon-symbol";

// Przykładowe dane w tablicy
const DATA = [
  { id: "B52A", name: "Wszystko i nic", location: "Salon" },
  { id: "A6H1", name: "Szafa", location: "Salon" },
  { id: "HF25", name: "Regał 1", location: "Sypialnia" },
  { id: "H2M6", name: "Szafka w łazience", location: "Łazienka" },
];

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  // Logika filtrowania - sprawdza czy nazwa zawiera wpisany tekst
  const filteredBoxes = DATA.filter((box) =>
    box.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* === FIXED HEADER (Zawsze na górze) === */}
      <SafeAreaView edges={["top"]} style={styles.fixedHeader}>
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
            Wszystkie pudełka
          </ThemedText>
        </View>

        {/* PASEK WYSZUKIWANIA */}
        <View style={styles.searchSection}>
          <IconSymbol name="magnifyingglass" size={18} color="#8E8E93" />
          <TextInput
            placeholder="Szukaj pudełka..."
            placeholderTextColor="#8E8E93"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery} // Aktualizuje stan przy pisaniu
          />
        </View>
      </SafeAreaView>

      {/* === LISTA (Przewijalna) === */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled" // Ukrywa klawiaturę przy kliknięciu w kartę
      >
        <View style={styles.cardsGap}>
          {filteredBoxes.length > 0 ? (
            filteredBoxes.map((box) => (
              <BoxCard key={box.id} id={box.id} name={box.name} location={box.location} />
            ))
          ) : (
            <ThemedText style={styles.noResults}>Brak pudełek o tej nazwie...</ThemedText>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fixedHeader: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth, // Subtelna linia oddzielająca
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  titleContainer: {
    paddingTop: 8,
    marginBottom: 12,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(150, 150, 150, 0.15)", // Półprzezroczyste tło w stylu iOS
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: "white", // Dopasuj do motywu (najlepiej użyć koloru z constants)
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
    textAlign: "center",
    marginTop: 40,
    opacity: 0.5,
  },
});
