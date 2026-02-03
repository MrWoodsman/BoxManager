// === IONIC ===
import { IonIcon } from "@ionic/react";
// === ICONS ===
import { searchOutline } from "ionicons/icons";

export const SearchInput = () => {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <IonIcon icon={searchOutline} className="text-gray-400 text-xl" />
      </div>
      <input
        type="text"
        placeholder="Szukaj (np. paszport, kabel...)"
        className="w-full h-12 pl-12 pr-4 rounded-xl bg-white border border-gray-100 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
      />
    </div>
  );
};
