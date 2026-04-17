export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Men' | 'Women' | 'Perfumes';
  description: string;
  image: string;
  secondaryImage?: string;
  tags?: string[];
  isNew?: boolean;
}

export const PRODUCTS: Product[] = [
  // Men
  {
    id: 'm1',
    name: 'Noir Heritage Coat',
    price: 850,
    category: 'Men',
    description: 'Precision-tailored wool blend coat for the modern gentleman.',
    image: 'https://picsum.photos/seed/m1/800/1200',
    secondaryImage: 'https://picsum.photos/seed/m1-s/800/1200',
    isNew: true,
  },
  {
    id: 'm2',
    name: 'Silk Blend Shirt',
    price: 240,
    category: 'Men',
    description: 'Breathtaking silk blend in a deep onyx weave.',
    image: 'https://picsum.photos/seed/m2/800/1200',
    secondaryImage: 'https://picsum.photos/seed/m2-s/800/1200',
  },
  {
    id: 'm3',
    name: 'Stealth Knit Sweater',
    price: 320,
    category: 'Men',
    description: 'Premium merino wool knit with technical paneling.',
    image: 'https://picsum.photos/seed/m3/800/1200',
    secondaryImage: 'https://picsum.photos/seed/m3-s/800/1200',
  },
  // Women
  {
    id: 'w1',
    name: 'Luminous Silk Gown',
    price: 1200,
    category: 'Women',
    description: 'Ethically sourced silk that drapes like liquid gold.',
    image: 'https://picsum.photos/seed/w1/800/1200',
    secondaryImage: 'https://picsum.photos/seed/w1-s/800/1200',
    isNew: true,
  },
  {
    id: 'w2',
    name: 'Architectural Blazer',
    price: 680,
    category: 'Women',
    description: 'Sharp shoulders meet refined tailoring in this evening essential.',
    image: 'https://picsum.photos/seed/w2/800/1200',
    secondaryImage: 'https://picsum.photos/seed/w2-s/800/1200',
  },
  {
    id: 'w3',
    name: 'Draped Satin Trousers',
    price: 450,
    category: 'Women',
    description: 'Effortless luxury with a fluid silhouette.',
    image: 'https://picsum.photos/seed/w3/800/1200',
    secondaryImage: 'https://picsum.photos/seed/w3-s/800/1200',
  },
  // Perfumes
  {
    id: 'p1',
    name: 'Ether No. 7',
    price: 180,
    category: 'Perfumes',
    description: 'A crisp, magnetic scent with notes of citrus and oud.',
    image: 'https://picsum.photos/seed/p1/800/1200',
    secondaryImage: 'https://picsum.photos/seed/p1-s/800/1200',
    isNew: true,
  },
  {
    id: 'p2',
    name: 'Amber Midnight',
    price: 210,
    category: 'Perfumes',
    description: 'Sultry, smoky amber paired with rare Bulgarian rose.',
    image: 'https://picsum.photos/seed/p2/800/1200',
    secondaryImage: 'https://picsum.photos/seed/p2-s/800/1200',
  },
  {
    id: 'p3',
    name: 'Velvet Moss',
    price: 165,
    category: 'Perfumes',
    description: 'Earthy, green notes captured in an artisanal crystal bottle.',
    image: 'https://picsum.photos/seed/p3/800/1200',
    secondaryImage: 'https://picsum.photos/seed/p3-s/800/1200',
  },
];
