import React from 'react';
import { BRAND_LOGO } from '../constants';

interface HoursModalProps {
  onClose: () => void;
}

export const HoursModal: React.FC<HoursModalProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-crosta-orange w-full max-w-sm rounded-xl shadow-2xl overflow-hidden relative border-4 border-crosta-orange flex flex-col items-center justify-center p-8 text-white text-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button 
            onClick={onClose}
            className="absolute top-2 right-2 p-2 text-white/80 hover:text-white"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>

        {/* Title */}
        <h2 className="text-5xl font-bold uppercase tracking-tighter mb-1">Horarios</h2>
        <p className="text-xl font-handwriting italic mb-8 opacity-90">Delivery Only</p>

        {/* Schedule Grid */}
        <div className="space-y-6 w-full mb-8">
            <div>
                <h3 className="text-xl font-bold text-black uppercase mb-1">Martes – Jueves</h3>
                <p className="text-2xl font-bold">5:30PM – 10:00PM</p>
            </div>

            <div>
                <h3 className="text-xl font-bold text-black uppercase mb-1">Viernes – Sábado</h3>
                <p className="text-2xl font-bold">5:30PM – 10:30PM</p>
            </div>

            <div>
                <h3 className="text-xl font-bold text-black uppercase mb-1">Domingo</h3>
                <p className="text-2xl font-bold">5:30PM – 10:00PM</p>
            </div>
        </div>

        {/* Closed Banner */}
        <div className="bg-white text-black font-black text-xl py-3 px-8 rounded-lg shadow-lg rotate-1 transform mb-6 w-full max-w-[90%]">
            LUNES CERRADO
        </div>

        {/* Decoration */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white">
             <img src={BRAND_LOGO} alt="Pepe" className="w-full h-full object-cover" />
        </div>
        
        <div className="absolute top-10 left-4 opacity-10 text-black">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
            </svg>
        </div>

      </div>
    </div>
  );
};