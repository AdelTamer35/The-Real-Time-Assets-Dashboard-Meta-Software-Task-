import { useState, useMemo, useEffect, useCallback } from "react";
import { INITIAL_ASSETS } from "@/data/initialAssets";
import type { Asset, AssetType } from "@/types/asset";
import { sortAssetsByKey } from "@/lib/utils";

export function usePortfolioDashboard() {
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<AssetType>("All");
  const [sortKey, setSortKey] = useState<keyof Asset>("value");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Real-time mock data updates (every 8s)
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((previousAssets) =>
        previousAssets.map((asset) => {
          const change = (Math.random() - 0.5) * 0.02;
          const newPrice = asset.price * (1 + change);
          return {
            ...asset,
            price: parseFloat(newPrice.toFixed(2)),
            changePct: parseFloat((change * 100).toFixed(1)),
            value: parseFloat((asset.quantity * newPrice).toFixed(2)),
          };
        }),
      );
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const filteredAndSortedAssets = useMemo(() => {
    return assets
      .filter(
        (asset) =>
          (asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (filterType === "All" || asset.type === filterType),
      )
      .sort((firstAsset, secondAsset) =>
        sortAssetsByKey(firstAsset, secondAsset, sortKey, sortDirection),
      );
  }, [assets, searchTerm, filterType, sortKey, sortDirection]);

  const handleSearchQueryChange = useCallback((newSearchQuery: string) => {
    setSearchTerm(newSearchQuery);
  }, []);

  const handleAssetTypeFilterChange = useCallback(
    (newFilterType: AssetType | "All") => {
      setFilterType(newFilterType);
    },
    [],
  );

  const handleColumnSort = useCallback(
    (clickedColumn: keyof Asset) => {
      setSortKey(clickedColumn);
      setSortDirection((previousDirection) =>
        sortKey === clickedColumn && previousDirection === "asc"
          ? "desc"
          : "asc",
      );
    },
    [sortKey],
  );

  const totalMatchingAssets = filteredAndSortedAssets.length;

  return {
    filteredAndSortedAssets,
    filterType,
    sortKey,
    sortDirection,
    totalMatchingAssets,

    handleSearchQueryChange,
    handleAssetTypeFilterChange,
    handleColumnSort,
  };
}
