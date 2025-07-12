import { Message, ButtonOption, ImageGalleryItem } from '../types/chat';

// Simulated responses from the bot
const botResponses = [
  {
    content: "I can help you with various tasks! Here are some things I can do:",
    buttons: [
      { id: '1', text: 'Generate visuals', action: 'generate_visuals' },
      { id: '2', text: 'Answer questions', action: 'answer_questions' },
      { id: '3', text: 'Help with coding', action: 'help_coding' },
    ]
  },
  {
    content: "Here are some visual examples I can create for you:",
    gallery: [
      {
        id: '1',
        url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Modern UI Design',
        description: 'Clean and minimal interface design'
      },
      {
        id: '2',
        url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Data Visualization',
        description: 'Interactive charts and graphs'
      },
      {
        id: '3',
        url: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Mobile App Design',
        description: 'Responsive mobile interfaces'
      },
      {
        id: '4',
        url: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Web Development',
        description: 'Modern web applications'
      }
    ]
  },
  {
    content: "I'm here to help! Feel free to ask me anything about design, development, or any other topic you're curious about.",
  }
];

export const sendMessage = async (userMessage: string): Promise<Message> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Select a random response or create a contextual one
  let response;
  
  if (userMessage.toLowerCase().includes('visual') || userMessage.toLowerCase().includes('image') || userMessage.toLowerCase().includes('design')) {
    response = botResponses[1]; // Response with gallery
  } else if (userMessage.toLowerCase().includes('help') || userMessage.toLowerCase().includes('what')) {
    response = botResponses[0]; // Response with buttons
  } else {
    response = botResponses[2]; // Simple text response
  }
  
  return {
    id: Date.now().toString(),
    type: 'bot',
    content: response.content,
    timestamp: new Date(),
    buttons: response.buttons,
    gallery: response.gallery,
  };
};