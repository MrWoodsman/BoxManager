import { useState, useEffect, useRef } from "react";
import { IonModal, IonContent, IonIcon, IonSpinner } from "@ionic/react";
import { closeOutline, flashlightOutline } from "ionicons/icons";
import { useZxing } from "react-zxing";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CameraModal = ({ isOpen, onClose }: CameraModalProps) => {
  const [torchOn, setTorchOn] = useState(false);
  const [isScanned, setIsScanned] = useState(false);

  // NOWE: Stan, który pozwoli włączyć kamerę dopiero jak modal "wjedzie"
  const [cameraReady, setCameraReady] = useState(false);

  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  const { ref } = useZxing({
    // Pauzujemy nie tylko jak zeskanowano, ale też dopóki modal nie jest gotowy (cameraReady)
    paused: isScanned || !isOpen || !cameraReady,
    onDecodeResult(result) {
      if (isScanned) return;
      setIsScanned(true);
      const code = result.getText();

      // Wibracja (próba dla Androida, iOS webkit ignoruje vibrate)
      if (navigator.vibrate) navigator.vibrate(200);

      onClose();
      setTimeout(() => alert(`Zeskanowano: ${code}`), 300);
    },
    constraints: {
      audio: false,
      video: {
        facingMode: "environment",
        // Wymuszamy niską rozdzielczość dla płynności na iOS
        width: { ideal: 720 },
        height: { ideal: 720 },
        advanced: [{ torch: torchOn } as any],
      },
    },
  });

  // 🛠️ FIX NA START KAMERY:
  useEffect(() => {
    let timeout: any;

    if (isOpen) {
      // 1. Reset stanów
      setTorchOn(false);
      setIsScanned(false);
      setCameraReady(false); // Najpierw wyłączamy kamerę

      // 2. Czekamy 400ms aż animacja modala się skończy
      // Dopiero wtedy pozwalamy bibliotece zapytać o kamerę
      timeout = setTimeout(() => {
        setCameraReady(true);
      }, 400);
    } else {
      setCameraReady(false);
    }

    return () => clearTimeout(timeout);
  }, [isOpen]);

  // Dodatkowy fix: "Kopnięcie" wideo po załadowaniu, żeby ruszyło na iOS
  useEffect(() => {
    if (cameraReady && videoElementRef.current) {
      const vid = videoElementRef.current;
      vid.play().catch((e) => console.log("Autoplay blocked/handled", e));
    }
  }, [cameraReady]);

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      initialBreakpoint={0.75}
      breakpoints={[0, 0.75]}
      handle={true}
      className="rounded-t-2xl"
    >
      <IonContent className="ion-padding bg-gray-900">
        <div className="flex flex-col items-center h-full px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">Zeskanuj kod QR</h2>

          <div className="relative w-full aspect-square bg-black rounded-3xl overflow-hidden shadow-xl border-4 border-orange-500 mb-6 group flex items-center justify-center">
            {/* SPINNER: Pokazujemy go dopóki nie ma streamu wideo */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <IonSpinner name="crescent" color="warning" />
            </div>

            {/* Renderujemy tag video TYLKO gdy modal jest otwarty */}
            {isOpen && (
              <video
                ref={(el) => {
                  ref.current = el;
                  videoElementRef.current = el;
                }}
                muted
                playsInline // ABSOLUTNIE KLUCZOWE NA IOS
                autoPlay // ABSOLUTNIE KLUCZOWE NA IOS
                // Usuwamy 'key' który resetował komponent, teraz sterujemy przez 'paused'
                className={`w-full h-full object-cover z-10 relative transition-opacity duration-300 ${cameraReady ? "opacity-100" : "opacity-0"}`}
              />
            )}

            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/80 shadow-[0_0_15px_rgba(249,115,22,0.8)] animate-[scan_2s_ease-in-out_infinite] pointer-events-none z-20"></div>
          </div>

          <div className="flex gap-4 w-full">
            <button
              onClick={() => setTorchOn(!torchOn)}
              // Blokujemy przycisk latarki dopóki kamera nie ruszy
              disabled={!cameraReady}
              className={`flex-1 py-4 rounded-xl font-bold flex flex-col items-center justify-center gap-1 transition-colors ${
                torchOn
                  ? "bg-yellow-400 text-yellow-900"
                  : "bg-gray-100 text-gray-700 active:bg-gray-200 disabled:opacity-50"
              }`}
            >
              <IonIcon icon={flashlightOutline} className="text-xl" />
              <span className="text-xs">{torchOn ? "Wyłącz" : "Latarka"}</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 py-4 bg-orange-100 text-orange-600 rounded-xl font-bold flex flex-col items-center justify-center gap-1 active:bg-orange-200 transition-colors"
            >
              <IonIcon icon={closeOutline} className="text-xl" />
              <span className="text-xs">Anuluj</span>
            </button>
          </div>

          <p className="mt-6 text-xs text-gray-400 text-center px-8">
            Nakieruj kamerę na kod QR znajdujący się na pudełku.
          </p>
        </div>
      </IonContent>
    </IonModal>
  );
};
