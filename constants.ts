import { Token, LiquidityPool, DailyData } from './types';

export const TOKENS: Token[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026',
    color: '#F7931A'
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026',
    color: '#627EEA'
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=026',
    color: '#14F195'
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026',
    color: '#2775CA'
  },
  {
    id: 'dogecoin',
    symbol: 'DOGE',
    name: 'Dogecoin',
    icon: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=026',
    color: '#C2A633'
  },
  {
    id: 'pepe',
    symbol: 'PEPE',
    name: 'Pepe',
    icon: 'https://cryptologos.cc/logos/pepe-pepe-logo.png?v=026',
    color: '#4C9C2E'
  }
];

export const MOCK_RATES: Record<string, number> = {
  'BTC': 65000,
  'ETH': 3500,
  'SOL': 145,
  'USDC': 1,
  'DOGE': 0.12,
  'PEPE': 0.000008
};

export const POOLS: LiquidityPool[] = [
  {
    id: 'btc-usdc',
    tokenA: TOKENS[0], // BTC
    tokenB: TOKENS[3], // USDC
    apr: 12.5,
    tvl: '$45M'
  },
  {
    id: 'eth-sol',
    tokenA: TOKENS[1], // ETH
    tokenB: TOKENS[2], // SOL
    apr: 24.8,
    tvl: '$12M'
  },
  {
    id: 'pepe-doge',
    tokenA: TOKENS[5], // PEPE
    tokenB: TOKENS[4], // DOGE
    apr: 420.69,
    tvl: '$2M'
  }
];

export const MOCK_CHART_DATA: DailyData[] = [
  { day: 'Lun', value: 12320 },
  { day: 'Mar', value: 12380 },
  { day: 'Mié', value: 12350 },
  { day: 'Jue', value: 12410 },
  { day: 'Vie', value: 12440 },
  { day: 'Sáb', value: 12510 },
  { day: 'Dom', value: 12450.32 }
];