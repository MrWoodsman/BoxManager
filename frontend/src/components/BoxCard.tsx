import type { Box } from "../data/mockData";

interface BoxCardProps {
  box: Box;
  onClick?: () => void;
}

export const BoxCard = ({ box, onClick }: BoxCardProps) => {
  return (
    <div
      onClick={onClick}
      className="min-w-40 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 snap-center active:scale-95 transition-transform"
    >
      <div className="flex items-start gap-2 mb-3">
        {/* Kwadracik koloru */}
        <div
          className="w-3 h-3 rounded-sm shadow-sm"
          style={{
            backgroundColor: box.color || "#a3a3a3",
          }}
        ></div>
        <span className="text-[10px] font-bold text-orange-500 uppercase">BOX #{box.id}</span>
      </div>
      <h4 className="font-bold text-gray-900 leading-tight mb-1">{box.name}</h4>
      <p className="text-xs text-gray-400">
        {box.location} • {box.itemsCount} rzeczy
      </p>
    </div>
  );
};
