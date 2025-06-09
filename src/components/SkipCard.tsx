import type { SkipData } from "../api/SkipService";
import { FaTruckMoving, FaWeightHanging } from "react-icons/fa";

interface Props {
  skip: SkipData;
  selected: boolean;
  onSelect: () => void;
}

export default function SkipCard({ skip, selected, onSelect }: Props) {
  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);

  const bgClass = selected ? "bg-blue-600 border-blue-400" : "bg-gray-800 border-gray-700";
  const textColor = "text-white";
  const priceColor = selected ? "text-white" : "text-blue-400";

  return (
    <div
      onClick={onSelect}
      className={`border rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${bgClass}`}
    >
      <img
        src="https://cdn.images.fecom-media.com/FE00005867/images/HE1106451_1106451-P.jpg?width=578&height=578&scale=UpscaleCanvas&anchor=MiddleCenter"
        alt={`${skip.size} yard skip`}
        className="w-full h-40 object-contain mb-4 rounded"
      />

      <div className="flex justify-between items-start mb-2">
        <h2 className={`text-xl font-bold ${textColor}`}>{skip.size} Yard Skip</h2>
        <span className="text-xs font-medium text-blue-300">
          {skip.hire_period_days} Day Hire
        </span>
      </div>

      <p className={`text-xl font-semibold mb-2 ${priceColor}`}>
        £{totalPrice.toFixed(2)}
      </p>

      <div className="space-y-1 text-sm text-gray-300">
        {skip.allowed_on_road && (
          <p className="flex items-center gap-2">
            <FaTruckMoving className="text-green-400" /> Can be placed on-road
          </p>
        )}
        {skip.allows_heavy_waste && (
          <p className="flex items-center gap-2">
            <FaWeightHanging className="text-green-400" /> Allows heavy waste
          </p>
        )}
      </div>
    </div>
  );
}
