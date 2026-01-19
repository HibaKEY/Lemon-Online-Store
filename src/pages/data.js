export const products = [
  {
    slug: 'clementine-nour',
    title: 'Clementine Nour',
    price: 14.0,
    oldPrice: 18.0,
    rating: 4.8,
    reviews: 245,
    sku: 'CL-NOUR-2025',
    tags: ['Agrume', 'Clementine', 'Fruits'],
    images: [
      '/clementine/nour.png',
      '/clementine/bekria.png',
      '/clementine/guerdane.png',
    ],
    description:
      'Variété tardive, très appréciée pour son goût sucré et son excellente conservation. Récoltée de janvier à mars.',
  },
  {
    slug: 'clementine-bekria',
    title: 'Clementine Bekria',
    price: 12.0,
    oldPrice: 15.0,
    rating: 4.6,
    reviews: 124,
    sku: 'CL-BEK-2025',
    tags: ['Agrume', 'Clementine'],
    images: [
      '/clementine/bekria.png',
      '/clementine/nour.png',
      '/clementine/guerdane.png',
    ],
    description:
      'Variété précoce, peau fine et goût doux. Idéale pour le marché local et l’export.',
  },
  {
    slug: 'clementine-guerdane',
    title: 'Clementine Guerdane',
    price: 13.5,
    oldPrice: 16.0,
    rating: 4.4,
    reviews: 98,
    sku: 'CL-GUE-2025',
    tags: ['Agrume', 'Clementine'],
    images: [
      '/clementine/guerdane.png',
      '/clementine/bekria.png',
      '/clementine/nour.png',
    ],
    description:
      'Mi-saison, équilibre entre sucre et acidité.',
  },
];

export const getProductBySlug = (slug) =>
  products.find((p) => p.slug === slug);
