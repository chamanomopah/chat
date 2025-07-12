import React from 'react';
import { ButtonOption as ButtonOptionType } from '../types/chat';

interface ButtonOptionProps {
  button: ButtonOptionType;
  onClick: () => void;
}

const ButtonOption: React.FC<ButtonOptionProps> = ({ button, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-2 bg-chat-gray text-chat-text rounded-lg text-[15px] font-sf font-medium hover:bg-gray-200 transition-colors duration-200 text-left"
    >
      {button.text}
    </button>
  );
};

export default ButtonOption;