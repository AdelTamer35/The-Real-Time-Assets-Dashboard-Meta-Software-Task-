'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchInputProps {
  onSearch: (term: string) => void;
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 300);

  // Direct callback - no extra effect
  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const isSearching = inputValue !== debouncedValue && inputValue !== '';

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search assets..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
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
