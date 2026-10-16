export type MenuCategory = 
  | 'all'
  | 'combos'
  | 'pollos'
  | 'mostritos'
  | 'piques'
  | 'chifa'
  | 'ensaladas'
  | 'porciones'
  | 'bebidas'
  | 'licores';

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: MenuCategory;
  categoryLabel: string;
  badge?: string;
  image?: string;
  section?: 'Sopas' | 'Chaufa' | 'Aeropuertos' | 'Tortillas';
  tags?: string[];
  taperCount?: number;
  isPopular?: boolean;
  isOffer?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export type DeliveryMode = 'delivery' | 'pickup';

export type PaymentMethod = 'yape' | 'plin' | 'tarjeta' | 'efectivo';

export interface OrderDetails {
  customerName: string;
  phone: string;
  deliveryMode: DeliveryMode;
  address: string;
  reference?: string;
  zone?: string;
  paymentMethod: PaymentMethod;
  cashAmount?: number;
  orderNotes?: string;
}
