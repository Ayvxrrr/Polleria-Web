import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Banknote, Bike, Check, Copy, CreditCard, MapPin, MessageCircle, Minus, Plus, QrCode, ShieldCheck, ShoppingBag, Store, Trash2, X } from 'lucide-react';
import type { CartItem, DeliveryMode, OrderDetails, PaymentMethod } from '../types/index.ts';
import { calculateGrandTotal, calculateSubtotal, calculateTaperFee, formatSoles, generateWhatsAppMessage, getWhatsAppOrderUrl, hasUnconfirmedTapers } from '../utils/cart.ts';
import { RESTAURANT_INFO } from '../data/menu.ts';
import { useDialog } from '../hooks/useDialog.ts';

interface CartModalProps { isOpen: boolean; onClose: () => void; items: CartItem[]; onUpdateQuantity: (id: string, delta: number) => void; onRemoveItem: (id: string) => void; onClearCart: () => void; }

export function CartModal({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onClearCart }: CartModalProps) {
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [reference, setReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('yape');
  const [cashAmount, setCashAmount] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const dialogRef = useDialog(isOpen, onClose);
  const total = calculateGrandTotal(items, deliveryMode);
  const details: Partial<OrderDetails> = { customerName: customerName.trim(), phone: phone.trim(), deliveryMode, address: address.trim(), reference: reference.trim(), zone: 'Manchay', paymentMethod, cashAmount: cashAmount ? Number(cashAmount) : undefined, orderNotes: orderNotes.trim() };

  const sendOrder = () => {
    setError('');
    if (!customerName.trim() || !phone.trim() || (deliveryMode === 'delivery' && !address.trim())) { setError('Completa tu nombre, teléfono y dirección de entrega.'); return; }
    if (paymentMethod === 'efectivo' && cashAmount && Number(cashAmount) < total) { setError('El monto de efectivo debe cubrir el total estimado.'); return; }
    window.open(getWhatsAppOrderUrl(items, details), '_blank', 'noopener,noreferrer');
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(generateWhatsAppMessage(items, details)); setCopied(true); window.setTimeout(() => setCopied(false), 2500); }
    catch { setError('No se pudo copiar. Usa el botón de WhatsApp para enviar tu pedido.'); }
  };

  return <AnimatePresence>{isOpen && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <motion.div className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" ref={dialogRef} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}>
      <div className="cart-header"><div><span className="eyebrow">YA CASI ESTÁ EL PLAN</span><h2 id="cart-title">Tu pedido <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h2></div><button className="icon-button" onClick={onClose} aria-label="Cerrar pedido"><X size={23} /></button></div>
      {items.length === 0 ? <div className="cart-empty"><span><ShoppingBag size={42} /></span><h3>Aquí empieza<br />un buen antojo.</h3><p>Agrega tus favoritos de la carta y arma un plan delicioso.</p><button className="btn btn-primary" onClick={onClose}>Seguir explorando <ArrowRight size={17} /></button></div> : <>
        <form id="order-form" className="cart-content" onSubmit={event => { event.preventDefault(); sendOrder(); }}>
          <div className="delivery-toggle" role="group" aria-label="Modalidad de entrega"><button type="button" aria-pressed={deliveryMode === 'delivery'} className={deliveryMode === 'delivery' ? 'is-active' : ''} onClick={() => setDeliveryMode('delivery')}><Bike size={19} /> Delivery</button><button type="button" aria-pressed={deliveryMode === 'pickup'} className={deliveryMode === 'pickup' ? 'is-active' : ''} onClick={() => setDeliveryMode('pickup')}><Store size={18} /> Recojo en local</button></div>
          <div className="cart-list-label"><h3>Lo que se antojó</h3><button type="button" onClick={onClearCart}>Vaciar pedido</button></div>
          <div className="cart-items">{items.map(({ item, quantity }) => <div className="cart-item" key={item.id}><div className="cart-item-info"><h4>{item.title}</h4><span>{formatSoles(item.price)} c/u</span><strong>{formatSoles(item.price * quantity)}</strong></div><div className="cart-item-actions"><div className="quantity-control"><button type="button" onClick={() => onUpdateQuantity(item.id, -1)} aria-label={`Disminuir ${item.title}`}><Minus size={15} /></button><span>{quantity}</span><button type="button" onClick={() => onUpdateQuantity(item.id, 1)} disabled={quantity >= 99} aria-label={`Aumentar ${item.title}`}><Plus size={15} /></button></div><button type="button" className="remove-item" onClick={() => onRemoveItem(item.id)} aria-label={`Eliminar ${item.title}`}><Trash2 size={16} /></button></div></div>)}</div>
          <section className="checkout-section"><span className="eyebrow">01 / PARA CONOCERNOS</span><h3>¿A nombre de quién?</h3><div className="form-grid"><label>Tu nombre<input required autoComplete="name" value={customerName} maxLength={80} onChange={event => setCustomerName(event.target.value)} placeholder="Nombre y apellido" /></label><label>Teléfono<input required type="tel" inputMode="tel" pattern="[0-9 +()-]{7,20}" autoComplete="tel" value={phone} maxLength={20} onChange={event => setPhone(event.target.value)} placeholder="Ej. 987 654 321" /></label></div>
            {deliveryMode === 'delivery' ? <><label>Dirección en Manchay<input required autoComplete="street-address" value={address} maxLength={200} onChange={event => setAddress(event.target.value)} placeholder="Av. / calle, manzana, lote y sector" /></label><label>Una referencia <small>(opcional)</small><input value={reference} maxLength={160} onChange={event => setReference(event.target.value)} placeholder="¿Qué hay cerca de tu casa?" /></label></> : <div className="pickup-note"><MapPin size={20} /><div><strong>Te esperamos en El Pedregal</strong><p>{RESTAURANT_INFO.address}</p><a href={RESTAURANT_INFO.mapsUrl} target="_blank" rel="noopener noreferrer">Ver cómo llegar</a></div></div>}
          </section>
          <section className="checkout-section"><span className="eyebrow">02 / A TU MANERA</span><h3>¿Cómo prefieres pagar?</h3><div className="payment-options" role="group" aria-label="Método de pago">{[{ id: 'yape', label: 'Yape', icon: QrCode }, { id: 'plin', label: 'Plin', icon: QrCode }, { id: 'tarjeta', label: 'Tarjeta', icon: CreditCard }, { id: 'efectivo', label: 'Efectivo', icon: Banknote }].map(({ id, label, icon: Icon }) => <button type="button" key={id} aria-pressed={paymentMethod === id} className={paymentMethod === id ? 'is-active' : ''} onClick={() => setPaymentMethod(id as PaymentMethod)}><Icon size={21} /><span>{label}</span></button>)}</div><p className="checkout-note">Confirma los datos de pago con el local antes de transferir. No se realizan cobros en esta web.</p>{paymentMethod === 'efectivo' && <label>¿Con cuánto pagarás? <small>(opcional)</small><input type="number" inputMode="decimal" min={total} step="0.10" value={cashAmount} onChange={event => setCashAmount(event.target.value)} placeholder="Para preparar tu vuelto" /></label>}</section>
          <section className="checkout-section"><label>Un toque a tu gusto <small>(opcional)</small><textarea value={orderNotes} maxLength={400} rows={2} onChange={event => setOrderNotes(event.target.value)} placeholder="Cremas, punto de cocción o alguna indicación…" /></label></section>
          <div className="order-summary"><div><span>Subtotal</span><strong>{formatSoles(calculateSubtotal(items))}</strong></div><div><span>Táperes (S/ 1.50 c/u)</span><strong>{hasUnconfirmedTapers(items) ? 'Por confirmar' : formatSoles(calculateTaperFee(items))}</strong></div><div><span>{deliveryMode === 'delivery' ? 'Delivery en Manchay' : 'Recojo en local'}</span><strong>{deliveryMode === 'delivery' ? 'Por confirmar' : 'Sin envío'}</strong></div><div className="order-total"><span>Total estimado</span><strong>{formatSoles(total)}</strong></div><small>Los envases pendientes de confirmar{deliveryMode === 'delivery' ? ' y el envío' : ''} no están incluidos en el total estimado. Confirma el importe final con el local.</small></div>
          {error && <p role="alert" className="form-error">{error}</p>}<p className="order-assurance"><ShieldCheck size={19} /> En WhatsApp confirmamos disponibilidad, costo de entrega y preparación. Este envío no confirma el pedido automáticamente.</p>
        </form>
        <div className="cart-footer"><button form="order-form" type="submit" className="btn btn-green"><MessageCircle size={19} /> Confirmar por WhatsApp <ArrowUpRight size={17} className="order-send-arrow" /></button><button className="copy-order" onClick={copy}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Pedido copiado' : 'Copiar resumen del pedido'}</button></div>
      </>}
    </motion.div>
  </motion.div>}</AnimatePresence>;
}
