import { Check, Plus, Sparkles, Tag } from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../../data/menu.ts';
import type { MenuItem } from '../../types/index.ts';
import { formatSoles } from '../../utils/cart.ts';
import { DishCard } from '../DishCard.tsx';
import { SectionHeading } from '../SectionHeading.tsx';
import { Reveal } from '../Reveal.tsx';

interface PromosViewProps {
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  cartQuantities: Record<string, number>;
}

export function PromosView({ onAddToCart, onUpdateQuantity, cartQuantities }: PromosViewProps) {
  const star = MENU_ITEMS.find(item => item.id === 'oferta-clasica-irresistible')!;
  const promos = MENU_ITEMS.filter(item => item.id !== star.id && item.isOffer);

  return <div className="container page-content">
    <div className="page-heading">
      <span className="eyebrow"><Tag size={16} /> SI SE COMPARTE, SABE MEJOR</span>
      <h1>Más sabor.<br /><em>Mejor plan.</em></h1>
      <p>La excusa perfecta para reunir a tu gente. Tú pones el plan, nosotros el pollito.</p>
    </div>
    <Reveal className="promo-feature promo-page-feature">
      <div className="promo-feature-copy">
        <span className="eyebrow"><Sparkles size={16} /> LA CLÁSICA IRRESISTIBLE</span>
        <h2>LA MESA<br /><span>ESTÁ COMPLETA.</span></h2>
        <p>{star.description}</p>
        <div className="promo-inclusions">{['Pollo entero', 'Chaufa de pollo', 'Papas y ensalada', 'Pepsi 2L'].map(tag => <span key={tag}><Check size={14} /> {tag}</span>)}</div>
        <div className="promo-feature-action"><strong>{formatSoles(star.price)}</strong><button className="btn btn-dark" onClick={() => onAddToCart(star)}>Agregar combo <Plus size={18} /></button></div>
        <small className="fine-print">Táperes y envío aparte. Confirma disponibilidad.</small>
      </div>
      <div className="promo-feature-art"><img src="/images/promo-clasica.webp" alt="Promoción Clásica Irresistible, S/ 72" width="1080" height="1080" /></div>
    </Reveal>
    <section className="section-space">
      <SectionHeading eyebrow="QUE NO FALTE NADIE" title={<>Combos con <em>buena compañía.</em></>} />
      <div className="food-grid">{promos.map(item => <DishCard key={item.id} item={item} quantityInCart={cartQuantities[item.id] || 0} onAddToCart={onAddToCart} onUpdateQuantity={onUpdateQuantity} />)}</div>
      <p className="menu-disclaimer">{RESTAURANT_INFO.pricePolicy} Imágenes referenciales.</p>
    </section>
  </div>;
}
