import { useCallback } from "react";
import type { Asset } from "@/types/asset";

/**
 * Asset table controller - manages columns, sorting logic
 */
export const TABLE_COLUMNS = [
  {
    key: "name" as keyof Asset,
    label: "Name",
    align: "left" as const,
    isMonospace: true,
  },
  {
    key: "symbol" as keyof Asset,
    label: "Symbol",
    align: "left",
    isMonospace: true,
  },
  {
    key: "type" as keyof Asset,
    label: "Type",
    align: "left",
    isMonospace: true,
  },
  {
    key: "quantity" as keyof Asset,
    label: "Qty",
    align: "right",
    isMonospace: true,
  },
  {
    key: "price" as keyof Asset,
    label: "Price",
    align: "right",
    isMonospace: true,
  },
  {
    key: "changePct" as keyof Asset,
    label: "Change",
    align: "right",
    isMonospace: true,
  },
  {
    key: "value" as keyof Asset,
    label: "Value",
    align: "right",
    isMonospace: true,
    isBold: true,
  },
] as const;

export type TableColumn = (typeof TABLE_COLUMNS)[number];

export function useAssetTable(onColumnSort: (columnKey: keyof Asset) => void) {
  const handleColumnHeaderClick = useCallback(
    (columnKey: keyof Asset) => {
      onColumnSort(columnKey);
    },
    [onColumnSort],
  );

  return {
    tableColumns: TABLE_COLUMNS,
    handleColumnHeaderClick,
  };
}
