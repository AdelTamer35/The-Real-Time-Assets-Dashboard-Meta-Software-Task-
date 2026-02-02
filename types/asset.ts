export interface Asset {
  id: number;
  name: string;
  symbol: string;
  type: AssetType;
  quantity: number;
  price: number;
  changePct: number;
  value: number;
}

export type AssetType = "All" | "Stock" | "Crypto" | "ETF";
