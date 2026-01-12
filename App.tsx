import React, { useState, useEffect, useRef } from 'react';
import { initializeGenAI, sendMessageToGemini, getDeliveryZoneInfo } from './services/geminiService';
import { InputArea } from './components/InputArea';
import { ChatBubble } from './components/ChatBubble';
import { MenuModal } from './components/MenuModal';
import { HoursModal } from './components/HoursModal'; 
import { PaymentModal } from './components/PaymentModal'; // Import Payment Modal
import { ChatMessage, Sender } from './types';
import { WHATSAPP_NUMBER, MENU_IMAGES, BRAND_LOGO } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false); 
  const [showHoursModal, setShowHoursModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false); // State for Payment Modal
  const [mapInfo, setMapInfo] = useState<string>('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeGenAI();
    // Initial Greeting
    const initialMsg: ChatMessage = {
      id: 'init-1',
      text: "¡Hola! 👋 Soy PepesmashBOT de CROSTA. \n\n¿Tienes hambre? 🍔 Estoy aquí para tomar tu pedido o responder a tus dudas.\n\nRecuerda que somos **Delivery Only** (Dark Kitchen) en Guayaquil.",
      sender: Sender.BOT,
      timestamp: new Date()
    };
    
    // Offer Menu Message with interactive hint
    const menuMsg: ChatMessage = {
      id: 'init-2',
      text: `Te invito a revisar nuestro delicioso menú. 😋\n\nPuedes presionar el botón **📖 Menú** arriba para verlo con fotos y precios, o descargar las imágenes aquí:\n\n🍔 **[Menú Hamburguesas](${MENU_IMAGES.BURGERS})**\n\n🍟 **[Menú Papas](${MENU_IMAGES.PAPAS})**\n\n🥤 **[Menú Bebidas y Extras](${MENU_IMAGES.BEBIDAS})**`,
      sender: Sender.BOT,
      timestamp: new Date(Date.now() + 500) 
    };

    // Option Selection Message
    const optionsMsg: ChatMessage = {
      id: 'init-3',
      text: "Si deseas realizar tu pedido a domicilio **DELIVERY**, escribe **1**.\n\nSi deseas realizar tu pedido para recoger **PICK UP ORDER**, escribe **2**.\n\nO si tienes una pregunta solo hazla y te ayudo ! 👇",
      sender: Sender.BOT,
      timestamp: new Date(Date.now() + 1000)
    };

    setMessages([initialMsg, menuMsg, optionsMsg]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string, imageBase64?: string) => {
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: Sender.USER,
      timestamp: new Date(),
      image: imageBase64
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);
    setWhatsappLink(null); // Reset link on new interaction

    try {
      const responseText = await sendMessageToGemini(text, imageBase64);
      
      const newBotMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.BOT,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newBotMsg]);

      // Check if the bot indicates order is ready for WhatsApp
      if (responseText.includes("LISTO PARA WHATSAPP")) {
        // Create the link
        const encodedText = encodeURIComponent(responseText.replace("LISTO PARA WHATSAPP", ""));
        setWhatsappLink(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationCheck = async () => {
      setIsLoading(true);
      setShowMapModal(true);
      setMapInfo("Consultando cobertura...");
      
      // Attempt to get browser location, fallback if denied
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
              const info = await getDeliveryZoneInfo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              });
              setMapInfo(info);
              setIsLoading(false);
          }, async () => {
               // Location denied
               const info = await getDeliveryZoneInfo();
               setMapInfo(info);
               setIsLoading(false);
          });
      } else {
          const info = await getDeliveryZoneInfo();
          setMapInfo(info);
          setIsLoading(false);
      }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">
      
      {/* Header */}
      <header className="bg-crosta-orange p-3 flex flex-col gap-2 shadow-md z-10 text-white">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white p-1 overflow-hidden shadow-inner">
                    <img src={BRAND_LOGO} alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className="font-bold text-lg leading-tight">CROSTA</h1>
                    <p className="text-xs opacity-90">by Pepesmash • Delivery</p>
                </div>
            </div>
            
            {/* Map Button (Icon Only to save space) */}
            <button 
                onClick={handleLocationCheck}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                title="Ver cobertura"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
            </button>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2 justify-between">
             <button 
                onClick={() => setShowMenuModal(true)}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition text-xs font-semibold"
            >
                <span>📖</span>
                <span>Menú</span>
            </button>
            
            <button 
                onClick={() => setShowHoursModal(true)}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition text-xs font-semibold"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                </svg>
                <span>Horarios</span>
            </button>

            <button 
                onClick={() => setShowPaymentModal(true)}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition text-xs font-semibold"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                </svg>
                <span>Pagos</span>
            </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#f2f2f2] scroll-smooth no-scrollbar">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        
        {isLoading && (
           <div className="flex items-center gap-2 text-gray-400 text-sm ml-2 mb-4 animate-pulse">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              <span>PepeBot está pensando...</span>
           </div>
        )}

        {whatsappLink && (
            <div className="flex justify-center mb-6 animate-fade-in-up">
                <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transform hover:scale-105 transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
                    </svg>
                    Finalizar pedido en WhatsApp
                </a>
            </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />

      {/* Modals */}
      {showMenuModal && <MenuModal onClose={() => setShowMenuModal(false)} />}
      {showHoursModal && <HoursModal onClose={() => setShowHoursModal(false)} />}
      {showPaymentModal && <PaymentModal onClose={() => setShowPaymentModal(false)} />}

      {/* Maps Modal */}
      {showMapModal && (
          <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
                  <h3 className="text-xl font-bold mb-2 text-crosta-orange">Cobertura de Delivery</h3>
                  <div className="min-h-[100px] text-gray-700 mb-4 text-sm bg-gray-50 p-3 rounded">
                      {mapInfo ? mapInfo : "Cargando información..."}
                  </div>
                  <button 
                    onClick={() => setShowMapModal(false)}
                    className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold"
                  >
                      Cerrar
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default App;