export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  buttons?: ButtonOption[];
  gallery?: ImageGalleryItem[];
}

export interface ButtonOption {
  id: string;
  text: string;
  action: string;
}

export interface ImageGalleryItem {
  id: string;
  url: string;
  title: string;
  description?: string;
}