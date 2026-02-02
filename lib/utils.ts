import type { Asset } from "@/types/asset";

/**
 * Sort assets by a given key and direction
 */
export function sortAssets(
  a: Asset,
  b: Asset,
  key: keyof Asset,
  direction: "asc" | "desc",
): number {
  const aValue = a[key];
  const bValue = b[key];

  // Handle numbers
  if (typeof aValue === "number" && typeof bValue === "number") {
    return direction === "asc" ? aValue - bValue : bValue - aValue;
  }

  // Handle strings (case-insensitive)
  if (typeof aValue === "string" && typeof bValue === "string") {
    return direction === "asc"
      ? aValue.localeCompare(bValue, "en", { sensitivity: "base" })
      : bValue.localeCompare(aValue, "en", { sensitivity: "base" });
  }

  // Fallback for other types
  return 0;
}
