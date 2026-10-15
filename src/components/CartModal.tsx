import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Bike, 
  Store, 
  MessageCircle, 
  Copy, 
  Check, 
  ShieldCheck,
  CreditCard,
  Banknote,
  QrCode
} from 'lucide-react';
import type { CartItem, DeliveryMode, PaymentMethod, OrderDetails } from '../types/index.ts';
import { 
  formatSoles, 
  calculateSubtotal, 
  calculateTaperFee, 
  calculateDeliveryFee, 
  calculateGrandTotal, 
  generateWhatsAppMessage, 
  getWhatsAppOrderUrl,
  TAPER_UNIT_PRICE
} from '../utils/cart.ts';
import { RESTAURANT_INFO } from '../data/menu.ts';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [reference, setReference] = useState('');
  const [zone, setZone] = useState('San Juan de Lurigancho');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('yape');
  const [cashAmount, setCashAmount] = useState<number | undefined>(undefined);
  const [orderNotes, setOrderNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const subtotal = calculateSubtotal(items);
  const taperFee = calculateTaperFee(items);
  const deliveryFee = calculateDeliveryFee(deliveryMode, subtotal);
  const total = calculateGrandTotal(items, deliveryMode);

  const orderDetails: Partial<OrderDetails> = {
    customerName,
    phone,
    deliveryMode,
    address,
    reference,
    zone,
    paymentMethod,
    cashAmount,
    orderNotes
  };

  const handleCopyOrder = () => {
    const text = generateWhatsAppMessage(items, orderDetails);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendOrder = () => {
    const url = getWhatsAppOrderUrl(items, orderDetails);
    window.open(url, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-end"
    >
      <div 
        className="w-full max-w-xl bg-[#fff8f5] min-h-full flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-300"
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-[#fff8f5]/95 backdrop-blur-md px-5 py-4 border-b border-[#e4beb6]/30 flex items-center justify-between">
          <div>
            <h2 id="cart-modal-title" className="font-headline font-bold text-xl text-[#1f1b18]">
              Tu Pedido ({items.reduce((a, b) => a + b.quantity, 0)})
            </h2>
            <p className="text-xs text-[#795900] font-semibold">
              Pollería El Toñito • SJL
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f0e6e1] hover:bg-[#eae1db] flex items-center justify-center text-[#1f1b18] cursor-pointer"
            aria-label="Cerrar ventana de pedido"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 p-5 overflow-y-auto space-y-6">
          
          {items.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#f6ece6] flex items-center justify-center text-[#b51d04] mb-3">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-[#1f1b18]">Tu carrito está vacío</h3>
              <p className="text-sm text-[#5b403b] max-w-xs mt-1">
                Añade deliciosos pollos a la brasa, combos familiares o parrillas para comenzar tu orden.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-6 py-2.5 rounded-full bg-[#b51d04] text-white font-bold text-sm shadow-md hover:bg-[#d9381e] cursor-pointer"
              >
                Ver Carta Digital
              </button>
            </div>
          ) : (
            <>
              {/* Delivery Mode Selector */}
              <div className="bg-[#f6ece6] p-1.5 rounded-2xl flex items-center">
                <button
                  type="button"
                  onClick={() => setDeliveryMode('delivery')}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    deliveryMode === 'delivery'
                      ? 'bg-[#d9381e] text-white shadow-sm'
                      : 'text-[#5b403b] hover:text-[#1f1b18]'
                  }`}
                >
                  <Bike className="w-4 h-4" />
                  <span>Delivery a Domicilio</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMode('pickup')}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    deliveryMode === 'pickup'
                      ? 'bg-[#d9381e] text-white shadow-sm'
                      : 'text-[#5b403b] hover:text-[#1f1b18]'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>Recojo en Local</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1f1b18] uppercase tracking-wider">
                    Platos seleccionados
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-xs text-[#b51d04] hover:underline font-semibold cursor-pointer"
                  >
                    Vaciar carrito
                  </button>
                </div>

                <div className="divide-y divide-[#e4beb6]/30 bg-white rounded-2xl p-3 border border-[#e4beb6]/40 shadow-xs">
                  {items.map(({ item, quantity, notes }) => (
                    <div key={item.id} className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-inner"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-[#1f1b18] truncate">
                          {item.title}
                        </h4>
                        <span className="font-price-badge font-bold text-xs text-[#006b2f]">
                          {formatSoles(item.price)} c/u
                        </span>
                        {notes && (
                          <p className="text-[11px] text-gray-500 italic mt-0.5 truncate">
                            Nota: {notes}
                          </p>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center bg-[#f6ece6] rounded-full p-1 border border-[#e4beb6]/30">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-full bg-white text-[#1f1b18] flex items-center justify-center hover:bg-[#eae1db] text-xs font-bold cursor-pointer"
                            aria-label={`Disminuir cantidad de ${item.title}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-price-badge font-bold text-xs">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-full bg-[#b51d04] text-white flex items-center justify-center hover:bg-[#d9381e] text-xs font-bold cursor-pointer"
                            aria-label={`Aumentar cantidad de ${item.title}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          aria-label={`Eliminar ${item.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Delivery Information Form */}
              <div className="space-y-3 bg-white rounded-2xl p-4 border border-[#e4beb6]/40 shadow-xs">
                <h3 className="font-bold text-sm text-[#1f1b18] flex items-center gap-2">
                  <span>Datos para la Entrega</span>
                  <span className="text-[10px] bg-[#95f8a7] text-[#00210a] px-2 py-0.5 rounded-full font-bold">
                    Directo por WhatsApp
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="customer-name-input" className="block text-xs font-semibold text-[#5b403b] mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      id="customer-name-input"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ej. Carlos Mendoza"
                      className="w-full bg-[#fcf2ec] border border-[#e4beb6]/60 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#b51d04]"
                    />
                  </div>

                  <div>
                    <label htmlFor="customer-phone-input" className="block text-xs font-semibold text-[#5b403b] mb-1">
                      Teléfono de Contacto *
                    </label>
                    <input
                      id="customer-phone-input"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. 987654321"
                      className="w-full bg-[#fcf2ec] border border-[#e4beb6]/60 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#b51d04]"
                    />
                  </div>
                </div>

                {deliveryMode === 'delivery' ? (
                  <>
                    <div>
                      <label htmlFor="delivery-address-input" className="block text-xs font-semibold text-[#5b403b] mb-1">
                        Dirección exacta en San Juan de Lurigancho *
                      </label>
                      <input
                        id="delivery-address-input"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ej. Av. Próceres de la Independencia 1420 / Jr. Los Sauces 230"
                        className="w-full bg-[#fcf2ec] border border-[#e4beb6]/60 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#b51d04]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="delivery-ref-input" className="block text-xs font-semibold text-[#5b403b] mb-1">
                          Referencia (Opcional)
                        </label>
                        <input
                          id="delivery-ref-input"
                          type="text"
                          value={reference}
                          onChange={(e) => setReference(e.target.value)}
                          placeholder="Frente a parque, cerca a estación..."
                          className="w-full bg-[#fcf2ec] border border-[#e4beb6]/60 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#b51d04]"
                        />
                      </div>

                      <div>
                        <label htmlFor="delivery-zone-select" className="block text-xs font-semibold text-[#5b403b] mb-1">
                          Zona de SJL
                        </label>
                        <select
                          id="delivery-zone-select"
                          value={zone}
                          onChange={(e) => setZone(e.target.value)}
                          className="w-full bg-[#fcf2ec] border border-[#e4beb6]/60 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#b51d04]"
                        >
                          {RESTAURANT_INFO.deliveryZones.map((z) => (
                            <option key={z} value={z}>
                              {z}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-3 bg-[#f6ece6] rounded-xl flex items-start gap-2.5 text-xs text-[#5b403b]">
                    <Store className="w-5 h-5 text-[#b51d04] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#1f1b18]">Recojo en nuestro local de SJL:</p>
                      <p>{RESTAURANT_INFO.address}</p>
                      <p className="text-[11px] text-[#795900] mt-0.5 font-semibold">Listo en aprox. 15 a 20 minutos.</p>
                    </div>
                  </div>
                )}

                {/* Order Special Notes */}
                <div>
                  <label htmlFor="order-notes-input" className="block text-xs font-semibold text-[#5b403b] mb-1">
                    Indicaciones especiales (Cremas, ají, táperes extra)
                  </label>
                  <input
                    id="order-notes-input"
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Ej. Con bastante ají pollero y mayonesa casera..."
                    className="w-full bg-[#fcf2ec] border border-[#e4beb6]/60 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#b51d04]"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 bg-white rounded-2xl p-4 border border-[#e4beb6]/40 shadow-xs">
                <h3 className="font-bold text-sm text-[#1f1b18]">
                  Método de Pago
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('yape')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'yape'
                        ? 'border-[#742384] bg-[#742384]/10 text-[#742384] font-bold'
                        : 'border-[#e4beb6]/50 bg-[#fcf2ec] text-[#5b403b]'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-[#742384]" />
                    <span className="text-xs">Yape</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('plin')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'plin'
                        ? 'border-[#00bfa5] bg-[#00bfa5]/10 text-[#00bfa5] font-bold'
                        : 'border-[#e4beb6]/50 bg-[#fcf2ec] text-[#5b403b]'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-[#00bfa5]" />
                    <span className="text-xs">Plin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('tarjeta')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'tarjeta'
                        ? 'border-[#b51d04] bg-[#b51d04]/10 text-[#b51d04] font-bold'
                        : 'border-[#e4beb6]/50 bg-[#fcf2ec] text-[#5b403b]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs">POS Tarjeta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('efectivo')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'efectivo'
                        ? 'border-[#006b2f] bg-[#006b2f]/10 text-[#006b2f] font-bold'
                        : 'border-[#e4beb6]/50 bg-[#fcf2ec] text-[#5b403b]'
                    }`}
                  >
                    <Banknote className="w-5 h-5" />
                    <span className="text-xs">Efectivo</span>
                  </button>
                </div>

                {paymentMethod === 'yape' || paymentMethod === 'plin' ? (
                  <div className="p-2.5 rounded-xl bg-[#f6ece6] text-xs text-[#5b403b] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#1f1b18]">Número de {paymentMethod === 'yape' ? 'Yape' : 'Plin'}: </span>
                      <span className="font-price-badge font-bold text-[#b51d04]">928 067 861</span>
                    </div>
                    <span className="text-[11px] text-gray-500">(Antonio A.)</span>
                  </div>
                ) : null}

                {paymentMethod === 'efectivo' && (
                  <div>
                    <label htmlFor="cash-amount-input" className="block text-xs font-semibold text-[#5b403b] mb-1">
                      ¿Con cuánto vas a pagar? (Para llevar tu vuelto)
                    </label>
                    <input
                      id="cash-amount-input"
                      type="number"
                      value={cashAmount || ''}
                      onChange={(e) => setCashAmount(parseFloat(e.target.value) || undefined)}
                      placeholder={`Ej. 100.00`}
                      className="w-full bg-[#fcf2ec] border border-[#e4beb6]/60 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none"
                    />
                    {cashAmount && cashAmount > total && (
                      <p className="text-xs text-[#006b2f] font-bold mt-1">
                        Tu vuelto será de: {formatSoles(cashAmount - total)}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Price Breakdown Calculation */}
              <div className="space-y-2 bg-[#f6ece6] rounded-2xl p-4 border border-[#e4beb6]/40">
                <div className="flex justify-between text-xs sm:text-sm text-[#5b403b]">
                  <span>Subtotal platos:</span>
                  <span className="font-price-badge font-semibold">{formatSoles(subtotal)}</span>
                </div>

                <div className="flex justify-between text-xs sm:text-sm text-[#5b403b]">
                  <span className="flex items-center gap-1">
                    <span>Táperes térmicos sellados:</span>
                    <span className="text-[10px] text-gray-400">({formatSoles(TAPER_UNIT_PRICE)} c/u)</span>
                  </span>
                  <span className="font-price-badge font-semibold">{formatSoles(taperFee)}</span>
                </div>

                <div className="flex justify-between text-xs sm:text-sm text-[#5b403b]">
                  <span>Costo de envío (SJL):</span>
                  <span className="font-price-badge font-semibold text-[#006b2f]">
                    {deliveryMode === 'pickup' ? 'S/ 0.00 (Recojo)' : deliveryFee === 0 ? 'Gratis (Promoción)' : formatSoles(deliveryFee)}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#e4beb6]/60 flex items-baseline justify-between text-base sm:text-lg font-bold text-[#1f1b18]">
                  <span>Total a Pagar:</span>
                  <span className="font-price-badge text-xl sm:text-2xl font-extrabold text-[#b51d04]">
                    {formatSoles(total)}
                  </span>
                </div>
              </div>

              {/* Security & Delivery Guarantee Note */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-[#006b2f] shrink-0" />
                <span>Tiempo promedio de entrega: 30 a 45 min en San Juan de Lurigancho.</span>
              </div>
            </>
          )}

        </div>

        {/* Modal Footer / Actions */}
        {items.length > 0 && (
          <div className="sticky bottom-0 bg-[#fff8f5] p-4 border-t border-[#e4beb6]/30 shadow-lg space-y-2">
            <button
              onClick={handleSendOrder}
              className="w-full bg-[#006b2f] hover:bg-[#1f8642] text-white py-3.5 px-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Enviar Pedido por WhatsApp</span>
            </button>

            <button
              onClick={handleCopyOrder}
              className="w-full bg-[#f0e6e1] hover:bg-[#eae1db] text-[#1f1b18] py-2.5 px-4 rounded-full font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#006b2f]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Copiado al portapapeles!' : 'Copiar texto del pedido'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
