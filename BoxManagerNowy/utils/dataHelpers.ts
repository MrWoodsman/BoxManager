import { BOXES_DATA, ITEMS_DATA } from '@/constants/data';

// === BOXES ===
export const getEmptyBoxes = () => {
  return BOXES_DATA.filter((box) => {
    const hasItems = ITEMS_DATA.some((item) => item.boxId === box.id);

    return !hasItems;
  });
};

// === ITEMS ===
export const getItemByBoxId = (boxId: string) => {
  return ITEMS_DATA.filter((item) => item.boxId === boxId);
};

export const getUnassignedItems = () => {
  return ITEMS_DATA.filter((item) => item.boxId === null);
};
