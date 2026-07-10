// Base de datos simulada de equipamiento técnico de montaña, escalada y camping.

export const CATEGORIES = {
  CAMPING: 'Camping',
  ESCALADA: 'Escalada',
  ROPA: 'Indumentaria',
  CALZADO: 'Calzado'
};

export const PRODUCT_DATABASE = [
  {
    id: 'prod-1',
    name: 'Carpa Alta Montaña "Apex Pro"',
    category: CATEGORIES.CAMPING,
    price: 289.99,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80',
    description: 'Carpa técnica para 3 estaciones, resistente a vientos de hasta 80km/h. Ultra liviana y de montaje rápido.',
    specs: ['Capacidad: 2 personas', 'Peso: 2.1 kg', 'Impermeabilidad: 5000mm columna de agua'],
    stock: 5
  },
  {
    id: 'prod-2',
    name: 'Arnés de Escalada "Gravity Zero"',
    category: CATEGORIES.ESCALADA,
    price: 85.50,
    rating: 4.9,
    reviews: 88,
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80',
    description: 'Arnés ergonómico regulable para escalada deportiva y clásica. Reparto de carga óptimo y acolchado transpirable.',
    specs: ['4 portamateriales moldeados', 'Hebillas rápidas de aluminio', 'Certificación CE EN 12277'],
    stock: 8
  },
  {
    id: 'prod-3',
    name: 'Saco de Dormir Pluma "T-Limit -15°C"',
    category: CATEGORIES.CAMPING,
    price: 199.00,
    rating: 4.7,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80',
    description: 'Saco de dormir tipo momia con relleno de pluma de ganso de alta calidad. Compactación extrema.',
    specs: ['Temperatura de confort: -5°C', 'Límite: -15°C', 'Peso: 1.2 kg'],
    stock: 3
  },
  {
    id: 'prod-4',
    name: 'Cuerda Dinámica "Vortex" 10.2mm - 60m',
    category: CATEGORIES.ESCALADA,
    price: 165.00,
    rating: 4.9,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1564758564527-b97d79cd27c1?auto=format&fit=crop&w=600&q=80',
    description: 'Cuerda simple dinámica con tratamiento hidrófugo integral. Excelente manejo y resistencia a la abrasión.',
    specs: ['Longitud: 60 metros', 'Fuerza de choque: 8.4 kN', 'Porcentaje de funda: 38%'],
    stock: 12
  },
  {
    id: 'prod-5',
    name: 'Bota de Trekking Impermeable "Pathfinder"',
    category: CATEGORIES.CALZADO,
    price: 145.00,
    rating: 4.6,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80',
    description: 'Calzado de caña media con membrana impermeable y suela Vibram de alto agarre para terrenos mixtos.',
    specs: ['Membrana impermeable/respirable', 'Suela Vibram Megagrip', 'Protección de goma perimetral'],
    stock: 7
  },
  {
    id: 'prod-6',
    name: 'Chaqueta Cortaviento Térmica "StormShield"',
    category: CATEGORIES.ROPA,
    price: 120.00,
    rating: 4.5,
    reviews: 73,
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80',
    description: 'Chaqueta técnica de triple capa con costuras termoselladas, ideal para condiciones de lluvia extrema y viento.',
    specs: ['Material: GORE-TEX Active', 'Peso: 380g', 'Capucha compatible con casco'],
    stock: 10
  }
  ];