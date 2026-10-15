import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { MobileBottomNav } from './components/MobileBottomNav.tsx';
import { FloatingCartBar } from './components/FloatingCartBar.tsx';
import { CartModal } from './components/CartModal.tsx';
import { Footer } from './components/Footer.tsx';
import { HomeView } from './components/views/HomeView.tsx';
import { MenuView } from './components/views/MenuView.tsx';
import { PromosView } from './components/views/PromosView.tsx';
import { ParrillasView } from './components/views/ParrillasView.tsx';
import { LocationView } from './components/views/LocationView.tsx';
import type { CartItem, MenuItem } from './types/index.ts';
import { calculateSubtotal, calculateTotalCount } from './utils/cart.ts';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('inicio');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`¡${item.title} añadido!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(i => {
          if (i.item.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter((i): i is CartItem => i !== null);
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(i => i.item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Map of item ID to quantity in cart for fast lookup
  const cartQuantities = React.useMemo(() => {
    const map: Record<string, number> = {};
    cart.forEach(item => {
      map[item.item.id] = item.quantity;
    });
    return map;
  }, [cart]);

  const totalCount = calculateTotalCount(cart);
  const subtotal = calculateSubtotal(cart);

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#1f1b18] flex flex-col selection:bg-[#ffdad3] selection:text-[#b51d04]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          role="status"
          aria-live="polite"
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#342f2c] text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-4 duration-200 border border-[#e4beb6]/20"
        >
          <CheckCircle2 className="w-4 h-4 text-[#95f8a7]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        cartCount={totalCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main App Content View Switcher */}
      <main className="flex-1 pt-20 w-full" id="main-content">
        {currentView === 'inicio' && (
          <HomeView
            onNavigate={setCurrentView}
            onAddToCart={handleAddToCart}
            cartQuantities={cartQuantities}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentView === 'carta-menu' && (
          <MenuView
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            cartQuantities={cartQuantities}
            initialCategory="all"
          />
        )}

        {currentView === 'promociones' && (
          <PromosView
            onAddToCart={handleAddToCart}
            cartQuantities={cartQuantities}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentView === 'parrillas-carnes' && (
          <ParrillasView
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            cartQuantities={cartQuantities}
          />
        )}

        {currentView === 'ubicacion-delivery' && (
          <LocationView />
        )}
      </main>

      {/* Floating Bottom Cart Bar */}
      <FloatingCartBar
        totalCount={totalCount}
        totalAmount={subtotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentView={currentView}
        onNavigate={setCurrentView}
        cartCount={totalCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Full Cart & Checkout Drawer Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Global Footer */}
      <Footer onNavigate={setCurrentView} />

    </div>
  );
}
