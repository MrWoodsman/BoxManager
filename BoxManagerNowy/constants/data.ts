export const BOXES_DATA = [
  {
    id: 'B52A',
    name: 'Wszystko i nic',
    location: 'Salon',
    lastModified: '2024-05-20T10:00:00Z',
    items: 2,
  },
  { id: 'A6H1', name: 'Szafa', location: 'Salon', lastModified: '2024-05-21T12:30:00Z', items: 1 },
  {
    id: 'HF25',
    name: 'Regał 1',
    location: 'Sypialnia',
    lastModified: '2024-05-18T08:15:00Z',
    items: 0,
  },
  {
    id: 'H2M6',
    name: 'Szafka w łazience',
    location: 'Łazienka',
    lastModified: '2024-05-22T14:00:00Z',
    items: 0,
  },
  {
    id: 'K9L2',
    name: 'Narzędzia',
    location: 'Garaż',
    lastModified: '2024-05-22T15:45:00Z',
    items: 0,
  },
  {
    id: 'P3X1',
    name: 'Ubrania zimowe',
    location: 'Strych',
    lastModified: '2024-05-15T09:00:00Z',
    items: 0,
  },
  {
    id: 'Z7V9',
    name: 'Książki',
    location: 'Gabinet',
    lastModified: '2024-05-23T10:20:00Z',
    items: 0,
  },
  {
    id: 'M4N8',
    name: 'Zabawki',
    location: 'Pokój dziecięcy',
    lastModified: '2024-05-23T11:00:00Z',
    items: 0,
  },
];

export const ITEMS_DATA = [
  { id: '1', name: 'Kabel HDMI', boxId: 'B52A', category: 'Elektronika' },
  { id: '2', name: 'Stary paszport', boxId: 'B52A', category: 'Dokumenty' },
  { id: '3', name: 'Zasilacz', boxId: 'A6H1', category: 'Elektronika' },
  { id: '4', name: 'Zagubiona skarpetka', boxId: null, category: 'Inne' }, // Nieprzypisane!
  { id: '5', name: 'Ładowarka do laptopa', boxId: null, category: 'Elektronika' }, // Nieprzypisane!
];
