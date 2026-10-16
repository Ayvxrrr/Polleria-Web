import { Flame, UtensilsCrossed } from 'lucide-react';
import { MENU_ITEMS } from '../../data/menu.ts';
import type { MenuItem } from '../../types/index.ts';
import { DishCard } from '../DishCard.tsx';
import { Reveal } from '../Reveal.tsx';

interface ParrillasViewProps { onAddToCart: (item: MenuItem) => void; onUpdateQuantity: (id: string, delta: number) => void; cartQuantities: Record<string, number>; }

export function ParrillasView({ onAddToCart, onUpdateQuantity, cartQuantities }: ParrillasViewProps) {
  const items = MENU_ITEMS.filter(item => item.category === 'piques' || item.id.startsWith('parrilla-') || /^combo-(lomo|chuleta|churrasco|filete|cuarto)/.test(item.id));
  return <div className="container page-content"><div className="grill-intro"><div className="page-heading"><span className="eyebrow"><Flame size={16} /> AQUÍ EL FUEGO TIENE SABOR</span><h1>Al punto.<br /><em>A las brasas.</em></h1><p>Anticuchitos, cortes jugosos y parrillas generosas. Para los que saben que un buen plan empieza alrededor de la mesa.</p></div><div className="grill-emblem" aria-hidden="true"><Flame size={68} strokeWidth={1} /><span>FUEGO LENTO<br />ANTOJO GRANDE</span><UtensilsCrossed size={25} /></div></div>
    <Reveal><div className="grill-note"><Flame size={22} /><p><strong>Elige tu punto de cocción.</strong> Añade tus preferencias en las indicaciones del pedido y confírmalas por WhatsApp.</p></div></Reveal><div className="food-grid">{items.map(item => <DishCard key={item.id} item={item} quantityInCart={cartQuantities[item.id] || 0} onAddToCart={onAddToCart} onUpdateQuantity={onUpdateQuantity} />)}</div><p className="menu-disclaimer">Imágenes referenciales. Confirma disponibilidad al realizar tu pedido.</p>
  </div>;
}
