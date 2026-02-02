'use client';

import { AssetRow } from './AssetRow';
import { useAssetTable, type TableColumn } from '@/hooks/useAssetTable';
import type { Asset } from '@/types/asset';

interface AssetTableProps {
  assets: Asset[];
  onSort: (columnKey: keyof Asset) => void;
  sortConfig: SortConfig;
}

export type SortConfig = {
  key: keyof Asset;
  direction: 'asc' | 'desc';
};

export function AssetTable({ assets, onSort, sortConfig }: AssetTableProps) {
  const { tableColumns, handleColumnHeaderClick } = useAssetTable(onSort);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full text-sm divide-y divide-gray-700">
        <thead className="bg-gray-800/70 sticky top-0 z-10">
          <tr>
            {tableColumns.map((column: TableColumn) => (
              <th
                key={String(column.key)}
                scope="col"
                className={`
                  px-4 py-3 font-medium text-gray-300 transition-colors duration-150
                  hover:bg-gray-700/50 focus:bg-gray-700/50 cursor-pointer select-none
                  ${column.align === 'right' ? 'text-right' : 'text-left'}
                  ${column.isMonospace ? 'font-mono' : ''}
                `}
                onClick={() => handleColumnHeaderClick(column.key)}
                aria-sort={
                  sortConfig.key === column.key
                    ? sortConfig.direction === 'asc' ? 'ascending' : 'descending'
                    : 'none'
                }
              >
                <div className="flex items-center gap-1">
                  {column.label}
                  {sortConfig.key === column.key && (
                    <span className="text-xs opacity-75" aria-hidden="true">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {assets.length > 0 ? (
            assets.map((asset) => (
              <AssetRow key={asset.id} asset={asset} />
            ))
          ) : (
            <tr>
              <td colSpan={tableColumns.length} className="px-4 py-12 text-center text-gray-500">
                No matching assets found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
