import React from 'react';
import { Flame, UtensilsCrossed, MessageCircle, Tag, ShoppingCart } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart
}) => {
  return (
    <nav
      className="fixed bottom-0 w-full z-40 pb-safe bg-[#fff8f5]/95 backdrop-blur-xl border-t border-[#e4beb6]/40 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] lg:hidden"
      aria-label="Navegación inferior móvil"
    >
      <div className="flex justify-around items-center h-16 px-2 relative max-w-lg mx-auto">
        
        {/* Inicio */}
        <button
          onClick={() => onNavigate('inicio')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
            currentView === 'inicio'
              ? 'text-[#b51d04] font-bold'
              : 'text-[#5b403b] hover:text-[#1f1b18]'
          }`}
          aria-label="Ir a Inicio"
        >
          <Flame className={`w-5 h-5 ${currentView === 'inicio' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[11px] font-semibold mt-1">Inicio</span>
        </button>

        {/* Carta / Menú */}
        <button
          onClick={() => onNavigate('carta-menu')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
            currentView === 'carta-menu'
              ? 'text-[#b51d04] font-bold'
              : 'text-[#5b403b] hover:text-[#1f1b18]'
          }`}
          aria-label="Ver Carta y Menú"
        >
          <UtensilsCrossed className={`w-5 h-5 ${currentView === 'carta-menu' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[11px] font-semibold mt-1">Carta</span>
        </button>

        {/* Floating Pedir Ya Button in Center */}
        <div className="relative -top-3 flex flex-col items-center">
          <button
            onClick={() => {
              if (cartCount > 0) {
                onOpenCart();
              } else {
                onNavigate('carta-menu');
              }
            }}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#b51d04] to-[#d9381e] text-white shadow-[0_6px_16px_rgba(217,56,30,0.45)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            aria-label="Pedir Ya o revisar orden"
          >
            <MessageCircle className="w-7 h-7" />
          </button>
          <span className="text-[10px] font-bold text-[#b51d04] mt-0.5 tracking-tight uppercase">
            Pedir Ya
          </span>
        </div>

        {/* Promociones */}
        <button
          onClick={() => onNavigate('promociones')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
            currentView === 'promociones'
              ? 'text-[#b51d04] font-bold'
              : 'text-[#5b403b] hover:text-[#1f1b18]'
          }`}
          aria-label="Ver Promociones"
        >
          <Tag className={`w-5 h-5 ${currentView === 'promociones' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[11px] font-semibold mt-1">Promos</span>
        </button>

        {/* Mi Carrito / Pedidos */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center min-w-[56px] py-1 text-[#5b403b] hover:text-[#1f1b18] transition-colors"
          aria-label={`Ver carrito con ${cartCount} platos`}
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#b51d04] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-price-badge">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-semibold mt-1">Mi Pedido</span>
        </button>

      </div>
    </nav>
  );
};
