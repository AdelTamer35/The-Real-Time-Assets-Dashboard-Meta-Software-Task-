import type { Asset } from "@/types/asset";

/**
 * Compare two assets for sorting by specified key and direction
 * Handles numbers (price, value) and strings (name, symbol) intelligently
 */
export function sortAssetsByKey(
  firstAsset: Asset,
  secondAsset: Asset,
  sortKey: keyof Asset,
  sortDirection: "asc" | "desc",
): number {
  const firstValue = firstAsset[sortKey];
  const secondValue = secondAsset[sortKey];

  // Numeric comparison (price, quantity, value, changePct)
  if (typeof firstValue === "number" && typeof secondValue === "number") {
    const numericDifference = firstValue - secondValue;
    return sortDirection === "asc" ? numericDifference : -numericDifference;
  }

  // String comparison (name, symbol, type) - case-insensitive
  if (typeof firstValue === "string" && typeof secondValue === "string") {
    const stringComparison = firstValue.localeCompare(
      secondValue,
      "en",
      { sensitivity: "base" }, // Ignore case, accents, diacritics
    );
    return sortDirection === "asc" ? stringComparison : -stringComparison;
  }

  // Stable fallback for unhandled types
  return 0;
}
