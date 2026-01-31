import React, { useState } from 'react';
import { TOKENS } from '../constants';
import { Token } from '../types';

interface TokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  selectedToken: Token;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ isOpen, onClose, onSelect, selectedToken }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredTokens = TOKENS.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 animate-[fadeIn_0.2s_ease-out]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-800">Seleccionar Token</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Buscar por nombre o símbolo..."
            className="w-full px-4 py-3 bg-gray-100 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all text-gray-700 placeholder-gray-400 font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        {/* List */}
        <div className="overflow-y-auto max-h-[400px] p-2">
          {filteredTokens.map((token) => (
            <button
              key={token.id}
              onClick={() => {
                onSelect(token);
                onClose();
              }}
              className={`w-full flex items-center p-3 rounded-2xl transition-all mb-1 group
                ${selectedToken.id === token.id 
                  ? 'bg-primary/10 border-2 border-primary' 
                  : 'hover:bg-gray-50 border-2 border-transparent'
                }`}
            >
              <img 
                src={token.icon} 
                alt={token.name} 
                className="w-10 h-10 rounded-full shadow-sm group-hover:scale-110 transition-transform"
              />
              <div className="ml-4 text-left flex-1">
                <div className="font-bold text-gray-800">{token.symbol}</div>
                <div className="text-sm text-gray-500 font-medium">{token.name}</div>
              </div>
              {selectedToken.id === token.id && (
                <div className="text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
          {filteredTokens.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No se encontraron tokens 😢
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenSelector;
