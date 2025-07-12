import React, { useState, useEffect, useRef } from 'react';
import { Message } from './types/chat';
import ChatBubble from './components/ChatBubble';
import TypingIndicator from './components/TypingIndicator';
import { sendMessage } from './services/chatService';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const botResponse = await sendMessage(userMessage.content);
      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      setIsTyping(false);
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleButtonClick = (action: string) => {
    console.log('Button clicked:', action);
    // Here you can implement specific actions based on the button clicked
    setInputValue(`Tell me more about ${action.replace('_', ' ')}`);
    inputRef.current?.focus();
  };

  const handleTryNow = (imageId: string) => {
    console.log('Try Now clicked for image:', imageId);
    // Here you can implement specific actions for the image
    setInputValue(`I want to try this design approach`);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sf">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <button className="p-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded bg-chat-blue flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <span className="font-sf font-semibold text-[17px] text-chat-text">Myuze</span>
        </div>
        
        <button className="p-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-8">
              <h1 className="text-[28px] font-sf font-semibold text-chat-text mb-2">
                How can I help you today? 👋
              </h1>
              <p className="text-[17px] font-sf text-chat-secondary">
                Ask me anything...
              </p>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            onButtonClick={handleButtonClick}
            onTryNow={handleTryNow}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-white border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <button className="p-2 text-chat-secondary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21,15 16,10 5,21"></polyline>
            </svg>
          </button>
          
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              placeholder="Ask me anything..."
              className="w-full px-4 py-3 bg-chat-gray rounded-full text-[17px] font-sf placeholder-chat-secondary focus:outline-none focus:ring-2 focus:ring-chat-blue focus:ring-opacity-50 disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
              </svg>
            </button>
          </div>
          
          <button className="p-2 text-chat-secondary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-around py-2 bg-white border-t border-gray-100">
        <button className="flex flex-col items-center py-2 px-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-chat-blue">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span className="text-[10px] font-sf text-chat-blue mt-1">Home</span>
        </button>
        
        <button className="flex flex-col items-center py-2 px-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-chat-secondary">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10,9 9,9 8,9"></polyline>
          </svg>
          <span className="text-[10px] font-sf text-chat-secondary mt-1">Library</span>
        </button>
        
        <button className="flex flex-col items-center py-2 px-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-chat-secondary">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span className="text-[10px] font-sf text-chat-secondary mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
}

export default App;