'use client';

import { useEffect } from 'react';
import { useSearchInput } from '@/hooks/useSearchInput';

interface SearchInputProps {
  onSearch: (term: string) => void;
}

export function SearchInput({ onSearch }: SearchInputProps) {

 const {
    inputValue,
    debouncedValue,
    isSearching,
    updateSearchTerm,
  } = useSearchInput();

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search assets..."
        value={inputValue}
        onChange={(e) => updateSearchTerm(e.target.value)}
        className="w-full sm:w-64 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg 
                   text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-10"
      />
      {isSearching && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 text-xs font-mono animate-pulse">
          ...
        </span>
      )}
    </div>
  );
}
