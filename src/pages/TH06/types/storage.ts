// Interface dùng chung cho toàn app
export interface Destination {
  id: number;
  name: string;
  image: string;
  type: "bien" | "nui" | "thanhpho";
  rating: number;
  price: number;
  cost: {
    food: number;
    hotel: number;
    transport: number;
  };
}