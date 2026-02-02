'use client';

import { AssetType } from '@/types/asset';
import { useAssetTypeFilter } from '@/hooks/useAssetTypeFilter';

interface TypeFilterProps {
  value: AssetType;
  onChange: (value: AssetType) => void;
}

export function TypeFilter({ value, onChange }: TypeFilterProps) {
const { availableFilters } = useAssetTypeFilter();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="type-filter" className="text-sm text-gray-400 hidden sm:block">
        Type:
      </label>
      <select
        id="type-filter"
        value={value}
        onChange={(e) => onChange(e.target.value as AssetType)}
        className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg 
                   text-gray-100 text-sm focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-transparent 
                   cursor-pointer transition-all hover:border-gray-500
                   min-w-35 sm:min-w-40"
        aria-label="Filter assets by type"
      >
        {availableFilters.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}