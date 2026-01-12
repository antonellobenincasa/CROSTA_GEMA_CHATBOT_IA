import React from 'react';
import { ChatMessage, Sender } from '../types';
import ReactMarkdown from 'react-markdown';
import { BRAND_LOGO } from '../constants';

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isBot = message.sender === Sender.BOT;

  return (
    <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in-up`}>
      <div className={`flex max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center overflow-hidden border-2 ${isBot ? 'border-crosta-orange mr-2' : 'border-gray-300 ml-2 bg-gray-200'}`}>
           {isBot ? (
               <img src={BRAND_LOGO} alt="Bot Avatar" className="h-full w-full object-cover" /> 
           ) : (
               <span className="text-gray-500 text-sm">Yo</span>
           )}
        </div>

        {/* Bubble */}
        <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed overflow-hidden ${
            isBot 
            ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100' 
            : 'bg-crosta-orange text-white rounded-tr-none'
        }`}>
            {message.image && (
                <img src={`data:image/jpeg;base64,${message.image}`} alt="Sent content" className="mb-2 rounded-lg max-w-full h-auto border border-white/20" />
            )}
            <div className="prose prose-sm max-w-none dark:prose-invert">
                 {/* Render markdown for structured bot responses (lists, bolds) */}
                 <ReactMarkdown 
                    components={{
                        p: ({node, ...props}) => <p className={`mb-1 ${isBot ? 'text-gray-800' : 'text-white'}`} {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                        a: ({node, ...props}) => <a className={`underline font-semibold ${isBot ? 'text-crosta-orange hover:text-orange-700' : 'text-white hover:text-gray-200'}`} target="_blank" rel="noopener noreferrer" {...props} />,
                        img: ({node, ...props}) => <img className="rounded-lg my-2 border border-gray-200 max-h-60 object-cover" {...props} />
                    }}
                 >
                     {message.text}
                 </ReactMarkdown>
            </div>
            <span className={`text-[10px] block mt-1 opacity-70 ${isBot ? 'text-gray-400' : 'text-orange-100'}`}>
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
        </div>
      </div>
    </div>
  );
};