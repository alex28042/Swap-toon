import React from 'react';
import { ViewType } from '../types';

interface BottomNavProps {
  currentView: ViewType;
  onChangeView: (view: ViewType) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="glass-panel rounded-full p-2 flex gap-2 shadow-2xl">
        <button
          onClick={() => onChangeView('swap')}
          className={`px-6 py-3 rounded-full flex items-center gap-2 font-bold transition-all duration-300 ${
            currentView === 'swap' 
              ? 'bg-primary text-white shadow-lg scale-105' 
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          Swap
        </button>
        <button
          onClick={() => onChangeView('profile')}
          className={`px-6 py-3 rounded-full flex items-center gap-2 font-bold transition-all duration-300 ${
            currentView === 'profile' 
              ? 'bg-primary text-white shadow-lg scale-105' 
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          Perfil
        </button>
      </div>
    </div>
  );
};

export default BottomNav;