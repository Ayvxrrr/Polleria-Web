import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { formatSoles } from '../utils/cart.ts';

interface FloatingCartBarProps { totalCount: number; totalAmount: number; onOpenCart: () => void; }

export function FloatingCartBar({ totalCount, totalAmount, onOpenCart }: FloatingCartBarProps) {
  return <AnimatePresence>{totalCount > 0 && <motion.button className="floating-cart" onClick={onOpenCart} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} aria-label={`Ver pedido de ${totalCount} productos, subtotal ${formatSoles(totalAmount)}`}><span className="floating-cart-count"><ShoppingBag size={18} /> {totalCount}</span><span>Ver mi pedido <small>Subtotal · táperes aparte</small></span><strong>{formatSoles(totalAmount)}</strong><ArrowRight size={19} /></motion.button>}</AnimatePresence>;
}
