import { SymbolView } from "expo-symbols";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

// Definicja typów dla przejrzystości i podpowiedzi w edytorze
interface BoxCardProps {
  id: string;
  name: string;
  location: string;
}

export function BoxCard({ id, name, location }: BoxCardProps) {
  const router = useRouter();

  const handlePress = () => {
    // Wywołuje haptykę – użytkownik "poczuje" kliknięcie w kartę
    router.push({
      pathname: "/box/[id]",
      params: { id: id },
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log(`Wybrano pudełko: ${id}`);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={styles.card}
      className="bg-neutral-800/50 border border-neutral-700"
    >
      {/* GŁÓWNA TREŚĆ (Teksty) */}
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>

        {/* Rząd z ikonkami i danymi – tu gap zadziała idealnie */}
        <View style={styles.infoRow}>
          {/* Blok Lokalizacji */}
          <View style={styles.iconLabelGroup}>
            <SymbolView
              name="mappin.and.ellipse"
              tintColor={"rgba(255, 255, 255, 0.5)"}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{location}</Text>
          </View>

          {/* Opcjonalny drugi blok (np. powtórzona lokalizacja lub inny parametr) */}
          <View style={styles.iconLabelGroup}>
            <SymbolView
              name="number"
              tintColor={"rgba(255, 255, 255, 0.5)"}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{id}</Text>
          </View>
        </View>
      </View>

      {/* STRZAŁKA PO PRAWEJ STRONIE */}
      <SymbolView
        name="chevron.right"
        tintColor={"rgba(255, 255, 255, 0.2)"}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 16,
  },
  textContainer: {
    flex: 1,
    gap: 6, // Odstęp między nazwą a rzędem ikon
  },
  nameText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: -0.5,
  },
  infoRow: {
    flexDirection: "row",
    gap: 16, // Odstęp między całymi blokami (np. lokalizacja vs kategoria)
  },
  iconLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4, // ODSTĘP MIĘDZY IKONKĄ A TEKSTEM – teraz na 100% działa
  },
  infoText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 13,
  },
  infoIcon: {
    width: 12,
    height: 12,
  },
  arrowIcon: {
    width: 14,
    height: 14,
    marginLeft: 8,
  },
});
