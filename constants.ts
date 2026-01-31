import { Token } from './types';

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
