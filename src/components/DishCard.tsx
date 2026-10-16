import { Coffee, Minus, Plus, Salad, Soup, UtensilsCrossed, Wine } from 'lucide-react';
import { useState } from 'react';
import type { MenuItem } from '../types/index.ts';
import { formatSoles } from '../utils/cart.ts';

interface DishCardProps { item: MenuItem; quantityInCart: number; onAddToCart: (item: MenuItem) => void; onUpdateQuantity: (id: string, delta: number) => void; }

export function DishCard({ item, quantityInCart, onAddToCart, onUpdateQuantity }: DishCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const PlaceholderIcon = item.category === 'bebidas' ? Coffee : item.category === 'licores' ? Wine : item.category === 'ensaladas' ? Salad : item.category === 'chifa' ? Soup : UtensilsCrossed;
  return <article className={`dish-card ${quantityInCart ? 'is-selected' : ''}`} data-testid={`dish-card-${item.id}`}>
    <div className="dish-image">
      {!item.image || imageFailed ? <div className="dish-image-fallback"><PlaceholderIcon size={42} /><span>{item.section || item.categoryLabel}</span></div> : <img src={item.image} alt={item.title} loading="lazy" decoding="async" onError={() => setImageFailed(true)} />}
      {item.badge && <span className={`dish-badge ${item.isOffer ? 'is-offer' : ''}`}>{item.badge}</span>}
    </div>
    <div className="dish-body"><span className="dish-category">{item.section || item.categoryLabel}</span><h3>{item.title}</h3><p>{item.description}</p>
      <div className="dish-bottom"><div className="dish-price"><strong>{formatSoles(item.price)}</strong></div>
        {quantityInCart > 0 ? <div className="quantity-control"><button onClick={() => onUpdateQuantity(item.id, -1)} aria-label={`Disminuir ${item.title}`}><Minus size={16} /></button><span aria-live="polite">{quantityInCart}</span><button onClick={() => onUpdateQuantity(item.id, 1)} disabled={quantityInCart >= 99} aria-label={`Aumentar ${item.title}`}><Plus size={16} /></button></div> : <button className="add-dish" onClick={() => onAddToCart(item)} aria-label={`Agregar ${item.title} al pedido`}><Plus size={18} /><span>Agregar</span></button>}
      </div>
    </div>
  </article>;
}
