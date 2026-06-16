export interface CakeItem {
  id: string;
  title: string;
  category: 'Cakes' | 'Cupcakes' | 'Floral' | 'Wedding' | 'Birthday' | 'Special Occasion';
  image: string;
  description: string;
  basePrice: number;
  servings: string;
  details: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  eventType: string;
  rating: number;
  text: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
