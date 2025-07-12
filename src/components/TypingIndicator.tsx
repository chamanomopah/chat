import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end">
        <div className="w-8 h-8 rounded-full bg-chat-gray flex items-center justify-center mr-2 mb-1 flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <span className="text-xs font-semibold text-chat-blue">M</span>
          </div>
        </div>
        
        <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border border-gray-100">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-chat-secondary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-chat-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-chat-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;