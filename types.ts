export interface Token {
  id: string;
  symbol: string;
  name: string;
  icon: string; // URL to image
  color: string;
}

export interface SwapState {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  rate: number;
}

export enum SwapStatus {
  IDLE = 'IDLE',
  CALCULATING = 'CALCULATING',
  CONFIRMING = 'CONFIRMING',
  SWAPPING = 'SWAPPING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface Trade {
  id: string;
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  date: Date;
}

export interface LiquidityPool {
  id: string;
  tokenA: Token;
  tokenB: Token;
  apr: number;
  tvl: string; // Total Value Locked string representation
}

export interface Position {
  poolId: string;
  amount: number; // Mock amount staked
  earnings: number; // Mock earnings
}

export interface DailyData {
  day: string;
  value: number;
}

export type ViewType = 'swap' | 'profile';