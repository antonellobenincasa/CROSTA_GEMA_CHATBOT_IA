import React, { useState } from 'react';
import { STRUCTURED_MENU } from '../constants';

interface MenuModalProps {
  onClose: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(STRUCTURED_MENU[0].id);

  const activeCategory = STRUCTURED_MENU.find(cat => cat.id === activeTab) || STRUCTURED_MENU[0];

  return (
    <div className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-gray-50 w-full h-[90vh] max-h-[800px] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative border border-gray-200">
        
        {/* Header with Gradient and Shadow */}
        <div className="bg-gradient-to-r from-orange-600 to-crosta-orange p-5 flex justify-between items-center text-white shrink-0 shadow-lg z-10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            
            <h2 className="text-3xl font-black italic tracking-tight drop-shadow-md">MENÚ</h2>
            <button 
                onClick={onClose} 
                className="bg-black/20 hover:bg-black/40 p-2 rounded-full transition-all text-white backdrop-blur-md border border-white/10 shadow-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        {/* High Contrast Dark Tabs */}
        <div className="flex bg-gray-900 p-2 shrink-0 overflow-x-auto no-scrollbar shadow-inner gap-2">
            {STRUCTURED_MENU.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex-1 py-3 px-5 text-sm font-bold uppercase tracking-wider transition-all rounded-lg whitespace-nowrap border-2 ${
                        activeTab === cat.id 
                        ? 'bg-gradient-to-r from-crosta-orange to-orange-500 text-white border-transparent shadow-[0_0_15px_rgba(255,87,34,0.4)] transform scale-105' 
                        : 'bg-transparent text-gray-400 border-gray-700 hover:text-white hover:border-gray-500'
                    }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 scroll-smooth">
            <div className="space-y-4 pb-4">
                {activeCategory.items.map((item, index) => (
                    <div 
                        key={index} 
                        className="bg-white rounded-xl shadow-md p-4 border-l-[6px] border-crosta-orange flex flex-col gap-2 transform transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-black text-gray-800 text-lg leading-tight uppercase">{item.name}</h3>
                                    {item.isSpicy && (
                                        <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold shadow-sm animate-pulse">
                                            PICANTE 🔥
                                        </span>
                                    )}
                                </div>
                                {item.description && (
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.description}</p>
                                )}
                            </div>
                            
                            {/* Price Badge */}
                            <div className="bg-gray-900 text-white font-bold text-lg px-3 py-1.5 rounded-lg shadow-lg min-w-[70px] text-center border border-gray-700">
                                {item.price}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Download Section */}
            <div className="mt-6 mb-2 p-5 bg-white rounded-xl border-2 border-dashed border-gray-300 text-center shadow-sm">
                <p className="text-sm text-gray-600 font-semibold mb-3">¿Quieres ver la foto real?</p>
                <a 
                    href={activeCategory.imageLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg transition-all transform hover:-translate-y-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    VER MENÚ GRÁFICO
                </a>
            </div>
        </div>

        {/* Promo Footer */}
        <div className="bg-crosta-yellow p-3 text-center text-xs font-black text-crosta-dark shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20 uppercase tracking-wide">
            ★ Pide tu Burger en COMBO por solo +$2.50 ★
        </div>

      </div>
    </div>
  );
};