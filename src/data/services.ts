export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'treatment' | 'vitamin_d' | 'product';
  duration?: string;
}

export const treatments: Service[] = [
  {
    id: 'colon-care',
    name: 'Colon Care Hydrotherapy (Ukuchatha)',
    price: 500,
    description: 'A gentle, thorough cleansing of the colon using warm water to remove toxins and promote digestive health.',
    category: 'treatment',
    duration: '60 min',
  },
  {
    id: 'ionic-foot-detox',
    name: 'Ionic Foot Detox',
    price: 280,
    description: 'Rebalance and energise your body through ionised water foot bath that draws out impurities through the feet.',
    category: 'treatment',
    duration: '30 min',
  },
  {
    id: 'infrared-therapy',
    name: 'Infrared Therapy',
    price: 350,
    description: 'Deep penetrating infrared heat promotes circulation, relieves pain, and accelerates cellular regeneration.',
    category: 'treatment',
    duration: '45 min',
  },
  {
    id: 'ozone-therapy',
    name: 'Ozone Therapy',
    price: 400,
    description: 'Harness the healing power of ozone to oxygenate the body, eliminate pathogens, and boost immunity.',
    category: 'treatment',
    duration: '45 min',
  },
  {
    id: 'quantum-testing',
    name: 'Quantum Magnetic Resonance Testing',
    price: 200,
    description: 'Non-invasive full-body health assessment using quantum resonance technology to identify imbalances.',
    category: 'treatment',
    duration: '30 min',
  },
];

export const vitaminD: Service[] = [
  {
    id: 'skin-glow',
    name: 'Skin Glow',
    price: 690,
    description: 'A radiance-boosting vitamin D formulation enriched with skin-nourishing co-factors for a luminous complexion.',
    category: 'vitamin_d',
  },
  {
    id: 'energy-boost',
    name: 'Energy Boost',
    price: 690,
    description: 'Revitalising vitamin D blend combined with energising nutrients to combat fatigue and restore vitality.',
    category: 'vitamin_d',
  },
  {
    id: 'immune-boost',
    name: 'Immune Boost',
    price: 650,
    description: 'Fortify your natural defences with our targeted vitamin D and immune-supportive nutrient complex.',
    category: 'vitamin_d',
  },
  {
    id: 'jet-fuel',
    name: 'All In One Jet Fuel',
    price: 1150,
    description: 'Our ultimate comprehensive vitamin D formulation — the complete wellness solution in a single powerful dose.',
    category: 'vitamin_d',
  },
];

export const products: Service[] = [
  {
    id: 'liquid-chlorophyll',
    name: 'Shake Off Liquid Chlorophyll (Splina)',
    price: 700,
    description: 'Premium liquid chlorophyll supplement for internal cleansing, alkalising, and natural detoxification.',
    category: 'product',
  },
  {
    id: 'icoffee-lamadoda',
    name: 'iCoffee Lamadoda (Troika)',
    price: 350,
    description: "A specially formulated coffee blend designed for men's wellness, vitality, and stamina.",
    category: 'product',
  },
  {
    id: 'icoffee-labesifazane',
    name: 'iCoffee Labesifazane (Troikana)',
    price: 350,
    description: "A specially formulated coffee blend designed for women's wellness, hormonal balance, and energy.",
    category: 'product',
  },
  {
    id: 'edmark-products',
    name: 'Other Edmark Products',
    price: 0,
    description: 'We carry a wide range of premium Edmark wellness products. Contact us or visit a branch for the full catalogue.',
    category: 'product',
  },
];

export const allServices: Service[] = [...treatments, ...vitaminD, ...products];
