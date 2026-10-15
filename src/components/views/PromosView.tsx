import React from 'react';
import { Tag, Sparkles, MessageCircle, ShoppingBag, CheckCircle2, ShieldCheck } from 'lucide-react';
import { MENU_ITEMS, FLYER_CLASICA_IRRESISTIBLE } from '../../data/menu.ts';
import type { MenuItem } from '../../types/index.ts';
import { formatSoles } from '../../utils/cart.ts';

interface PromosViewProps {
  onAddToCart: (item: MenuItem) => void;
  cartQuantities: Record<string, number>;
  onOpenCart: () => void;
}

export const PromosView: React.FC<PromosViewProps> = ({
  onAddToCart,
  cartQuantities,
  onOpenCart
}) => {
  const promoItems = MENU_ITEMS.filter(i => 
    i.category === 'combos' || i.isOffer || ['pollo-oferta-pepsi', 'mostrito'].includes(i.id)
  );

  const starPromo = MENU_ITEMS.find(i => i.id === 'oferta-clasica-irresistible')!;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-20">
      
      {/* View Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ffc329]/40 text-[#6f5100] px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-2">
          <Tag className="w-3.5 h-3.5" />
          <span>Promociones del Mes</span>
        </div>
        <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-[#1f1b18] tracking-tight">
          Combos Familiares & Ofertas
        </h1>
        <p className="text-sm text-[#5b403b] mt-2">
          Las combinaciones más rendidoras para compartir en familia. Incluyen papas crocantes, ensalada fresca y gaseosas familiares.
        </p>
      </div>

      {/* Featured Star Promo Banner */}
      <div className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-[#ffc329]/30 via-[#fcf2ec] to-[#ffdad3]/40 p-6 sm:p-10 shadow-xl border border-[#e4beb6]/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#e4beb6]/40 max-w-sm">
              <img
                src={FLYER_CLASICA_IRRESISTIBLE}
                alt="Oferta Clásica Irresistible Flyer"
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#b51d04] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-price-badge">
                Súper Promo
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-3">
            <span className="text-xs font-bold text-[#795900] uppercase tracking-widest">
              El Combo Estrella de Lima
            </span>
            <h2 className="font-headline font-bold text-2xl sm:text-4xl text-[#1f1b18]">
              {starPromo.title}
            </h2>
            <p className="text-sm sm:text-base text-[#5b403b] leading-relaxed">
              {starPromo.description}
            </p>

            <div className="flex flex-wrap gap-2 my-2">
              {starPromo.tags?.map((t, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-1 text-xs text-[#1f1b18] font-semibold border border-[#e4beb6]/30 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#006b2f]" />
                  <span>{t}</span>
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-[#e4beb6]/40 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-500 uppercase block font-semibold">Precio Promocional</span>
                <span className="font-price-badge text-3xl font-extrabold text-[#b51d04]">
                  {formatSoles(starPromo.price)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAddToCart(starPromo)}
                  className="bg-[#b51d04] hover:bg-[#d9381e] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{cartQuantities[starPromo.id] ? `Añadido (${cartQuantities[starPromo.id]})` : 'Añadir al Carrito'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Grid of All Promos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promoItems.map((promo) => (
          <div
            key={promo.id}
            className="group relative flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e4beb6]/40"
          >
            <div>
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-[#f6ece6] mb-4">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {promo.badge && (
                  <span className="absolute top-2.5 left-2.5 bg-[#b51d04] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-price-badge shadow-sm">
                    {promo.badge}
                  </span>
                )}
                <span className="absolute bottom-2.5 right-2.5 bg-white/95 px-2.5 py-1 rounded-lg font-price-badge font-bold text-sm text-[#b51d04] shadow-xs">
                  {formatSoles(promo.price)}
                </span>
              </div>

              <h3 className="font-headline font-bold text-xl text-[#1f1b18] group-hover:text-[#b51d04] transition-colors leading-snug">
                {promo.title}
              </h3>

              {promo.serves && (
                <span className="text-xs text-[#795900] font-semibold block mt-1">
                  Rinde: {promo.serves}
                </span>
              )}

              <p className="mt-2 text-xs sm:text-sm text-[#5b403b] leading-relaxed">
                {promo.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e4beb6]/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-500 uppercase block font-semibold">Precio</span>
                <span className="font-price-badge text-xl font-bold text-[#b51d04]">
                  {formatSoles(promo.price)}
                </span>
              </div>

              <button
                onClick={() => onAddToCart(promo)}
                className="rounded-full bg-[#b51d04] hover:bg-[#d9381e] text-white px-4 py-2 text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{cartQuantities[promo.id] ? `Añadido (${cartQuantities[promo.id]})` : 'Pedir'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
