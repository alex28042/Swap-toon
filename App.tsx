import React, { useState, useEffect } from 'react';
import { TOKENS, MOCK_RATES } from './constants';
import { Token, SwapStatus, Trade, ViewType, Position } from './types';
import TokenSelector from './components/TokenSelector';
import NumberInput from './components/NumberInput';
import { getMarketInsight } from './services/geminiService';
import BottomNav from './components/BottomNav';
import ProfileView from './components/ProfileView';

const App: React.FC = () => {
  // Navigation
  const [currentView, setCurrentView] = useState<ViewType>('swap');

  // Swap State
  const [fromToken, setFromToken] = useState<Token>(TOKENS[0]); // BTC
  const [toToken, setToToken] = useState<Token>(TOKENS[3]);   // USDC
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [status, setStatus] = useState<SwapStatus>(SwapStatus.IDLE);
  
  // User Data State
  const [trades, setTrades] = useState<Trade[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  // Modals
  const [isFromModalOpen, setIsFromModalOpen] = useState(false);
  const [isToModalOpen, setIsToModalOpen] = useState(false);
  
  // AI Insight
  const [insight, setInsight] = useState<string>('');
  const [loadingInsight, setLoadingInsight] = useState(false);

  // Derived state
  const rate = MOCK_RATES[fromToken.symbol] / MOCK_RATES[toToken.symbol];

  // Update To Amount when From Amount changes
  useEffect(() => {
    if (!fromAmount) {
      setToAmount('');
      return;
    }
    const num = parseFloat(fromAmount);
    if (!isNaN(num)) {
      const calculated = num * rate;
      setToAmount(calculated.toFixed(6).replace(/\.?0+$/, ''));
    }
  }, [fromAmount, rate]);

  // Fetch AI Insight when pair changes
  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const text = await getMarketInsight(fromToken.symbol, toToken.symbol);
      setInsight(text);
      setLoadingInsight(false);
    };
    
    const timeout = setTimeout(fetchInsight, 500);
    return () => clearTimeout(timeout);
  }, [fromToken.symbol, toToken.symbol]);

  const handleSwapSwitch = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount); 
  };

  const handleSwapAction = () => {
    if (!fromAmount || parseFloat(fromAmount) === 0) return;

    setStatus(SwapStatus.CONFIRMING);
    
    // Simulate steps
    setTimeout(() => {
      setStatus(SwapStatus.SWAPPING);
      setTimeout(() => {
        // Create new trade record
        const newTrade: Trade = {
          id: Date.now().toString(),
          fromToken,
          toToken,
          fromAmount,
          toAmount,
          date: new Date()
        };
        setTrades(prev => [...prev, newTrade]);
        setStatus(SwapStatus.SUCCESS);
      }, 2000);
    }, 1500);
  };

  const handleJoinPool = (poolId: string) => {
    // Mock joining a pool
    const newPosition: Position = {
      poolId,
      amount: Math.floor(Math.random() * 500) + 100, // Random mock amount
      earnings: 0
    };
    setPositions(prev => [...prev, newPosition]);
  };

  const reset = () => {
    setFromAmount('');
    setToAmount('');
    setStatus(SwapStatus.IDLE);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-background">
      {/* Background Animated Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Main Container */}
      <div className="w-full max-w-lg relative z-10 min-h-[600px] flex flex-col">
        
        {/* Header Title (Conditional) */}
        {currentView === 'swap' && (
          <div className="text-center mb-6 animate-[fadeIn_0.5s]">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2 drop-shadow-sm tracking-tight">
              Swap<span className="text-primary">Toon</span>
            </h1>
            <p className="text-gray-600 font-medium">Intercambio rápido y divertido 🚀</p>
          </div>
        )}

        {/* --- SWAP VIEW --- */}
        {currentView === 'swap' && (
          <div className="glass-panel rounded-[2rem] p-4 sm:p-6 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-white/50 animate-[fadeIn_0.3s_ease-out]">
            {/* Header Actions */}
            <div className="flex justify-between items-center mb-4 px-2">
              <span className="font-bold text-gray-500 text-sm">VENDER</span>
              <div className="flex space-x-2">
                 <button className="p-2 rounded-full hover:bg-gray-100/50 text-gray-400 transition-colors">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 </button>
              </div>
            </div>

            {/* From Section */}
            <div className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-3xl p-4 border border-gray-100 mb-2 group">
              <div className="flex justify-between mb-2">
                <button 
                  onClick={() => setIsFromModalOpen(true)}
                  className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  <img src={fromToken.icon} alt={fromToken.symbol} className="w-6 h-6 rounded-full" />
                  <span className="font-bold text-gray-800">{fromToken.symbol}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="text-right">
                   <NumberInput value={fromAmount} onChange={setFromAmount} placeholder="0" />
                </div>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400 font-medium px-1">
                 <span>Balance: 2.45</span>
                 <span>≈ ${(parseFloat(fromAmount || '0') * MOCK_RATES[fromToken.symbol]).toLocaleString()}</span>
              </div>
            </div>

            {/* Swap Switcher */}
            <div className="relative h-4 z-10">
              <button 
                onClick={handleSwapSwitch}
                className="absolute left-1/2 -translate-x-1/2 -top-5 w-10 h-10 bg-white border-4 border-gray-50 rounded-xl shadow-md flex items-center justify-center text-primary hover:rotate-180 hover:scale-110 active:scale-90 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </button>
            </div>

            {/* To Section */}
            <div className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-3xl p-4 border border-gray-100 mb-4">
               <div className="flex justify-between mb-2">
                 <span className="font-bold text-gray-500 text-xs self-center px-1">COMPRAR</span>
               </div>
              <div className="flex justify-between mb-2">
                <button 
                  onClick={() => setIsToModalOpen(true)}
                  className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  <img src={toToken.icon} alt={toToken.symbol} className="w-6 h-6 rounded-full" />
                  <span className="font-bold text-gray-800">{toToken.symbol}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="text-right">
                   <NumberInput value={toAmount} onChange={() => {}} placeholder="0" disabled />
                </div>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400 font-medium px-1">
                 <span>Balance: 0.00</span>
                 <span>~ 1 {fromToken.symbol} = {rate.toLocaleString()} {toToken.symbol}</span>
              </div>
            </div>

            {/* AI Insight Pill */}
            <div className="mb-6">
              <div className={`bg-gradient-to-r from-primary/5 to-secondary/10 border border-primary/10 rounded-2xl p-3 flex items-start gap-3 transition-all duration-500 ${loadingInsight ? 'opacity-50' : 'opacity-100'}`}>
                 <div className="bg-white p-1.5 rounded-full shadow-sm shrink-0 mt-0.5">
                   <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                 </div>
                 <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                   {insight || "Cargando curiosidades..."}
                 </p>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleSwapAction}
              disabled={!fromAmount || parseFloat(fromAmount) === 0 || status !== SwapStatus.IDLE}
              className={`w-full py-4 rounded-2xl text-xl font-bold text-white shadow-lg transform transition-all duration-200
                ${(!fromAmount || parseFloat(fromAmount) === 0) 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-primary hover:bg-[#5849c2] hover:scale-[1.02] active:scale-[0.98] shadow-primary/40'
                }
              `}
            >
              {status === SwapStatus.IDLE && (fromAmount ? 'Intercambiar' : 'Ingresa un monto')}
              {status === SwapStatus.CONFIRMING && 'Confirmando...'}
              {status === SwapStatus.SWAPPING && 'Procesando...'}
              {status === SwapStatus.SUCCESS && '¡Éxito!'}
            </button>
          </div>
        )}

        {/* --- PROFILE VIEW --- */}
        {currentView === 'profile' && (
          <ProfileView 
            trades={trades} 
            positions={positions} 
            onJoinPool={handleJoinPool} 
          />
        )}
      </div>

      {/* Success Overlay */}
      {status === SwapStatus.SUCCESS && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl transform animate-[bounce_0.5s_ease-out]">
             <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
             </div>
             <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Intercambio Exitoso!</h2>
             <p className="text-gray-500 mb-6">
               Has intercambiado {fromAmount} {fromToken.symbol} por {toAmount} {toToken.symbol}
             </p>
             <button 
               onClick={reset}
               className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition-colors"
             >
               Hacer otro swap
             </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav currentView={currentView} onChangeView={setCurrentView} />

      {/* Modals */}
      <TokenSelector 
        isOpen={isFromModalOpen} 
        onClose={() => setIsFromModalOpen(false)}
        onSelect={setFromToken}
        selectedToken={fromToken}
      />
      <TokenSelector 
        isOpen={isToModalOpen} 
        onClose={() => setIsToModalOpen(false)}
        onSelect={setToToken}
        selectedToken={toToken}
      />
    </div>
  );
};

export default App;