export type DestinationType = 'beach' | 'mountain' | 'city';

export type Destination = {
  id: string;
  name: string;
  type: DestinationType;
  description: string;
  price: number;
  rating: number;
  visitDuration: number; // hours
  travelTime: number; // hours from previous destination
  foodCost: number;
  lodgingCost: number;
  transportCost: number;
  image: string;
};