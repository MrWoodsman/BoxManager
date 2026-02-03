import { IonContent, IonPage } from "@ionic/react";
// === COMPONENTS ===
import { BoxCard } from "../components/BoxCard";
// === DATA ===
import { mockBoxes as boxes } from "../data/mockData";

export const Boxes = () => {
  return (
    <IonPage>
      <IonContent fullscreen class="bg-[#F8F9FA]">
        {/* Main Contener for content with safe space top */}
        <div className="flex flex-col min-h-screen px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-24 bg-[#F8F9FA]">
          {/* PAGE HEADER */}
          <div>
            <h1 className="text-2xl font-semibold my-4">📦 Wszystkie pudełeka </h1>
          </div>
          {/* BOXES LIST */}
          <div className="flex flex-col gap-4">
            {boxes.map((box) => (
              <BoxCard key={box.id} box={box} />
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
