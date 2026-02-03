export interface Box {
  id: number;
  name: string;
  location: string;
  itemsCount: number;
  color?: string;
}

export interface Item {
  id: number;
  name: string;
  boxId: number | null;
  category?: string;
}

export interface Room {
  id: number;
  name: string;
}

// 2. Mockowe Dane - PUDEŁKA
export const mockBoxes: Box[] = [
  { id: 1, name: "Zimowe Ubrania", location: "Garaż", itemsCount: 12, color: "blue" },
  { id: 2, name: "Kable i HDMI", location: "Biuro", itemsCount: 45, color: "orange" },
  { id: 3, name: "Dokumenty 2023", location: "Szafa", itemsCount: 5, color: "red" },
  { id: 4, name: "Ozdoby Choinkowe", location: "Strych", itemsCount: 30, color: "red" },
  { id: 5, name: "Stare Zabawki", location: "Piwnica", itemsCount: 15 },
];

// 3. Mockowe Dane - PRZEDMIOTY (Opcjonalnie, na później)
export const mockItems: Item[] = [
  { id: 101, name: "Kurtka Narciarska", boxId: 1, category: "Ubrania" },
  { id: 102, name: "Kabel HDMI 3m", boxId: 2, category: "Elektronika" },
  { id: 102, name: "Kabel HDMI 3m", boxId: 2, category: "Elektronika" },
  { id: 103, name: "Paszport", boxId: null, category: "Dokumenty" },
];

// 4. Mockowe Dane - POKOJE
export const mockRooms: Room[] = [
  { id: 201, name: "Garaż" },
  { id: 202, name: "Biuro" },
  { id: 203, name: "Sypialnia" },
];
