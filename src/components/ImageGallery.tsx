import React from 'react';
import { ImageGalleryItem } from '../types/chat';

interface ImageGalleryProps {
  images: ImageGalleryItem[];
  onTryNow: (imageId: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onTryNow }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 mt-2">
      <div className="grid grid-cols-2 gap-3">
        {images.map((image) => (
          <div key={image.id} className="flex flex-col">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h4 className="text-[13px] font-sf font-medium text-chat-text mb-1 line-clamp-2">
              {image.title}
            </h4>
            {image.description && (
              <p className="text-[11px] font-sf text-chat-secondary mb-2 line-clamp-2">
                {image.description}
              </p>
            )}
            <button
              onClick={() => onTryNow(image.id)}
              className="w-full py-2 bg-chat-blue text-white rounded-lg text-[13px] font-sf font-medium hover:bg-blue-600 transition-colors duration-200"
            >
              Try Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;