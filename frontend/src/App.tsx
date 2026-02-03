import { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Ikony */
import { gridOutline, scanOutline, cubeOutline } from "ionicons/icons";

/* Twoje strony */
import { Dashboard } from "./pages/Dashboard";
import { Boxes } from "./pages/Boxes";
import { CameraModal } from "./components/modal/CameraModal";

/* CSS */
import "@ionic/react/css/core.css";
import "@ionic/react/css/structure.css";
import "./index.css";

setupIonicReact();

const App = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <IonApp>
      <IonReactRouter basename="/box-manager">
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/dashboard">
              <Dashboard onOpenScanner={() => setIsScannerOpen(true)} />
            </Route>

            <Route exact path="/boxes">
              <Boxes />
            </Route>

            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
          </IonRouterOutlet>
          {/* === NAVIGATION === */}
          <IonTabBar
            slot="bottom"
            className="border-t border-gray-200 shadow-sm pb-[env(safe-area-inset-bottom)]"
          >
            <IonTabButton tab="dashboard" href="/dashboard">
              <IonIcon icon={gridOutline} />
              <IonLabel>Kokpit</IonLabel>
            </IonTabButton>

            <IonTabButton
              tab="scan"
              onClick={(e) => {
                e.preventDefault();
                setIsScannerOpen(true);
              }}
            >
              <IonIcon icon={scanOutline} />
              <IonLabel>Skanuj</IonLabel>
            </IonTabButton>

            <IonTabButton tab="boxes" href="/boxes">
              <IonIcon icon={cubeOutline} />
              <IonLabel>Boxy</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>

      <CameraModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
    </IonApp>
  );
};

export default App;
