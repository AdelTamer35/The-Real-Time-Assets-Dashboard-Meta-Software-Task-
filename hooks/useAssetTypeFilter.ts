import { useMemo } from "react";
import type { AssetType } from "@/types/asset";

const FILTER_OPTIONS = [
  { value: "All", label: "All" },
  { value: "Stock", label: "Stocks" },
  { value: "Crypto", label: "Cryptocurrencies" },
  { value: "ETF", label: "ETFs" },
] as const;

export function useAssetTypeFilter() {
  const availableFilters = useMemo(() => FILTER_OPTIONS, []);

  const getFilterLabel = (value: AssetType | "All"): string => {
    const option = availableFilters.find((option) => option.value === value);
    return option?.label || "All";
  };

  return {
    availableFilters,
    getFilterLabel,
  };
}
