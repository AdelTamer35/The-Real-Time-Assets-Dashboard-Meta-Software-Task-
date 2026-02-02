'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { AssetTable } from '@/components/ui/AssetTable';
import { SearchInput } from '@/components/ui/SearchInput';
import { TypeFilter } from '@/components/ui/TypeFilter';
import { INITIAL_ASSETS } from '@/data/initialAssets';
import type { Asset, AssetType } from '@/types/asset';
import { sortAssets } from '@/lib/utils';

export default function DashboardPage() {
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<AssetType | 'All'>('All');
  const [sortKey, setSortKey] = useState<keyof Asset>('value');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Real-time mock data updates (every 8s)
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev => 
        prev.map(asset => {
          const change = (Math.random() - 0.5) * 0.02;
          const newPrice = asset.price * (1 + change);
          return {
            ...asset,
            price: parseFloat(newPrice.toFixed(2)),
            changePct: parseFloat((change * 100).toFixed(1)),
            value: parseFloat((asset.quantity * newPrice).toFixed(2)),
          };
        })
      );
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Efficient filtering + sorting pipeline
  const filteredAndSortedAssets = useMemo(() => {
    return assets
      .filter(asset => 
        (asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterType === 'All' || asset.type === filterType)
      )
      .sort((a, b) => sortAssets(a, b, sortKey, sortDirection));
  }, [assets, searchTerm, filterType, sortKey, sortDirection]);

  const handleSort = useCallback((newKey: keyof Asset) => {
    setSortDirection(prevDir => 
      sortKey === newKey && prevDir === 'asc' ? 'desc' : 'asc'
    );
    setSortKey(newKey);
  }, [sortKey]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row">
      {/* Sidebar - Hidden on mobile, visible on medium+ screens */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-4 hidden md:block">
        <h1 className="text-xl font-bold mb-6 text-blue-400">Assets Dashboard</h1>
        <nav className="space-y-1">
          <div className="font-medium text-gray-300">Portfolio</div>
          <div className="py-1.5 px-3 rounded hover:bg-gray-700 transition-colors bg-blue-900/30 text-blue-300">Overview</div>
          <div className="py-1.5 px-3 rounded hover:bg-gray-700 transition-colors">Positions</div>
          <div className="py-1.5 px-3 rounded hover:bg-gray-700 transition-colors">Activity</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-gray-800/50 border-b border-gray-700 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-semibold text-blue-300">Real-Time Portfolio</h2>
          <div className="flex flex-wrap items-center gap-3">
            <SearchInput onSearch={setSearchTerm} />
            <TypeFilter value={filterType} onChange={setFilterType} />
            <div className="text-sm text-gray-400 min-w-max">
              {filteredAndSortedAssets.length} asset{filteredAndSortedAssets.length !== 1 ? 's' : ''}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4">
          <AssetTable 
            key={`${sortKey}-${sortDirection}`}
            assets={filteredAndSortedAssets} 
            onSort={handleSort} 
            sortConfig={{ key: sortKey, direction: sortDirection }} 
          />
        </div>
      </main>
    </div>
  );
}