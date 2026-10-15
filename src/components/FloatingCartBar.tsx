import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatSoles } from '../utils/cart.ts';

interface FloatingCartBarProps {
  totalCount: number;
  totalAmount: number;
  onOpenCart: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  totalCount,
  totalAmount,
  onOpenCart
}) => {
  if (totalCount === 0) return null;

  return (
    <aside
      aria-label="Resumen de pedido flotante"
      className="fixed bottom-20 lg:bottom-6 left-3 right-3 sm:left-auto sm:right-6 z-40 sm:max-w-md animate-in fade-in slide-in-from-bottom-6 duration-300"
    >
      <div className="bg-[#342f2c] text-[#f9efe9] p-2.5 sm:p-3 rounded-2xl shadow-[0_12px_32px_0_rgba(24,20,17,0.35)] border border-[#e4beb6]/20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 pl-1.5">
          <div className="w-9 h-9 rounded-xl bg-[#b51d04] flex items-center justify-center text-white shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="bg-[#d9381e] text-white text-[10px] font-bold px-1.5 py-0.2 rounded font-price-badge">
                {totalCount} {totalCount === 1 ? 'plato' : 'platos'}
              </span>
              <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">
                Total estimado
              </span>
            </div>
            <span className="font-price-badge text-lg sm:text-xl font-bold text-[#ffdf9f] leading-none mt-0.5">
              {formatSoles(totalAmount)}
            </span>
          </div>
        </div>

        <button
          onClick={onOpenCart}
          className="flex items-center gap-1.5 bg-[#006b2f] hover:bg-[#1f8642] text-white px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <span>Ver Pedido</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
