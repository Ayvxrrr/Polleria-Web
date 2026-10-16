import { Flame, Home, MapPin, ShoppingBag, Tag, UtensilsCrossed } from 'lucide-react';
import { AppLink } from './AppLink.tsx';

interface MobileBottomNavProps { currentView: string; onNavigate: (view: string) => void; cartCount: number; onOpenCart: () => void; }

const links = [{ id: 'inicio', label: 'Inicio', icon: Home }, { id: 'carta-menu', label: 'Carta', icon: UtensilsCrossed }, { id: 'promociones', label: 'Promos', icon: Tag }, { id: 'parrillas-carnes', label: 'Parrillas', icon: Flame }, { id: 'ubicacion-delivery', label: 'Visítanos', icon: MapPin }];

export function MobileBottomNav({ currentView, onNavigate, cartCount, onOpenCart }: MobileBottomNavProps) {
  return <nav className="mobile-bottom-nav" aria-label="Navegación móvil">
    {links.map(({ id, label, icon: Icon }) => <AppLink key={id} view={id} onNavigate={onNavigate} className={currentView === id ? 'is-active' : ''} aria-current={currentView === id ? 'page' : undefined}><Icon size={21} /><span>{label}</span></AppLink>)}
    <button onClick={onOpenCart} aria-label={`Mi pedido, ${cartCount} productos`}><span className="bottom-cart-icon"><ShoppingBag size={21} />{cartCount > 0 && <b>{cartCount}</b>}</span><span>Pedido</span></button>
  </nav>;
}
