import React from 'react';
import { Flame, Plus, Minus, Users, ShieldCheck } from 'lucide-react';
import { MENU_ITEMS } from '../../data/menu.ts';
import type { MenuItem } from '../../types/index.ts';
import { formatSoles } from '../../utils/cart.ts';

interface ParrillasViewProps {
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  cartQuantities: Record<string, number>;
}

export const ParrillasView: React.FC<ParrillasViewProps> = ({
  onAddToCart,
  onUpdateQuantity,
  cartQuantities
}) => {
  const parrillasList = MENU_ITEMS.filter(i => 
    i.category === 'combos' || 
    i.category === 'piques' || 
    i.id.includes('lomo') || 
    i.id.includes('anticucho') || 
    i.id.includes('chuleta') || 
    i.id.includes('churrasco') ||
    i.id.includes('parrilla')
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-20">
      
      {/* View Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ffc329]/40 text-[#6f5100] px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-2">
          <Flame className="w-3.5 h-3.5 text-[#b51d04]" />
          <span>Al Carbón de Algarrobo</span>
        </div>
        <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-[#1f1b18] tracking-tight">
          Parrillas & Carnes Selectas
        </h1>
        <p className="text-sm text-[#5b403b] mt-2">
          Cortes tiernos y jugosos a las brasas: lomo fino, chuletas, brochetas, anticuchos de corazón y mollejitas, servidos con papas nativas doradas y ensalada fresca.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {parrillasList.map((item) => {
          const qty = cartQuantities[item.id] || 0;
          return (
            <div
              key={item.id}
              className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e4beb6]/40 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-[#f6ece6] mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-[#b51d04] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-price-badge shadow-sm">
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute bottom-2.5 right-2.5 bg-white/95 px-2.5 py-1 rounded-lg font-price-badge font-bold text-sm text-[#b51d04] shadow-xs">
                    {formatSoles(item.price)}
                  </span>
                </div>

                <h3 className="font-headline font-bold text-lg text-[#1f1b18] group-hover:text-[#b51d04] transition-colors leading-snug">
                  {item.title}
                </h3>

                {item.serves && (
                  <div className="flex items-center gap-1 text-xs text-[#795900] font-semibold mt-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Rinde: {item.serves}</span>
                  </div>
                )}

                <p className="mt-2 text-xs sm:text-sm text-[#5b403b] leading-relaxed">
                  {item.description}
                </p>

                {item.tags && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-[#f6ece6] text-[#5b403b] px-2 py-0.5 rounded font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#e4beb6]/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block font-semibold">Precio</span>
                  <span className="font-price-badge text-xl font-bold text-[#b51d04]">
                    {formatSoles(item.price)}
                  </span>
                </div>

                {qty > 0 ? (
                  <div className="flex items-center bg-[#f6ece6] rounded-full p-1 border border-[#e4beb6]/40">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-full bg-white text-[#1f1b18] flex items-center justify-center hover:bg-[#eae1db] text-xs font-bold cursor-pointer"
                      aria-label={`Disminuir ${item.title}`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center font-price-badge font-bold text-xs">
                      {qty}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-full bg-[#b51d04] text-white flex items-center justify-center hover:bg-[#d9381e] text-xs font-bold cursor-pointer"
                      aria-label={`Aumentar ${item.title}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onAddToCart(item)}
                    className="flex items-center gap-1.5 bg-[#b51d04] hover:bg-[#d9381e] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
