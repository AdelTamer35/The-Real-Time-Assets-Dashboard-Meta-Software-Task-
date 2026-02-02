'use client';

import { Asset } from '@/types/asset';
import { AssetRow } from './AssetRow';

interface AssetTableProps {
  assets: Asset[];
  onSort: (key: keyof Asset) => void;
  sortConfig: { key: keyof Asset; direction: 'asc' | 'desc' };
}

const COLUMNS: { key: keyof Asset; label: string; className?: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'symbol', label: 'Symbol', className: 'font-mono' },
  { key: 'type', label: 'Type' },
  { key: 'quantity', label: 'Qty', className: 'text-right font-mono' },
  { key: 'price', label: 'Price', className: 'text-right font-mono' },
  { key: 'changePct', label: 'Change', className: 'text-right font-mono' },
  { key: 'value', label: 'Value', className: 'text-right font-mono font-semibold' },
];

export function AssetTable({ assets, onSort, sortConfig }: AssetTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-800/70 sticky top-0 z-10">
          <tr>
            {COLUMNS.map(({ key, label, className }) => (
              <th
                key={key}
                scope="col"
                className={`px-4 py-3 text-left font-medium text-gray-300 
                          cursor-pointer hover:bg-gray-700/50 transition-colors 
                          ${className || ''}`}
                onClick={() => onSort(key)}
                aria-sort={
                  sortConfig.key === key 
                    ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') 
                    : 'none'
                }
                aria-label={`Sort by ${label} ${sortConfig.key === key ? (sortConfig.direction === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
              >
                <div className="flex items-center gap-1">
                  {label}
                  {sortConfig.key === key && (
                    <span aria-hidden="true">
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
            assets.map(asset => (
              <AssetRow key={asset.id} asset={asset} />
            ))
          ) : (
            <tr>
              <td colSpan={COLUMNS.length} className="px-4 py-8 text-center text-gray-400">
                No assets match your filters
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}