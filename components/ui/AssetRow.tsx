'use client';

import { Asset } from '@/types/asset';

interface AssetRowProps {
  asset: Asset;
}

export function AssetRow({ asset }: AssetRowProps) {
  const getChangeColor = (pct: number) => 
    pct >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
      <td className="px-4 py-3 font-medium">{asset.name}</td>
      <td className="px-4 py-3 text-gray-400 font-mono">{asset.symbol}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          asset.type === 'Stock' ? 'bg-blue-900/30 text-blue-300' :
          asset.type === 'Crypto' ? 'bg-purple-900/30 text-purple-300' :
          'bg-emerald-900/30 text-emerald-300'
        }`}>
          {asset.type}
        </span>
      </td>
      <td className="px-4 py-3 text-right font-mono">{asset.quantity.toLocaleString()}</td>
      <td className="px-4 py-3 text-right font-mono">${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      <td className={`px-4 py-3 text-right font-mono ${getChangeColor(asset.changePct)}`}>
        {asset.changePct >= 0 ? '+' : ''}{asset.changePct.toFixed(1)}%
      </td>
      <td className="px-4 py-3 text-right font-mono font-semibold">
        ${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
    </tr>
  );
}