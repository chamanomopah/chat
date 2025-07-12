import React from 'react';
import { Message } from '../types/chat';
import ButtonOption from './ButtonOption';
import ImageGallery from './ImageGallery';

interface ChatBubbleProps {
  message: Message;
  onButtonClick: (action: string) => void;
  onTryNow: (imageId: string) => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onButtonClick, onTryNow }) => {
  const isUser = message.type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[85%]`}>
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-chat-gray flex items-center justify-center mr-2 mb-1 flex-shrink-0">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <span className="text-xs font-semibold text-chat-blue">M</span>
            </div>
          </div>
        )}
        
        <div className="flex flex-col">
          <div
            className={`px-4 py-3 rounded-2xl ${
              isUser
                ? 'bg-chat-blue text-white rounded-br-md'
                : 'bg-white text-chat-text rounded-bl-md border border-gray-100'
            }`}
          >
            <p className="text-[15px] leading-[20px] font-sf">{message.content}</p>
            
            {message.buttons && message.buttons.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.buttons.map((button) => (
                  <ButtonOption
                    key={button.id}
                    button={button}
                    onClick={() => onButtonClick(button.action)}
                  />
                ))}
              </div>
            )}
          </div>
          
          {message.gallery && message.gallery.length > 0 && (
            <div className="mt-2">
              <ImageGallery
                images={message.gallery}
                onTryNow={onTryNow}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;