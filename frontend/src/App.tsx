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

/* Twoje strony (na razie Dashboard wszędzie, żeby działało) */
import { Dashboard } from "./pages/Dashboard";

/* CSS Ionica */
import "@ionic/react/css/core.css";
import "@ionic/react/css/structure.css";
/* Twój CSS (Tailwind) */
import "./index.css";

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        {/* --- MIEJSCE GDZIE WYŚWIETLAJĄ SIĘ STRONY --- */}
        <IonRouterOutlet>
          {/* Ścieżka do Kokpitu */}
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>

          {/* Ścieżka do Skanera (na razie Dashboard) */}
          <Route exact path="/scan">
            <Dashboard />
          </Route>

          {/* Ścieżka do Listy Boxów (na razie Dashboard) */}
          <Route exact path="/boxes">
            <Dashboard />
          </Route>

          {/* Domyślne przekierowanie na start */}
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </IonRouterOutlet>

        {/* --- DOLNY PASEK MENU (TAB BAR) --- */}
        <IonTabBar
          slot="bottom"
          className="border-t border-gray-200 shadow-sm pb-[env(safe-area-inset-bottom)]"
        >
          <IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon icon={gridOutline} />
            <IonLabel>Kokpit</IonLabel>
          </IonTabButton>

          <IonTabButton tab="scan" href="/scan">
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
  </IonApp>
);

export default App;
