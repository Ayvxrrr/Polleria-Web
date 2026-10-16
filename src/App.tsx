import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { Header } from './components/Header.tsx';
import { MobileBottomNav } from './components/MobileBottomNav.tsx';
import { FloatingCartBar } from './components/FloatingCartBar.tsx';
import { CartModal } from './components/CartModal.tsx';
import { Footer } from './components/Footer.tsx';
import { AssistantChat } from './components/AssistantChat.tsx';
import { HomeView } from './components/views/HomeView.tsx';
import { MenuView } from './components/views/MenuView.tsx';
import { PromosView } from './components/views/PromosView.tsx';
import { ParrillasView } from './components/views/ParrillasView.tsx';
import { LocationView } from './components/views/LocationView.tsx';
import { MENU_ITEMS } from './data/menu.ts';
import { getRoute, getRouteUrl, getViewFromPath } from './data/routes.ts';
import { calculateSubtotal, calculateTotalCount } from './utils/cart.ts';
import type { CartItem, MenuItem } from './types/index.ts';

const CART_STORAGE_KEY = 'el-tonito-cart-v1';

function restoreCart(): CartItem[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    if (!Array.isArray(saved)) return [];
    const seen = new Set<string>();
    return saved.slice(0, MENU_ITEMS.length).flatMap(entry => {
      const item = MENU_ITEMS.find(dish => dish.id === entry?.id);
      if (!item || seen.has(item.id) || !Number.isInteger(entry.quantity) || entry.quantity < 1 || entry.quantity > 99) return [];
      seen.add(item.id);
      return [{ item, quantity: entry.quantity }];
    });
  } catch { return []; }
}

export default function App() {
  const [location, setLocation] = useState(() => ({ view: getViewFromPath(window.location.pathname), search: window.location.search }));
  const [cart, setCart] = useState<CartItem[]>(restoreCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const reduced = useReducedMotion();
  const currentView = location.view;

  const navigate = useCallback((view: string) => {
    const url = getRouteUrl(view);
    if (url === `${window.location.pathname}${window.location.search}`) return;
    window.history.pushState({}, '', url);
    setLocation({ view: getRoute(view).id, search: window.location.search });
  }, []);

  useEffect(() => {
    const onPop = () => setLocation({ view: getViewFromPath(window.location.pathname), search: window.location.search });
    window.addEventListener('popstate', onPop);
    return () => { window.removeEventListener('popstate', onPop); clearTimeout(toastTimer.current); };
  }, []);

  useEffect(() => {
    const route = getRoute(currentView);
    document.title = `${route.title} | Pollería El Toñito`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', route.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', route.description);
    if (firstRender.current) { firstRender.current = false; return; }
    window.scrollTo({ top: 0, behavior: 'instant' });
    mainRef.current?.focus({ preventScroll: true });
  }, [location]);

  useEffect(() => {
    try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.map(({ item, quantity }) => ({ id: item.id, quantity })))); } catch { /* El pedido sigue disponible en memoria si el almacenamiento está bloqueado. */ }
  }, [cart]);

  const addToCart = (item: MenuItem) => {
    setCart(previous => {
      const existing = previous.find(entry => entry.item.id === item.id);
      return existing ? previous.map(entry => entry.item.id === item.id ? { ...entry, quantity: Math.min(99, entry.quantity + 1) } : entry) : [...previous, { item, quantity: 1 }];
    });
    clearTimeout(toastTimer.current); setToast(`${item.title} agregado a tu pedido`);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };
  const updateQuantity = (id: string, delta: number) => setCart(previous => previous.map(entry => entry.item.id === id ? { ...entry, quantity: Math.min(99, entry.quantity + delta) } : entry).filter(entry => entry.quantity > 0));
  const cartQuantities = useMemo(() => Object.fromEntries(cart.map(entry => [entry.item.id, entry.quantity])), [cart]);
  const totalCount = calculateTotalCount(cart);
  const openCart = () => { setAssistantOpen(false); setIsCartOpen(true); };
  const openAssistant = () => { setIsCartOpen(false); setAssistantOpen(true); };
  const dishProps = { onAddToCart: addToCart, onUpdateQuantity: updateQuantity, cartQuantities };

  return <MotionConfig reducedMotion="user"><div className="site-shell">
    <a href="#main-content" className="skip-link">Saltar al contenido</a>
    <Header currentView={currentView} onNavigate={navigate} cartCount={totalCount} onOpenCart={openCart} />
    <main id="main-content" className="main-content" tabIndex={-1} ref={mainRef}>
      <AnimatePresence mode="wait" initial={false}><motion.div key={`${currentView}${location.search}`} initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: reduced ? 0 : 0.18 }}>
        {currentView === 'inicio' && <HomeView {...dishProps} onNavigate={navigate} onOpenAssistant={openAssistant} />}
        {currentView === 'carta-menu' && <MenuView {...dishProps} initialCategory={new URLSearchParams(location.search).get('categoria') || 'all'} />}
        {currentView === 'promociones' && <PromosView {...dishProps} />}
        {currentView === 'parrillas-carnes' && <ParrillasView {...dishProps} />}
        {currentView === 'ubicacion-delivery' && <LocationView />}
      </motion.div></AnimatePresence>
    </main>
    <Footer onNavigate={navigate} />
    {!isCartOpen && !assistantOpen && <FloatingCartBar totalCount={totalCount} totalAmount={calculateSubtotal(cart)} onOpenCart={openCart} />}
    <MobileBottomNav currentView={currentView} onNavigate={navigate} cartCount={totalCount} onOpenCart={openCart} />
    <AssistantChat open={assistantOpen} onOpen={openAssistant} onClose={() => setAssistantOpen(false)} cartVisible={totalCount > 0} hidden={isCartOpen} />
    <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onUpdateQuantity={updateQuantity} onRemoveItem={id => setCart(previous => previous.filter(entry => entry.item.id !== id))} onClearCart={() => setCart([])} />
    <AnimatePresence>{toast && <motion.div className="toast" role="status" aria-live="polite" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}><span><Check size={17} /></span><p>{toast}</p><button onClick={() => setToast(null)} aria-label="Cerrar notificación"><X size={16} /></button></motion.div>}</AnimatePresence>
  </div></MotionConfig>;
}
