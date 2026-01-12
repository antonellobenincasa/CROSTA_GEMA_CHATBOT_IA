import React, { useState, useRef } from 'react';

interface InputAreaProps {
  onSendMessage: (text: string, image?: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!text.trim() && !preview) || isLoading) return;

    // Strip the prefix of base64 to get just the data for the API
    const base64Data = preview ? preview.split(',')[1] : undefined;
    
    onSendMessage(text, base64Data);
    setText('');
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white p-4 border-t border-gray-200 sticky bottom-0 z-20">
      {preview && (
        <div className="mb-2 relative inline-block">
          <img src={preview} alt="Upload preview" className="h-20 w-auto rounded-lg border border-gray-300" />
          <button 
            onClick={() => { setPreview(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
          >
            ✕
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-crosta-orange transition-colors"
          title="Adjuntar comprobante"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tu pedido o duda..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-crosta-orange"
        />
        <button
          type="submit"
          disabled={isLoading || (!text && !preview)}
          className={`p-3 rounded-full text-white transition-colors ${isLoading || (!text && !preview) ? 'bg-gray-300' : 'bg-crosta-orange hover:bg-orange-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </form>
    </div>
  );
};
