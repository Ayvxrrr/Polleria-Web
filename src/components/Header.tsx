import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';
import { LOGO_URL, RESTAURANT_INFO } from '../data/menu.ts';
import { ROUTES } from '../data/routes.ts';
import { AppLink } from './AppLink.tsx';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export function Header({ currentView, onNavigate, cartCount, onOpenCart }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const measure = () => document.documentElement.style.setProperty('--header-height', `${header.offsetHeight + 1}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    measure();
    return () => { observer.disconnect(); document.documentElement.style.removeProperty('--header-height'); };
  }, []);
  return (
    <header className="site-header">
      <div className="container header-inner" ref={headerRef}>
        <AppLink view="inicio" onNavigate={onNavigate} className="brand" aria-label="El Toñito, ir al inicio">
          <img src={LOGO_URL} width="64" height="64" alt="Logo de Pollería El Toñito" />
          <span className="brand-wordmark"><small>POLLERÍA & PARRILLAS</small><strong>El Toñito<span>®</span></strong><em>EL SABOR QUE NOS REÚNE</em></span>
        </AppLink>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {ROUTES.map(route => <AppLink key={route.id} view={route.id} onNavigate={onNavigate} aria-current={currentView === route.id ? 'page' : undefined} className={`nav-link ${currentView === route.id ? 'is-active' : ''}`}>{route.label}{currentView === route.id && <motion.span layoutId="nav-indicator" className="nav-indicator" />}</AppLink>)}
        </nav>
        <div className="header-actions">
          <a className="btn btn-dark header-order" href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`} target="_blank" rel="noopener noreferrer">Pedir ahora <ArrowUpRight size={16} /></a>
          <button className="icon-button cart-trigger" onClick={onOpenCart} aria-label={`Abrir pedido, ${cartCount} productos`}><ShoppingBag size={21} />{cartCount > 0 && <span className="cart-count">{cartCount}</span>}</button>
        </div>
      </div>
    </header>
  );
}
