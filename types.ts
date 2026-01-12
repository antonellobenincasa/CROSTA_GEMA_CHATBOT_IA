export enum Sender {
  USER = 'user',
  BOT = 'bot'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  image?: string; // Base64 string
  isReceipt?: boolean;
}

export interface GroundingMetadata {
  web?: { uri: string; title: string }[];
  maps?: { uri: string; title: string }[];
}

// Menu Interfaces
export interface MenuItem {
  name: string;
  price: string; // String to handle formatting like "$5.75" easily
  description?: string;
  isSpicy?: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
  imageLink: string; // Link to download/view the menu image for this category
}