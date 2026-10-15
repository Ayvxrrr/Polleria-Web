import React from 'react';
import { LOGO_URL, RESTAURANT_INFO } from '../data/menu.ts';
import { Phone, MessageCircle, ShoppingBag, Bike } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#fff8f5] border-b border-[#e4beb6]/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <button
          onClick={() => onNavigate('inicio')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          aria-label="Ir a Inicio"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#ffc329] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] group-hover:scale-105 transition-transform border border-[#d9381e]/30">
            <img
              src={LOGO_URL}
              alt="Logo Pollería El Toñito"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // If image fails, replace with inline styled mascot
                e.currentTarget.style.display = 'none';
              }}
              className="w-full h-full object-cover"
            />
            <span className="text-2xl font-bold select-none text-[#b51d04] leading-none" aria-hidden="true">
              🍗
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline font-extrabold text-2xl text-[#b51d04] leading-tight tracking-tight">
                El Toñito
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#ffc329] text-[#261a00] font-price-badge text-[11px] font-bold uppercase tracking-wider">
                SJL
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#795900] font-bold uppercase tracking-widest">
              <span>{RESTAURANT_INFO.tagline}</span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="hidden sm:inline text-[#006b2f] lowercase font-semibold">abierto hoy</span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
          <button
            onClick={() => onNavigate('inicio')}
            className={`px-3.5 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
              currentView === 'inicio'
                ? 'bg-[#d9381e] text-white shadow-sm'
                : 'text-[#5b403b] hover:text-[#1f1b18] hover:bg-[#f6ece6]'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onNavigate('promociones')}
            className={`px-3.5 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
              currentView === 'promociones'
                ? 'bg-[#d9381e] text-white shadow-sm'
                : 'text-[#5b403b] hover:text-[#1f1b18] hover:bg-[#f6ece6]'
            }`}
          >
            Promociones
          </button>
          <button
            onClick={() => onNavigate('carta-menu')}
            className={`px-3.5 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
              currentView === 'carta-menu'
                ? 'bg-[#d9381e] text-white shadow-sm'
                : 'text-[#5b403b] hover:text-[#1f1b18] hover:bg-[#f6ece6]'
            }`}
          >
            Carta / Menú
          </button>
          <button
            onClick={() => onNavigate('parrillas-carnes')}
            className={`px-3.5 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
              currentView === 'parrillas-carnes'
                ? 'bg-[#d9381e] text-white shadow-sm'
                : 'text-[#5b403b] hover:text-[#1f1b18] hover:bg-[#f6ece6]'
            }`}
          >
            Parrillas & Carnes
          </button>
          <button
            onClick={() => onNavigate('ubicacion-delivery')}
            className={`px-3.5 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
              currentView === 'ubicacion-delivery'
                ? 'bg-[#d9381e] text-white shadow-sm'
                : 'text-[#5b403b] hover:text-[#1f1b18] hover:bg-[#f6ece6]'
            }`}
          >
            Ubicación & Delivery
          </button>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Phone Hotline Pill (Desktop) */}
          <div className="hidden md:flex flex-col items-end px-3 py-1.5 bg-[#f6ece6] rounded-xl shadow-xs border border-[#e4beb6]/30">
            <div className="flex items-center gap-1 text-[#795900] text-[11px] font-bold uppercase tracking-wider">
              <Bike className="w-3.5 h-3.5" />
              <span>Delivery Central</span>
            </div>
            <a
              href="tel:+51928067861"
              className="text-xs font-bold text-[#1f1b18] hover:text-[#b51d04] transition-colors"
            >
              928 067 861 / 910 449 497
            </a>
          </div>

          {/* Quick Call Button (Mobile) */}
          <a
            href="tel:+51928067861"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#f6ece6] text-[#795900] hover:text-[#b51d04] border border-[#e4beb6]/40"
            aria-label="Llamar a delivery"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* WhatsApp Direct Order Button */}
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hola%20Poller%C3%ADa%20El%20To%C3%B1ito,%20deseo%20hacer%20un%20pedido%20delivery`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#006b2f] hover:bg-[#1f8642] text-white px-3.5 sm:px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all font-semibold text-xs sm:text-sm active:scale-95"
            aria-label="Pedir por WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Pedir por WhatsApp</span>
            <span className="sm:hidden">Pedir</span>
          </a>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f0e6e1] hover:bg-[#eae1db] text-[#1f1b18] transition-all cursor-pointer active:scale-95"
            aria-label={`Ver carrito de compras con ${cartCount} platos`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#b51d04] text-white text-[11px] font-bold font-price-badge w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
