import { IonContent, IonPage, IonIcon } from "@ionic/react";
import {
  timeOutline,
  flashOutline,
  addOutline,
  qrCodeOutline,
  statsChartOutline,
} from "ionicons/icons";
// === COMPONENTS ===
import { BoxCard } from "../components/BoxCard";
import { SearchInput } from "../components/SearchInput";
// === DATA ===
import { mockBoxes as recentBoxes, mockItems as items, mockRooms as rooms } from "../data/mockData";

interface DashboardProps {
  onOpenScanner: () => void;
}

export const Dashboard = ({ onOpenScanner }: DashboardProps) => {
  // Dane "zaślepiamy" (później podepniesz tu bazę danych)
  const stats = {
    boxes: recentBoxes.length,
    items: items.length,
    rooms: rooms.length,
  };

  return (
    <IonPage>
      {/* fullscreen pozwala wejść treści pod 'Notch' i zegarek */}
      <IonContent fullscreen className="bg-[#F8F9FA]">
        {/* Główny kontener z bezpiecznym odstępem od góry (Safe Area) */}
        <div className="flex flex-col min-h-screen px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-24 bg-[#F8F9FA]">
          {/* --- 1. NAGŁÓWEK + AVATAR --- */}
          <div className="flex justify-between items-start mt-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                Dzień dobry! 👋
              </h1>
              <p className="text-gray-500 text-sm mt-1">Masz trochę porządkowania?</p>
            </div>
            {/* Avatar - fioletowe kółko z literką */}
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              P
            </div>
          </div>

          {/* --- 2. WYSZUKIWARKA (Custom Input) --- */}
          <SearchInput />

          {/* --- 3. OSTATNIO UŻYWANE (Karuzela) --- */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <IonIcon icon={timeOutline} className="text-orange-500" />
              <h3 className="text-sm font-bold text-gray-700">Ostatnio używane</h3>
            </div>

            {/* Kontener scrollowania poziomego */}
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide snap-x">
              {recentBoxes.map((box) => (
                <BoxCard key={box.id} box={box} />
              ))}
            </div>
          </div>

          {/* --- 4. SZYBKIE AKCJE (Grid 2 kolumny) --- */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <IonIcon icon={flashOutline} className="text-orange-500" />
              <h3 className="text-sm font-bold text-gray-700">Szybkie akcje</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Przycisk DODAJ (Pomarańczowy) */}
              <button className="h-32 bg-orange-400 rounded-2xl text-white flex flex-col justify-center items-center gap-2 shadow-lg shadow-orange-200 active:scale-95 transition-transform relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <IonIcon icon={addOutline} className="text-3xl" />
                <div className="text-center">
                  <span className="block font-bold text-lg">Dodaj</span>
                  <span className="text-orange-100 text-xs">Nowe pudełko</span>
                </div>
              </button>

              {/* Przycisk SKANUJ (Biały) */}
              <button
                onClick={onOpenScanner}
                className="h-32 bg-white rounded-2xl text-gray-800 flex flex-col justify-center items-center gap-2 shadow-sm border border-gray-100 active:scale-95 transition-transform"
              >
                <IonIcon icon={qrCodeOutline} className="text-3xl text-gray-900" />
                <div className="text-center">
                  <span className="block font-bold text-lg">Skanuj</span>
                  <span className="text-gray-400 text-xs">Kod QR</span>
                </div>
              </button>
            </div>
          </div>

          {/* --- 5. STATYSTYKI / SUGESTIE --- */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <IonIcon icon={statsChartOutline} className="text-orange-500" />
              <h3 className="text-sm font-bold text-gray-700">Sugestie / Stan</h3>
            </div>

            <div className="rounded-2xl py-6 px-2 flex justify-between divide-x divide-gray-200">
              <div className="text-center w-1/3">
                <span className="block text-2xl font-black text-gray-900">{stats.boxes}</span>
                <span className="text-xs text-gray-400 font-medium">Boxów</span>
              </div>
              <div className="text-center w-1/3">
                <span className="block text-2xl font-black text-gray-900">{stats.items}</span>
                <span className="text-xs text-gray-400 font-medium">Przedmiotów</span>
              </div>
              <div className="text-center w-1/3">
                <span className="block text-2xl font-black text-gray-900">{stats.rooms}</span>
                <span className="text-xs text-gray-400 font-medium">Pokoje</span>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
