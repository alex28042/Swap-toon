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
