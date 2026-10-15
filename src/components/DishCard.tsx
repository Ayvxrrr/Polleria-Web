import React from 'react';
import { Plus, Minus, Users, Check } from 'lucide-react';
import type { MenuItem } from '../types/index.ts';
import { formatSoles } from '../utils/cart.ts';

interface DishCardProps {
  item: MenuItem;
  quantityInCart: number;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const DishCard: React.FC<DishCardProps> = ({
  item,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity
}) => {
  return (
    <div 
      className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-[#e4beb6]/40 flex flex-col justify-between"
      data-testid={`dish-card-${item.id}`}
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#f6ece6] mb-3">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {item.badge && (
            <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm font-price-badge ${
              item.badgeType === 'primary' 
                ? 'bg-[#b51d04] text-white' 
                : item.badgeType === 'secondary'
                ? 'bg-[#ffc329] text-[#261a00]'
                : item.badgeType === 'tertiary'
                ? 'bg-[#006b2f] text-white'
                : 'bg-white/90 text-[#1f1b18] backdrop-blur-sm'
            }`}>
              {item.badge}
            </span>
          )}

          {/* Quick Price Tag on Image */}
          <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm font-price-badge font-bold text-sm text-[#b51d04]">
            {formatSoles(item.price)}
          </div>
        </div>

        {/* Title & Serves */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-base sm:text-lg text-[#1f1b18] group-hover:text-[#b51d04] transition-colors leading-snug">
            {item.title}
          </h3>
        </div>

        {/* Serves info */}
        {item.serves && (
          <div className="flex items-center gap-1 text-[11px] text-[#795900] font-semibold mt-1">
            <Users className="w-3.5 h-3.5" />
            <span>Rinde: {item.serves}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-[#5b403b] mt-1.5 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {item.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-[#f6ece6] text-[#5b403b] px-2 py-0.5 rounded font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Price & Add/Quantity Actions */}
      <div className="pt-4 mt-2 border-t border-[#e4beb6]/30 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase font-semibold">Precio</span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-price-badge text-lg sm:text-xl font-extrabold text-[#b51d04]">
              {formatSoles(item.price)}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-price-badge">
                {formatSoles(item.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Action Button: Add or Active Quantity Controls */}
        {quantityInCart > 0 ? (
          <div className="flex items-center bg-[#f6ece6] rounded-full p-1 border border-[#e4beb6]/40">
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="w-7 h-7 rounded-full bg-white text-[#1f1b18] flex items-center justify-center hover:bg-[#eae1db] text-xs font-bold transition-transform active:scale-90 cursor-pointer shadow-xs"
              aria-label={`Disminuir ${item.title}`}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-price-badge font-bold text-xs text-[#1f1b18]">
              {quantityInCart}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="w-7 h-7 rounded-full bg-[#b51d04] text-white flex items-center justify-center hover:bg-[#d9381e] text-xs font-bold transition-transform active:scale-90 cursor-pointer shadow-xs"
              aria-label={`Aumentar ${item.title}`}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAddToCart(item)}
            className="flex items-center gap-1.5 bg-[#b51d04] hover:bg-[#d9381e] text-white px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
            aria-label={`Agregar ${item.title} al pedido`}
          >
            <Plus className="w-4 h-4" />
            <span>Agregar</span>
          </button>
        )}
      </div>
    </div>
  );
};
