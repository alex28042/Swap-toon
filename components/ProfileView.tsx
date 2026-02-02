import React, { useState } from 'react';
import { Trade, LiquidityPool, Position, DailyData } from '../types';
import { POOLS, MOCK_CHART_DATA } from '../constants';

interface ProfileViewProps {
  trades: Trade[];
  positions: Position[];
  onJoinPool: (poolId: string) => void;
}

// Custom SVG Chart Component
const EarningsChart: React.FC<{ data: DailyData[] }> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const width = 350;
  const height = 120;
  const padding = 20;

  // Calculate Min/Max for scaling
  const values = data.map(d => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  // Helper to map data to SVG coordinates
  const getX = (index: number) => (index / (data.length - 1)) * (width - padding * 2) + padding;
  const getY = (val: number) => height - padding - ((val - minVal) / range) * (height - padding * 2);

  // Create points for the polyline
  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
  // Create area path (closing the loop at the bottom)
  const areaPath = `${points} ${width - padding},${height} ${padding},${height}`;

  return (
    <div className="w-full mt-6 select-none">
      <div className="flex justify-between items-end px-2 mb-2">
        <h4 className="text-gray-500 font-bold text-sm">Rendimiento (7 días)</h4>
        {hoveredIndex !== null ? (
          <span className="text-green-500 font-bold text-sm animate-pulse">
            +${(data[hoveredIndex].value - data[0].value).toFixed(2)}
          </span>
        ) : (
          <span className="text-green-500 font-bold text-sm">
            +${(data[data.length - 1].value - data[0].value).toFixed(2)}
          </span>
        )}
      </div>
      
      <div className="relative">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6C5CE7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6C5CE7" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Fill Area */}
          <polygon points={areaPath} fill="url(#chartGradient)" />
          
          {/* Line */}
          <polyline 
            points={points} 
            fill="none" 
            stroke="#6C5CE7" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Data Points (Invisible trigger areas or visible dots) */}
          {data.map((d, i) => (
            <g key={i}>
              {/* Vertical Grid Line on Hover */}
              {hoveredIndex === i && (
                <line 
                  x1={getX(i)} y1={getY(d.value)} 
                  x2={getX(i)} y2={height} 
                  stroke="#A29BFE" 
                  strokeWidth="1" 
                  strokeDasharray="4 4" 
                />
              )}
              
              {/* Visible Dot */}
              <circle 
                cx={getX(i)} 
                cy={getY(d.value)} 
                r={hoveredIndex === i ? 6 : 4} 
                fill="#fff" 
                stroke="#6C5CE7" 
                strokeWidth={2}
                className="transition-all duration-200"
              />
              
              {/* Interaction Area (Invisible large circle) */}
              <circle 
                cx={getX(i)} 
                cy={getY(d.value)} 
                r={20} 
                fill="transparent" 
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {/* Tooltip on Hover */}
              {hoveredIndex === i && (
                <g>
                   <rect 
                     x={getX(i) - 35} 
                     y={getY(d.value) - 40} 
                     width="70" 
                     height="30" 
                     rx="8" 
                     fill="#2D3436" 
                     opacity="0.9"
                   />
                   <text 
                     x={getX(i)} 
                     y={getY(d.value) - 21} 
                     textAnchor="middle" 
                     fill="#fff" 
                     fontSize="11" 
                     fontWeight="bold"
                   >
                     ${d.value.toLocaleString()}
                   </text>
                   {/* Triangle pointer */}
                   <polygon 
                     points={`${getX(i)},${getY(d.value)-10} ${getX(i)-5},${getY(d.value)-15} ${getX(i)+5},${getY(d.value)-15}`} 
                     fill="#2D3436"
                     opacity="0.9"
                   />
                </g>
              )}
            </g>
          ))}
        </svg>

        {/* X Axis Labels */}
        <div className="flex justify-between px-2 mt-2">
          {data.map((d, i) => (
            <span key={i} className={`text-[10px] font-bold ${hoveredIndex === i ? 'text-primary' : 'text-gray-400'}`}>
              {d.day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfileView: React.FC<ProfileViewProps> = ({ trades, positions, onJoinPool }) => {
  const [activeTab, setActiveTab] = useState<'pools' | 'history'>('pools');
  const [loadingPoolId, setLoadingPoolId] = useState<string | null>(null);

  const handleJoin = (poolId: string) => {
    setLoadingPoolId(poolId);
    setTimeout(() => {
      onJoinPool(poolId);
      setLoadingPoolId(null);
    }, 1500);
  };

  const getPosition = (poolId: string) => positions.find(p => p.poolId === poolId);

  return (
    <div className="w-full max-w-lg mx-auto pb-24 animate-[fadeIn_0.3s_ease-out]">
      {/* Profile Header */}
      <div className="glass-panel rounded-[2rem] p-6 mb-6 text-center relative overflow-visible">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-secondary/30 to-primary/30 rounded-t-[2rem]"></div>
        <div className="relative z-10 -mt-2">
          <div className="w-24 h-24 bg-white p-1 rounded-full mx-auto shadow-lg mb-3">
             <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Felix" alt="Avatar" className="w-full h-full rounded-full bg-gray-100" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Crypto Explorer</h2>
          <p className="text-gray-500 text-sm mb-4">@early_adopter</p>
          
          <div className="bg-white/60 rounded-xl p-4 inline-block min-w-[200px] border border-white shadow-sm backdrop-blur-sm">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Portfolio Total</p>
            <p className="text-3xl font-extrabold text-primary">${MOCK_CHART_DATA[MOCK_CHART_DATA.length - 1].value.toLocaleString()}</p>
          </div>

          {/* Performance Chart */}
          <EarningsChart data={MOCK_CHART_DATA} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-200/50 p-1 rounded-2xl mb-6 mx-4">
        <button 
          onClick={() => setActiveTab('pools')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'pools' ? 'bg-white shadow-md text-primary' : 'text-gray-500 hover:bg-white/50'}`}
        >
          🌊 Liquidez
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'history' ? 'bg-white shadow-md text-primary' : 'text-gray-500 hover:bg-white/50'}`}
        >
          📜 Historial
        </button>
      </div>

      {/* Content */}
      <div className="px-1">
        {activeTab === 'pools' ? (
          <div className="space-y-4">
            {POOLS.map((pool) => {
              const position = getPosition(pool.id);
              const isLoading = loadingPoolId === pool.id;

              return (
                <div key={pool.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center -space-x-3">
                      <img src={pool.tokenA.icon} className="w-10 h-10 rounded-full border-2 border-white z-10" alt={pool.tokenA.symbol} />
                      <img src={pool.tokenB.icon} className="w-10 h-10 rounded-full border-2 border-white" alt={pool.tokenB.symbol} />
                    </div>
                    <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      🔥 {pool.apr}% APR
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{pool.tokenA.symbol} / {pool.tokenB.symbol}</h3>
                    <p className="text-sm text-gray-400">TVL: {pool.tvl}</p>
                  </div>

                  {position ? (
                    <div className="bg-gray-50 rounded-xl p-3 mb-3 border border-gray-100">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Tu posición:</span>
                        <span className="font-bold text-gray-800">${position.amount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Ganancias (Hoy):</span>
                        <span className="font-bold text-green-500">+${(position.amount * 0.05).toFixed(2)}</span>
                      </div>
                    </div>
                  ) : null}

                  <button 
                    onClick={() => !position && !isLoading && handleJoin(pool.id)}
                    disabled={!!position || isLoading}
                    className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2
                      ${position 
                        ? 'bg-green-500 text-white cursor-default' 
                        : isLoading
                          ? 'bg-gray-200 text-gray-400'
                          : 'bg-gray-900 text-white hover:bg-primary'
                      }`}
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : position ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Staked
                      </>
                    ) : 'Depositar Liquidez'}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
             {trades.length === 0 ? (
               <div className="text-center py-12 text-gray-400">
                 <div className="text-4xl mb-3">🕸️</div>
                 <p>Aún no has hecho swaps.</p>
               </div>
             ) : (
               trades.slice().reverse().map((trade) => (
                 <div key={trade.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-gray-100">
                   <div className="flex items-center gap-3">
                     <div className="relative">
                       <img src={trade.fromToken.icon} className="w-8 h-8 rounded-full z-10 relative" alt="" />
                       <img src={trade.toToken.icon} className="w-8 h-8 rounded-full absolute -bottom-1 -right-1 border-2 border-white" alt="" />
                     </div>
                     <div>
                       <div className="font-bold text-gray-700 text-sm">Swap</div>
                       <div className="text-xs text-gray-400">{trade.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className="font-bold text-gray-800">+{parseFloat(trade.toAmount).toFixed(4)} {trade.toToken.symbol}</div>
                     <div className="text-xs text-red-400 font-medium">-{parseFloat(trade.fromAmount).toFixed(4)} {trade.fromToken.symbol}</div>
                   </div>
                 </div>
               ))
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;