import React from 'react';
import { BANK_DETAILS, BRAND_LOGO } from '../constants';

interface PaymentModalProps {
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden relative flex flex-col items-center p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
            onClick={onClose}
            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-800 transition"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>

        {/* Header Icon */}
        <div className="w-16 h-16 bg-crosta-orange/10 rounded-full flex items-center justify-center text-crosta-orange mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Formas de Pago</h2>
        
        <div className="bg-orange-50 text-orange-800 p-3 rounded-lg text-sm font-semibold mb-6 border border-orange-100 w-full">
            ⚠️ Pago solo vía Transferencia Bancaria
        </div>

        {/* Bank Details Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 w-full text-left space-y-3 shadow-inner">
            <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
                <div className="w-8 h-8 rounded bg-yellow-400 flex-shrink-0"></div> 
                <span className="font-bold text-gray-800">{BANK_DETAILS.BANK}</span>
            </div>
            
            <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                    <span>Tipo:</span>
                    <span className="font-medium text-gray-800">{BANK_DETAILS.TYPE}</span>
                </div>
                <div className="flex justify-between">
                    <span>Número:</span>
                    <span className="font-mono font-bold text-gray-800 tracking-wide">{BANK_DETAILS.NUMBER}</span>
                </div>
                 <div className="flex justify-between">
                    <span>RUC:</span>
                    <span className="font-mono text-gray-800">{BANK_DETAILS.RUC}</span>
                </div>
                 <div className="flex justify-between">
                    <span>Nombre:</span>
                    <span className="font-medium text-gray-800 uppercase">{BANK_DETAILS.NAME}</span>
                </div>
            </div>
        </div>

        {/* Footer Instruction */}
        <div className="mt-6 text-xs text-gray-500 leading-relaxed">
            <p className="font-bold mb-1">¡IMPORTANTE!</p>
            <p>Una vez realizado el pago, envíanos al <strong className="text-crosta-orange">PepesmashBOT</strong> tu soporte de pago (foto o captura) y empezamos a trabajar en tu pedido.</p>
        </div>

      </div>
    </div>
  );
};