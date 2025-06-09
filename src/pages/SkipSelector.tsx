import { useEffect, useState } from "react";
import { fetchSkips } from "../api/SkipService";
import type { SkipData } from "../api/SkipService";
import SkipCard from "../components/SkipCard";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast";

export default function SkipSelector() {
  const [skips, setSkips] = useState<SkipData[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetchSkips().then(setSkips);
  }, []);

  const selectedSkip = skips.find((s) => s.id === selectedId);

  const handleSelect = (skip: SkipData) => {
    setSelectedId(skip.id);
    toast.success(`${skip.size} Yard Skip selected! £${(skip.price_before_vat * (1 + skip.vat / 100)).toFixed(2)} for ${skip.hire_period_days} days`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-28 px-4">
      <Toaster position="top-right" />
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skips.map((skip) => (
          <SkipCard
            key={skip.id}
            skip={skip}
            selected={skip.id === selectedId}
            onSelect={() => handleSelect(skip)}
          />
        ))}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 border-t border-gray-700 p-4 flex justify-between items-center px-6 z-50 shadow-lg">
        <div>
          {selectedSkip ? (
            <p className="text-sm text-white font-medium">
              {selectedSkip.size} Yard • £
              {(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(2)} •{" "}
              {selectedSkip.hire_period_days} Days
            </p>
          ) : (
            <p className="text-sm text-gray-400">Please select a skip to continue</p>
          )}
        </div>
        <button
          className={`px-5 py-2 rounded-md font-semibold text-white transition-all duration-200 ${
            selectedSkip
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-600 cursor-not-allowed"
          }`}
          disabled={!selectedSkip}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
