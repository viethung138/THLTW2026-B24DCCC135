import { Destination, DestinationType } from "../types";

export const data: Destination[] = [
  {
    id: "1",
    name: "Đà Nẵng",
    type: "beach",
    description: "Bãi biển đẹp, đồ ăn tươi ngon và nhiều hoạt động giải trí.",
    price: 420,
    rating: 4.8,
    visitDuration: 8,
    travelTime: 1,
    foodCost: 120,
    lodgingCost: 200,
    transportCost: 100,
    image: "https://a.cdn-hotels.com/gdcs/production126/d1337/a4fd6b39-16b6-4230-bcf1-155a0d9a72c1.jpg",
  },
  {
    id: "2",
    name: "Sapa",
    type: "mountain",
    description: "Thung lũng mờ sương, ruộng bậc thang và văn hóa dân tộc truyền thống.",
    price: 360,
    rating: 4.7,
    visitDuration: 10,
    travelTime: 3,
    foodCost: 100,
    lodgingCost: 180,
    transportCost: 80,
    image: "https://tse2.mm.bing.net/th/id/OIP.OKy4o4x3aNHuJRfHIGqrowHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "3",
    name: "Hà Nội",
    type: "city",
    description: "Thủ đô cổ kính với ẩm thực đường phố và các điểm tham quan lịch sử.",
    price: 320,
    rating: 4.5,
    visitDuration: 6,
    travelTime: 2,
    foodCost: 110,
    lodgingCost: 150,
    transportCost: 60,
    image: "https://lp-cms-production.imgix.net/2019-06/90648603.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
  },
  {
    id: "4",
    name: "Phú Quốc",
    type: "beach",
    description: "Hòn đảo nhiệt đới với biển trong xanh và resort cao cấp.",
    price: 520,
    rating: 4.9,
    visitDuration: 9,
    travelTime: 2,
    foodCost: 160,
    lodgingCost: 250,
    transportCost: 110,
    image: "https://blog.premierresidencesphuquoc.com/wp-content/uploads/2024/12/phu-quoc-in-february-16.webp",
  },
  {
    id: "5",
    name: "Ninh Bình",
    type: "mountain",
    description: "Cảnh quan thiên nhiên yên bình với đầm hồ và cố đô Tràng An.",
    price: 280,
    rating: 4.6,
    visitDuration: 7,
    travelTime: 2,
    foodCost: 90,
    lodgingCost: 140,
    transportCost: 50,
    image: "https://hanoibylocals.com/wp-content/uploads/2024/02/trang-an-ninh-binh-1.jpg",
  },
  {
    id: "6",
    name: "Hội An",
    type: "city",
    description: "Phố cổ rực rỡ đèn lồng, đồ ăn ngon và nhiều trải nghiệm văn hóa.",
    price: 300,
    rating: 4.7,
    visitDuration: 6,
    travelTime: 1,
    foodCost: 100,
    lodgingCost: 150,
    transportCost: 50,
    image: "https://th.bing.com/th/id/R.d793262b76d7be554eb7d74a03d75e0b?rik=OnAnK4pYfpBmCg&riu=http%3a%2f%2fadmin.vn-tourism.com%2fIMAGE_MANAGER_CACHE_PATH%2ffb%2ffbfa29_hoi-an-t.jpg&ehk=jG6mRmbuMyznTLCZAstWlVv7Fc8pSszhp2Xt7LO1nhA%3d&risl=&pid=ImgRaw&r=0",
  },
];

export const typeLabels: Record<DestinationType, string> = {
  beach: "Biển",
  mountain: "Núi",
  city: "Thành phố",
};

export const filterByType = (list: Destination[], type: string) => {
  if (!type) return list;
  return list.filter((d) => d.type === type);
};

export const filterByPriceRange = (list: Destination[], range: string) => {
  if (range === "low") return list.filter((destination) => destination.price <= 300);
  if (range === "medium") return list.filter((destination) => destination.price <= 450 && destination.price > 300);
  if (range === "high") return list.filter((destination) => destination.price > 450);
  return list;
};

export const sortByField = (list: Destination[], field: string) => {
  return [...list].sort((a, b) => {
    if (field === "rating") return b.rating - a.rating;
    if (field === "price") return a.price - b.price;
    return a.name.localeCompare(b.name);
  });
};

export const monthlySchedules = [
  { month: "Tháng 1", count: 14 },
  { month: "Tháng 2", count: 24 },
  { month: "Tháng 3", count: 18 },
  { month: "Tháng 4", count: 28 },
  { month: "Tháng 5", count: 32 },
  { month: "Tháng 6", count: 26 },
];