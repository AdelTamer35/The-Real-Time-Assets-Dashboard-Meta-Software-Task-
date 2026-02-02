'use client';

import { AssetType } from '@/types/asset';

interface TypeFilterProps {
  value: AssetType | 'All';
  onChange: (value: AssetType | 'All') => void;
}

const FILTER_OPTIONS = [
  { value: 'All', label: 'All Assets' },
  { value: 'Stock', label: 'Stocks' },
  { value: 'Crypto', label: 'Cryptocurrencies' },
  { value: 'ETF', label: 'ETFs' },
] as const;

export function TypeFilter({ value, onChange }: TypeFilterProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value as AssetType | 'All';
    onChange(newValue);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="type-filter" className="text-sm text-gray-400 hidden sm:block">
        Type:
      </label>
      <select
        id="type-filter"
        value={value}
        onChange={handleChange}
        className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg 
                   text-gray-100 text-sm focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-transparent 
                   cursor-pointer transition-all hover:border-gray-500
                   min-w-35 sm:min-w-40"
        aria-label="Filter assets by type"
      >
        {FILTER_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}