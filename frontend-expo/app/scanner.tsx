import { StyleSheet, TouchableOpacity, View, Alert, Text, ActivityIndicator } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react"; // 1. Import useState

export default function ScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false); // 2. Stan gotowości kamery

  const isScanned = useRef(false);

  if (!permission) return <View style={{ flex: 1, backgroundColor: "white" }} />;

  if (!permission.granted) {
    // ... (kod obsługi braku uprawnień bez zmian)
    return <View />;
  }

  const handleScanned = ({ data }: { data: string }) => {
    if (isScanned.current) return;

    isScanned.current = true;

    Alert.alert("Kod zeskanowany", data, [
      {
        text: "OK",
        onPress: () => {
          // 5. Odblokuj skaner dopiero po zamknięciu alertu
          // (lub zamknij ekran, wtedy odblokowanie nie jest potrzebne)
          router.dismiss(); // Zalecane dla modali
        },
      },
      {
        text: "Anuluj",
        onPress: () => {
          // Jeśli użytkownik chce skanować dalej bez zamykania
          isScanned.current = false;
        },
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zeskanuj kod QR</Text>

      <View style={styles.cameraContainer}>
        {/* 3. Kamera z eventem onCameraReady */}
        <CameraView
          style={styles.camera}
          onBarcodeScanned={handleScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onCameraReady={() => setIsCameraReady(true)} // Ustawiamy flagę, gdy kamera ruszy
        />

        {/* 4. Nakładka ładowania - znika gdy isCameraReady === true */}
        {!isCameraReady && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Uruchamianie kamery...</Text>
          </View>
        )}
      </View>

      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <Text style={styles.buttonText}>Anuluj</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  cameraContainer: {
    width: 250,
    height: 250,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#F2F2F7", // Jasne tło zamiast czarnego, wygląda lepiej podczas ładowania
    marginBottom: 20,
    justifyContent: "center", // Żeby wycentrować loader
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  // Style dla loadera
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject, // Pokrywa cały cameraContainer
    backgroundColor: "#F2F2F7", // Tło zasłaniające czarną kamerę
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 10,
    color: "#888",
    fontSize: 14,
  },
  button: {
    padding: 15,
  },
  buttonText: {
    color: "#007AFF",
    fontSize: 18,
  },
});
