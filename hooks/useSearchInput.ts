import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

/**
 * Search input logic - manages debouncing, loading states, user input
 */
export function useSearchInput(debounceDelay = 300) {
  const [inputValue, setInputValue] = useState("");

  const debouncedValue = useDebounce(inputValue, debounceDelay);

  const isSearching = inputValue !== "" && inputValue !== debouncedValue;

  const updateSearchTerm = (newTerm: string) => {
    setInputValue(newTerm);
  };

  return {
    inputValue,
    debouncedValue,
    isSearching,
    updateSearchTerm,
  };
}
