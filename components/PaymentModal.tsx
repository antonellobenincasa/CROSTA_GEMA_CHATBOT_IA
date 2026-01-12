import React from 'react';
import { PAYMENT_INFO } from '../constants';

interface PaymentModalProps {
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden relative flex flex-col items-center p-6"
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
        <div className="w-12 h-12 bg-crosta-orange/10 rounded-full flex items-center justify-center text-crosta-orange mb-3">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Transferencia Bancaria</h2>
        
        <div className="w-full overflow-y-auto max-h-[60vh] pr-1 scroll-smooth">
            
            {/* Beneficiary Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 text-sm text-gray-700 space-y-2">
                <div>
                    <span className="block text-xs text-gray-500 uppercase font-bold">Beneficiario</span>
                    <span className="font-semibold text-gray-900">{PAYMENT_INFO.BENEFICIARY}</span>
                </div>
                <div className="flex justify-between">
                    <div>
                        <span className="block text-xs text-gray-500 uppercase font-bold">Cédula</span>
                        <span className="font-mono text-gray-800">{PAYMENT_INFO.ID}</span>
                    </div>
                </div>
                 <div>
                    <span className="block text-xs text-gray-500 uppercase font-bold">Correo</span>
                    <span className="text-xs text-gray-800 break-all">{PAYMENT_INFO.EMAIL}</span>
                </div>
            </div>

            <h3 className="text-sm font-bold text-gray-500 uppercase mb-2 pl-1">Cuentas Disponibles</h3>

            {/* Bank List */}
            <div className="space-y-3">
                {PAYMENT_INFO.ACCOUNTS.map((acc, index) => (
                    <div key={index} className="flex flex-col bg-white border border-gray-100 shadow-sm rounded-lg p-3 hover:border-crosta-orange/30 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-crosta-orange"></div>
                            <span className="font-bold text-gray-800 text-sm">{acc.bank}</span>
                        </div>
                        <div className="flex justify-between items-center pl-4">
                            <span className="text-xs text-gray-500">{acc.type}</span>
                            <span className="font-mono font-bold text-gray-900 tracking-wide">{acc.number}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Footer Instruction */}
        <div className="mt-4 pt-3 border-t border-gray-100 text-center w-full">
             <p className="text-xs text-gray-500 leading-tight">
                Envía tu comprobante al <strong className="text-crosta-orange">Chat</strong> para confirmar.
            </p>
        </div>

      </div>
    </div>
  );
};