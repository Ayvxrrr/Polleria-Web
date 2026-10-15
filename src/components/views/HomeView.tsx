import React, { useState } from 'react';
import { 
  Flame, 
  Bike, 
  Store, 
  MapPin, 
  Phone, 
  CreditCard, 
  Clock, 
  ShieldCheck, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Sparkles,
  Award,
  Users,
  Plus,
  Star,
  ExternalLink
} from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO, FLYER_CLASICA_IRRESISTIBLE, MAP_IMAGE_URL } from '../../data/menu.ts';
import type { MenuItem } from '../../types/index.ts';
import { formatSoles } from '../../utils/cart.ts';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onAddToCart: (item: MenuItem) => void;
  cartQuantities: Record<string, number>;
  onOpenCart: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onAddToCart,
  cartQuantities,
  onOpenCart
}) => {
  const [deliveryTab, setDeliveryTab] = useState<'delivery' | 'pickup'>('delivery');

  // Prominent dishes
  const ofertaClasica = MENU_ITEMS.find(i => i.id === 'oferta-clasica-irresistible')!;
  const parrillaTonito = MENU_ITEMS.find(i => i.id === 'parrilla-tonito')!;
  const parrillaFamiliar = MENU_ITEMS.find(i => i.id === 'parrilla-familiar-gigante')!;
  const anticuchos = MENU_ITEMS.find(i => i.id === 'anticucho-corazon')!;

  // Combos specifically matching Image 8
  const mobileCombos = [
    MENU_ITEMS.find(i => i.id === 'combo-familiar-1')!,
    MENU_ITEMS.find(i => i.id === 'oferta-mega-familiar')!,
    MENU_ITEMS.find(i => i.id === 'combo-familiar-2')!,
    MENU_ITEMS.find(i => i.id === 'pollo-oferta-pepsi')!
  ];

  // Pollos and Mostros specifically matching Image 8
  const mobilePollos = [
    MENU_ITEMS.find(i => i.id === 'pollo-entero-solo')!,
    MENU_ITEMS.find(i => i.id === 'medio-pollo')!,
    MENU_ITEMS.find(i => i.id === 'cuarto-pollo')!,
    MENU_ITEMS.find(i => i.id === 'mostro')!
  ];
  const mostritoAlPaso = MENU_ITEMS.find(i => i.id === 'mostrito')!;

  const desktopCombos = MENU_ITEMS.filter(i => 
    ['combo-familiar-1', 'combo-familiar-2', 'combo-familiar-3', 'oferta-mega-familiar', 'pollo-oferta-pepsi'].includes(i.id)
  );

  const desktopPollos = MENU_ITEMS.filter(i => 
    ['pollo-entero-solo', 'medio-pollo', 'cuarto-pollo', 'mostro', 'mostrito'].includes(i.id)
  );

  return (
    <div className="flex flex-col w-full pb-16">
      
      {/* ========================================================
          MOBILE VIEW (matches Image 8 perfectly on small screens)
          ======================================================== */}
      <div className="md:hidden flex flex-col w-full">
        
        {/* Toggle Delivery vs Recojo en Local */}
        <div className="px-4 pt-2 pb-2 bg-[#fff8f5]">
          <div className="bg-[#f6ece6] p-1 rounded-full flex items-center justify-between shadow-xs border border-[#e4beb6]/30">
            <button
              onClick={() => setDeliveryTab('delivery')}
              className={`flex-1 py-2 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all text-xs font-bold cursor-pointer ${
                deliveryTab === 'delivery'
                  ? 'bg-[#d9381e] text-white shadow-xs'
                  : 'text-[#5b403b] hover:text-[#1f1b18]'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>Delivery (30-45m)</span>
            </button>
            <button
              onClick={() => setDeliveryTab('pickup')}
              className={`flex-1 py-2 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all text-xs font-bold cursor-pointer ${
                deliveryTab === 'pickup'
                  ? 'bg-[#d9381e] text-white shadow-xs'
                  : 'text-[#5b403b] hover:text-[#1f1b18]'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Recojo en Local</span>
            </button>
          </div>

          <div className="mt-2 px-1 flex items-center justify-between text-xs text-[#5b403b]">
            <div className="flex items-center gap-1.5 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-[#006b2f] shrink-0" />
              <span className="truncate font-semibold text-[#1f1b18]">
                {deliveryTab === 'delivery' 
                  ? 'Reparto en todo San Juan de Lurigancho' 
                  : 'Retiro en: Av. Próceres de la Indep. 1420'}
              </span>
            </div>
            <span className="text-[#006b2f] font-bold text-[10px] bg-[#95f8a7] px-2 py-0.5 rounded-full shrink-0">
              {deliveryTab === 'delivery' ? 'Gratis hoy' : 'Listo en 15m'}
            </span>
          </div>
        </div>

        {/* Hero Card: Oferta Clásica Irresistible (Yellow Card from Image 8) */}
        <div className="px-4 mb-4 mt-2">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ffc329] via-[#f7b919] to-[#ffdf9f] text-[#261a00] shadow-[0_6px_20px_rgba(255,195,41,0.35)] p-4 flex flex-col justify-between border border-[#e4beb6]/30">
            
            {/* Badges superiores */}
            <div className="flex items-center justify-between z-10 mb-2">
              <div className="flex items-center gap-1 bg-[#b51d04] text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs font-price-badge">
                <Flame className="w-3.5 h-3.5" />
                <span>¡La Más Pedida!</span>
              </div>
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs text-[#1f1b18] text-xs font-bold font-price-badge">
                <Star className="w-3.5 h-3.5 text-[#ffc329] fill-[#ffc329]" />
                <span>4.9 (840+)</span>
              </div>
            </div>

            {/* Imagen destacada del combo */}
            <div className="relative w-full h-44 my-1 flex items-center justify-center overflow-hidden rounded-xl bg-white/40">
              <img
                src={FLYER_CLASICA_IRRESISTIBLE}
                alt="Oferta Clásica Irresistible El Toñito"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 left-2 bg-white text-[#b51d04] px-3 py-1 rounded-full shadow-md font-price-badge text-base font-bold flex items-baseline gap-0.5">
                <span className="text-xs">S/</span>
                <span>72.00</span>
              </div>
            </div>

            {/* Contenido e información */}
            <div className="z-10 mt-2">
              <h2 className="font-headline font-extrabold text-xl text-[#261a00] uppercase leading-tight tracking-tight">
                Oferta Clásica Irresistible
              </h2>
              <p className="text-xs text-[#5c4300] mt-1 line-clamp-2 leading-relaxed">
                1 Pollo entero dorado a la brasa + Chaufa de pollo al wok + Papas fritas crujientes + Ensalada fresca + Gaseosa Pepsi 2L bien helada.
              </p>

              {/* CTAs */}
              <div className="mt-3.5 flex items-center gap-2">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hola%20Poller%C3%ADa%20El%20To%C3%B1ito,%20deseo%20pedir%20la%20Oferta%20Cl%C3%A1sica%20Irresistible%20(S/%2072.00)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#006b2f] hover:bg-[#1f8642] active:scale-[0.98] transition-transform text-white py-2.5 px-4 rounded-full flex items-center justify-center gap-2 font-bold text-xs shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pedir por WhatsApp</span>
                </a>
                <button
                  onClick={() => onAddToCart(ofertaClasica)}
                  className="w-11 h-11 shrink-0 bg-white text-[#b51d04] hover:bg-[#f6ece6] active:scale-95 transition-transform rounded-full flex items-center justify-center shadow-md cursor-pointer font-bold"
                  aria-label="Añadir Oferta Clásica Irresistible al carrito"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Carrusel Horizontal de Categorías Rápidas */}
        <div className="mb-4">
          <div className="px-4 mb-2 flex items-center justify-between">
            <span className="font-bold text-base text-[#1f1b18]">Explora la Carta</span>
            <span className="text-[11px] text-[#5b403b] font-semibold uppercase">SJL • Delivery</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto px-4 pb-1 no-scrollbar">
            <button
              onClick={() => onNavigate('carta-menu')}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#d9381e] text-white flex items-center gap-1 shadow-xs text-xs font-bold active:scale-95 transition-transform cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Combos</span>
            </button>
            <button
              onClick={() => onNavigate('carta-menu')}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#f6ece6] text-[#5b403b] hover:text-[#1f1b18] flex items-center gap-1 text-xs font-bold active:scale-95 transition-transform cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-[#b51d04]" />
              <span>A la Brasa</span>
            </button>
            <button
              onClick={() => onNavigate('carta-menu')}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#f6ece6] text-[#5b403b] hover:text-[#1f1b18] flex items-center gap-1 text-xs font-bold active:scale-95 transition-transform cursor-pointer"
            >
              <span>Mostritos</span>
            </button>
            <button
              onClick={() => onNavigate('parrillas-carnes')}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#f6ece6] text-[#5b403b] hover:text-[#1f1b18] flex items-center gap-1 text-xs font-bold active:scale-95 transition-transform cursor-pointer"
            >
              <span>Parrillas</span>
            </button>
            <button
              onClick={() => onNavigate('carta-menu')}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#f6ece6] text-[#5b403b] hover:text-[#1f1b18] flex items-center gap-1 text-xs font-bold active:scale-95 transition-transform cursor-pointer"
            >
              <span>Bebidas</span>
            </button>
          </div>
        </div>

        {/* Sección: Combos Familiares (Image 8 mobile list style) */}
        <section className="px-4 mb-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline font-bold text-lg text-[#1f1b18] flex items-center gap-1.5">
                <span>Combos Familiares</span>
                <span className="text-[#795900]">🍴</span>
              </h3>
              <p className="text-xs text-[#5b403b]">Sabor a la leña, generosidad y el ají de la casa</p>
            </div>
            <span className="text-[#006b2f] text-[10px] font-bold bg-[#95f8a7] px-2 py-0.5 rounded-full font-price-badge">
              Top Ventas
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {mobileCombos.map((combo) => (
              <div
                key={combo.id}
                className="bg-white rounded-2xl p-3 shadow-xs border border-[#e4beb6]/40 flex gap-3 items-center justify-between"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative bg-[#f6ece6]">
                  <img
                    src={combo.image}
                    alt={combo.title}
                    className="w-full h-full object-cover"
                  />
                  {combo.badge && (
                    <div className="absolute top-1 left-1 bg-[#ffc329] text-[#261a00] text-[9px] font-bold px-1.5 py-0.2 rounded-full font-price-badge">
                      {combo.badge}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-sm text-[#1f1b18] truncate">
                        {combo.title}
                      </h4>
                      <span className="font-price-badge font-bold text-sm text-[#006b2f] shrink-0">
                        {formatSoles(combo.price)}
                      </span>
                    </div>
                    <p className="text-xs text-[#5b403b] line-clamp-2 mt-0.5">
                      {combo.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#e4beb6]/20">
                    <span className="text-[10px] text-gray-500 font-medium uppercase">
                      {combo.serves ? `Rinde: ${combo.serves}` : 'Familiar'}
                    </span>
                    <button
                      onClick={() => onAddToCart(combo)}
                      className="bg-[#b51d04] hover:bg-[#d9381e] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{cartQuantities[combo.id] ? `(${cartQuantities[combo.id]})` : 'Añadir'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección: Pollos & Mostritos (Grid 2-column mobile style) */}
        <section className="px-4 mb-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline font-bold text-lg text-[#1f1b18]">Pollos & Mostritos</h3>
              <p className="text-xs text-[#5b403b]">La verdadera brasa peruana en porciones individuales y dobles</p>
            </div>
            <Flame className="w-5 h-5 text-[#b51d04]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {mobilePollos.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl p-3 flex flex-col justify-between shadow-xs border border-[#e4beb6]/40"
              >
                <div>
                  <div className="w-full h-28 rounded-xl overflow-hidden relative mb-2 bg-[#f6ece6]">
                    <img
                      src={dish.image}
                      alt={dish.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1.5 right-1.5 bg-white/95 backdrop-blur-xs text-[#b51d04] font-price-badge text-xs px-2 py-0.5 rounded-full font-bold shadow-xs">
                      {formatSoles(dish.price)}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#1f1b18] leading-tight">
                    {dish.title}
                  </h4>
                  <p className="text-[11px] text-[#5b403b] mt-1 line-clamp-2">
                    {dish.description}
                  </p>
                </div>

                <button
                  onClick={() => onAddToCart(dish)}
                  className="mt-3 w-full bg-[#f6ece6] hover:bg-[#b51d04] hover:text-white text-[#b51d04] transition-colors py-1.5 rounded-full text-xs font-bold flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{cartQuantities[dish.id] ? `Añadido (${cartQuantities[dish.id]})` : 'Añadir'}</span>
                </button>
              </div>
            ))}

            {/* Mostrito Al Paso full width row in grid */}
            <div className="bg-white rounded-2xl p-3 flex flex-col justify-between shadow-xs border border-[#e4beb6]/40 col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative bg-[#f6ece6]">
                  <img
                    src={mostritoAlPaso.image}
                    alt={mostritoAlPaso.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-[#1f1b18]">Mostrito Al Paso</h4>
                    <span className="font-price-badge font-bold text-sm text-[#006b2f]">
                      {formatSoles(mostritoAlPaso.price)}
                    </span>
                  </div>
                  <p className="text-xs text-[#5b403b] mt-0.5">
                    1/8 de Pollo a la brasa + Arroz chaufa + Papas fritas + Ensalada.
                  </p>
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => onAddToCart(mostritoAlPaso)}
                      className="bg-[#b51d04] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{cartQuantities[mostritoAlPaso.id] ? `Añadido (${cartQuantities[mostritoAlPaso.id]})` : 'Añadir por S/ 14'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info de Locales SJL Card */}
        <div className="px-4 mb-4">
          <div className="bg-[#f6ece6] rounded-2xl p-4 shadow-xs border border-[#e4beb6]/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#d9381e] text-white flex items-center justify-center">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1f1b18] leading-tight">Pollería El Toñito SJL</h4>
                  <p className="text-xs text-[#5b403b]">Tradición y sabor en San Juan de Lurigancho</p>
                </div>
              </div>
              <span className="bg-[#95f8a7] text-[#00210a] text-[10px] font-bold px-2 py-0.5 rounded-full font-price-badge">
                Abierto Hoy
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl flex items-start gap-2.5 border border-[#e4beb6]/30">
              <MapPin className="w-5 h-5 text-[#b51d04] shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-xs text-[#1f1b18]">{RESTAURANT_INFO.address}</p>
                <p className="text-[11px] text-[#5b403b] mt-0.5">{RESTAURANT_INFO.reference}</p>
                <a
                  href="https://maps.google.com/?q=San+Juan+de+Lurigancho+Lima+Peru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#b51d04] text-xs mt-1.5 font-bold"
                >
                  <span>Ver mapa de cómo llegar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Direct Phone Calling Buttons */}
            <div className="flex items-center gap-2">
              <a
                href={`tel:${RESTAURANT_INFO.phone1}`}
                className="flex-1 bg-white hover:bg-[#eae1db] py-2 px-3 rounded-full flex items-center justify-center gap-1.5 text-[#1f1b18] text-xs font-bold transition-colors shadow-xs border border-[#e4beb6]/30"
              >
                <Phone className="w-4 h-4 text-[#006b2f]" />
                <span>{RESTAURANT_INFO.phone1}</span>
              </a>
              <a
                href={`tel:${RESTAURANT_INFO.phone2}`}
                className="flex-1 bg-white hover:bg-[#eae1db] py-2 px-3 rounded-full flex items-center justify-center gap-1.5 text-[#1f1b18] text-xs font-bold transition-colors shadow-xs border border-[#e4beb6]/30"
              >
                <Phone className="w-4 h-4 text-[#006b2f]" />
                <span>{RESTAURANT_INFO.phone2}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Métodos de Pago Aceptados (Mobile) */}
        <div className="px-4 mb-4">
          <div className="bg-[#fcf2ec] rounded-2xl p-3.5 flex flex-col gap-2 border border-[#e4beb6]/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1f1b18] uppercase tracking-wider">
                Métodos de Pago
              </span>
              <span className="text-[11px] text-[#5b403b] flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#006b2f]" />
                Pago seguro
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex-1 bg-white py-1.5 px-2 rounded-xl flex items-center justify-center text-[#742384] font-bold text-xs shadow-xs border border-[#e4beb6]/20">
                Yape
              </div>
              <div className="flex-1 bg-white py-1.5 px-2 rounded-xl flex items-center justify-center text-[#00bfa5] font-bold text-xs shadow-xs border border-[#e4beb6]/20">
                Plin
              </div>
              <div className="flex-1 bg-white py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 text-[#1f1b18] font-bold text-xs shadow-xs border border-[#e4beb6]/20">
                <CreditCard className="w-3.5 h-3.5 text-gray-500" />
                <span>POS</span>
              </div>
              <div className="flex-1 bg-white py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 text-[#006b2f] font-bold text-xs shadow-xs border border-[#e4beb6]/20">
                <span>Efectivo</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================
          DESKTOP VIEW (matches Image 4 on >= md screens)
          ======================================================== */}
      <div className="hidden md:flex flex-col w-full">
        
        {/* HERO SECTION DESKTOP */}
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#fcf2ec] via-[#fff8f5] to-[#fff8f5] pt-10 pb-16">
          <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-[#b51d04]/10 blur-3xl"></div>
          <div className="pointer-events-none absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-[#ffc329]/20 blur-3xl"></div>

          <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="flex flex-col items-start lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ffc329]/30 px-3.5 py-1 text-xs font-bold text-[#6f5100] uppercase tracking-wider shadow-xs">
                  <Flame className="w-4 h-4 text-[#795900]" />
                  <span>Tradición & Fuego a la Leña</span>
                </div>

                <h1 className="mt-4 font-headline text-5xl lg:text-6xl font-extrabold text-[#1f1b18] tracking-tight leading-tight">
                  El Auténtico <span className="text-[#b51d04] italic">Pollo a la Brasa</span> y Parrillas con Sabor Tradicional
                </h1>

                <p className="mt-4 text-[#5b403b] text-base lg:text-lg max-w-2xl leading-relaxed">
                  Dorado a la perfección con nuestra receta secreta de especias peruanas, papas nativas crocantes, cremas caseras de ají y las más jugosas carnes al carbón servidas en su punto justo.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3 w-full max-w-xl">
                  <div className="flex items-center gap-2 rounded-xl bg-[#f6ece6] p-3 shadow-xs border border-[#e4beb6]/30">
                    <Flame className="w-5 h-5 text-[#b51d04] shrink-0" />
                    <span className="text-xs sm:text-sm text-[#1f1b18] font-bold">100% al Carbón</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-[#f6ece6] p-3 shadow-xs border border-[#e4beb6]/30">
                    <Bike className="w-5 h-5 text-[#006b2f] shrink-0" />
                    <span className="text-xs sm:text-sm text-[#1f1b18] font-bold">Entrega Caliente</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-[#f6ece6] p-3 shadow-xs border border-[#e4beb6]/30">
                    <CreditCard className="w-5 h-5 text-[#795900] shrink-0" />
                    <span className="text-xs sm:text-sm text-[#1f1b18] font-bold">Yape / Plin / Tarjetas</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={onOpenCart}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#b51d04] hover:bg-[#d9381e] text-white px-7 py-3.5 font-bold text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Hacer Pedido al Delivery</span>
                  </button>
                  <button
                    onClick={() => onNavigate('carta-menu')}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#f0e6e1] hover:bg-[#eae1db] text-[#1f1b18] px-7 py-3.5 font-bold text-base transition-colors cursor-pointer"
                  >
                    <span>Ver Nuestra Carta</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm text-[#5b403b]">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#006b2f] animate-pulse"></span>
                  <span>
                    Atención telefónica directa:{' '}
                    <a href={`tel:${RESTAURANT_INFO.phone1}`} className="font-bold text-[#b51d04] hover:underline">
                      {RESTAURANT_INFO.phone1}
                    </a>{' '}
                    /{' '}
                    <a href={`tel:${RESTAURANT_INFO.phone2}`} className="font-bold text-[#b51d04] hover:underline">
                      {RESTAURANT_INFO.phone2}
                    </a>
                  </span>
                </div>
              </div>

              {/* Graphic Showcase Right */}
              <div className="relative lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md lg:max-w-none">
                  <div className="absolute inset-0 -rotate-2 rounded-3xl bg-[#ffc329]/40 shadow-xl"></div>
                  <div className="relative rounded-3xl bg-white p-4 shadow-2xl border border-[#e4beb6]/40 overflow-hidden">
                    <div className="relative overflow-hidden rounded-2xl bg-[#f6ece6]">
                      <img
                        src={FLYER_CLASICA_IRRESISTIBLE}
                        alt="Oferta Clásica Irresistible Pollería El Toñito"
                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 rounded-full bg-[#b51d04] text-white px-3 py-1 text-xs font-bold shadow-md uppercase tracking-wider flex items-center gap-1 font-price-badge">
                        <Sparkles className="w-3.5 h-3.5 text-[#ffdf9f]" /> Sabor que Enamora
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-1">
                      <div>
                        <span className="text-[11px] font-bold text-[#795900] uppercase tracking-widest block">
                          Combo Estrella
                        </span>
                        <span className="font-headline font-bold text-xl text-[#1f1b18]">
                          Oferta Clásica Irresistible
                        </span>
                      </div>
                      <div className="rounded-2xl bg-[#d9381e] px-4 py-1.5 text-white text-right shadow-md">
                        <span className="text-[10px] block opacity-90 font-semibold uppercase">Precio</span>
                        <span className="font-price-badge text-xl font-bold">
                          {formatSoles(72.00)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#e4beb6]/30 flex items-center justify-between">
                      <span className="text-xs text-[#5b403b] font-medium">1 Pollo + Chaufa + Papas + Pepsi 2L</span>
                      <button
                        onClick={() => onAddToCart(ofertaClasica)}
                        className="bg-[#006b2f] hover:bg-[#1f8642] text-white px-4 py-1.5 rounded-full font-bold text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{cartQuantities[ofertaClasica.id] ? `Añadido (${cartQuantities[ofertaClasica.id]})` : 'Pedir Ahora'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* HIGHLIGHT BANNER: OFERTA CLÁSICA IRRESISTIBLE */}
        <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#ffc329]/30 via-[#fcf2ec] to-[#ffdad3]/40 p-10 shadow-xl border border-[#e4beb6]/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-8 flex flex-col gap-2">
                <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#b51d04] text-white px-3.5 py-1 text-xs font-bold tracking-wider uppercase shadow-xs">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Promoción Más Pedida en Todo Lima</span>
                </div>

                <h2 className="font-headline font-extrabold text-4xl text-[#1f1b18] tracking-tight leading-tight">
                  Oferta Clásica Irresistible
                </h2>

                <p className="text-base text-[#5b403b] max-w-2xl leading-relaxed">
                  El banquete perfecto para compartir en familia con el auténtico toque y la generosidad inconfundible de Pollería El Toñito.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    '1 Pollo Entero a la Brasa',
                    'Chaufa de Pollo Especial',
                    'Papas Fritas Crocantes',
                    'Ensalada Fresca Limeña',
                    'Gaseosa Pepsi 2 Litros',
                    'Todas las Cremas de la Casa'
                  ].map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs text-[#1f1b18] shadow-xs font-semibold border border-[#e4beb6]/40"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#b51d04]" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-end justify-center">
                <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-[#e4beb6]/40 text-center flex flex-col items-center">
                  <span className="text-xs font-bold text-[#795900] uppercase tracking-widest">
                    Precio Promocional
                  </span>
                  <div className="mt-1 flex items-baseline justify-center gap-1 text-[#b51d04]">
                    <span className="text-lg font-bold">S/</span>
                    <span className="font-headline text-5xl font-extrabold tracking-tight">
                      72.00
                    </span>
                  </div>
                  <p className="text-xs text-[#5b403b] mt-1">
                    Para 4 a 5 personas con full porciones
                  </p>

                  <div className="mt-4 w-full space-y-2">
                    <button
                      onClick={() => onAddToCart(ofertaClasica)}
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-[#006b2f] hover:bg-[#1f8642] text-white py-3 px-4 text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Pedir Promo WhatsApp</span>
                    </button>
                    <span className="text-[11px] text-[#5b403b] flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#006b2f]" /> Respuesta en menos de 2 minutos
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* COMBOS FAMILIARES & OFERTAS (Cards Grid Desktop) */}
        <section className="w-full bg-[#fcf2ec] py-16 border-y border-[#e4beb6]/30">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
            
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ffc329]/40 px-3.5 py-1 text-xs font-bold text-[#6f5100] uppercase tracking-wider">
                  <Users className="w-4 h-4" />
                  <span>Para Toda la Familia</span>
                </div>
                <h2 className="mt-2 font-headline font-bold text-4xl text-[#1f1b18]">
                  Combos Familiares & Ofertas
                </h2>
                <p className="text-sm text-[#5b403b] mt-1">
                  Nuestras combinaciones más abundantes con precios oficiales de carta.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#5b403b]">
                <ShieldCheck className="w-4 h-4 text-[#006b2f]" />
                <span>Incluye táperes herméticos y cremas ilimitadas</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {desktopCombos.map((combo) => (
                <div
                  key={combo.id}
                  className="group relative flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e4beb6]/40"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-xs font-bold text-[#795900] uppercase tracking-wider">
                        {combo.categoryLabel}
                      </span>
                      {combo.badge && (
                        <span className="rounded-full bg-[#006b2f]/10 text-[#006b2f] px-2.5 py-0.5 text-[11px] font-bold">
                          {combo.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-headline font-bold text-xl text-[#1f1b18] group-hover:text-[#b51d04] transition-colors">
                      {combo.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#5b403b] leading-relaxed">
                      {combo.description}
                    </p>

                    {combo.tags && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {combo.tags.map((t, idx) => (
                          <span key={idx} className="px-2.5 py-0.5 rounded bg-[#f6ece6] text-xs text-[#5b403b] font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#e4beb6]/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block font-semibold">Precio Carta</span>
                      <span className="font-price-badge text-xl font-bold text-[#b51d04]">
                        {formatSoles(combo.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(combo)}
                      className="rounded-full bg-[#b51d04] hover:bg-[#d9381e] text-white px-5 py-2 text-sm font-bold shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{cartQuantities[combo.id] ? `Añadido (${cartQuantities[combo.id]})` : 'Pedir'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* POLLOS A LA BRASA & MOSTRITOS (5 COLUMNS) */}
        <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#b51d04]/10 px-3.5 py-1 text-xs font-bold text-[#b51d04] uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>Tradición Limeña</span>
              </div>
              <h2 className="mt-2 font-headline font-bold text-4xl text-[#1f1b18]">
                Pollos a la Brasa & Mostritos
              </h2>
              <p className="text-sm text-[#5b403b] mt-1">
                Nuestras raciones individuales y familiares con el doradito crocante de siempre.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#f6ece6] p-3 rounded-2xl shadow-xs border border-[#e4beb6]/40">
              <Phone className="w-5 h-5 text-[#795900]" />
              <div>
                <span className="text-[10px] text-gray-500 uppercase block font-semibold">Central de Delivery</span>
                <span className="text-sm font-bold text-[#1f1b18]">928 067 861 / 910 449 497</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {desktopPollos.map((dish) => (
              <div
                key={dish.id}
                className="flex flex-col justify-between rounded-2xl bg-[#fcf2ec] p-4 shadow-xs hover:shadow-md transition-shadow border border-[#e4beb6]/40"
              >
                <div>
                  <div className="h-36 w-full rounded-xl overflow-hidden bg-[#f6ece6] mb-3">
                    <img
                      src={dish.image}
                      alt={dish.title}
                      className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-base text-[#1f1b18]">{dish.title}</h4>
                    {dish.badge && (
                      <span className="rounded bg-[#ffc329] px-1.5 py-0.2 text-[10px] font-bold text-[#261a00]">
                        {dish.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-[#5b403b] line-clamp-2">
                    {dish.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-[#e4beb6]/30 flex items-center justify-between">
                  <span className="font-price-badge font-bold text-lg text-[#b51d04]">
                    {formatSoles(dish.price)}
                  </span>
                  <button
                    onClick={() => onAddToCart(dish)}
                    className="rounded-lg bg-[#eae1db] hover:bg-[#b51d04] hover:text-white text-[#1f1b18] px-3.5 py-1 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {cartQuantities[dish.id] ? `(${cartQuantities[dish.id]})` : 'Pedir'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PARRILLAS & CARNES DESTACADAS */}
        <section className="w-full bg-[#f6ece6] py-16">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
            <div className="rounded-3xl bg-white p-10 shadow-lg border border-[#e4beb6]/40">
              
              <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#e4beb6]/30">
                <div>
                  <span className="text-xs font-bold text-[#795900] uppercase tracking-widest">
                    Especialidades al Carbón
                  </span>
                  <h3 className="font-headline font-bold text-3xl text-[#1f1b18]">
                    Parrillas Familiares & Cortes Finos
                  </h3>
                </div>
                <button
                  onClick={() => onNavigate('parrillas-carnes')}
                  className="inline-flex items-center gap-1.5 text-[#b51d04] hover:text-[#d9381e] font-bold text-sm cursor-pointer"
                >
                  <span>Ver Carta de Parrillas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-6">
                
                {/* Parrilla Toñito */}
                <div className="rounded-2xl bg-[#fcf2ec] p-5 flex flex-col justify-between border border-[#e4beb6]/40">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg text-[#1f1b18]">Parrilla Toñito</span>
                      <span className="font-price-badge font-bold text-lg text-[#b51d04]">
                        {formatSoles(parrillaTonito.price)}
                      </span>
                    </div>
                    <p className="text-sm text-[#5b403b] leading-relaxed">
                      {parrillaTonito.description}
                    </p>
                  </div>
                  <button
                    onClick={() => onAddToCart(parrillaTonito)}
                    className="mt-5 text-center py-2.5 rounded-xl bg-[#eae1db] text-[#1f1b18] text-sm font-bold hover:bg-[#b51d04] hover:text-white transition-colors cursor-pointer"
                  >
                    {cartQuantities[parrillaTonito.id] ? `Añadido (${cartQuantities[parrillaTonito.id]})` : 'Pedir Parrilla Toñito'}
                  </button>
                </div>

                {/* Parrilla Familiar */}
                <div className="rounded-2xl bg-[#fcf2ec] p-5 flex flex-col justify-between border border-[#e4beb6]/40">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg text-[#1f1b18]">Parrilla Familiar</span>
                      <span className="font-price-badge font-bold text-lg text-[#b51d04]">
                        {formatSoles(parrillaFamiliar.price)}
                      </span>
                    </div>
                    <p className="text-sm text-[#5b403b] leading-relaxed">
                      {parrillaFamiliar.description}
                    </p>
                  </div>
                  <button
                    onClick={() => onAddToCart(parrillaFamiliar)}
                    className="mt-5 text-center py-2.5 rounded-xl bg-[#eae1db] text-[#1f1b18] text-sm font-bold hover:bg-[#b51d04] hover:text-white transition-colors cursor-pointer"
                  >
                    {cartQuantities[parrillaFamiliar.id] ? `Añadido (${cartQuantities[parrillaFamiliar.id]})` : 'Pedir Parrilla Familiar'}
                  </button>
                </div>

                {/* Anticucho de Corazón */}
                <div className="rounded-2xl bg-[#fcf2ec] p-5 flex flex-col justify-between border border-[#e4beb6]/40">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg text-[#1f1b18]">Anticucho de Corazón</span>
                      <span className="font-price-badge font-bold text-lg text-[#b51d04]">
                        {formatSoles(anticuchos.price)}
                      </span>
                    </div>
                    <p className="text-sm text-[#5b403b] leading-relaxed">
                      {anticuchos.description}
                    </p>
                  </div>
                  <button
                    onClick={() => onAddToCart(anticuchos)}
                    className="mt-5 text-center py-2.5 rounded-xl bg-[#eae1db] text-[#1f1b18] text-sm font-bold hover:bg-[#b51d04] hover:text-white transition-colors cursor-pointer"
                  >
                    {cartQuantities[anticuchos.id] ? `Añadido (${cartQuantities[anticuchos.id]})` : 'Pedir Anticuchos'}
                  </button>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* UBICACIÓN & DELIVERY DIRECTO */}
        <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-12 gap-12 items-start">
            
            <div className="col-span-5 flex flex-col gap-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#006b2f]/10 text-[#006b2f] px-3.5 py-1 text-xs font-bold uppercase tracking-wider self-start">
                <Bike className="w-4 h-4" />
                <span>Cobertura & Atención</span>
              </div>

              <h3 className="font-headline font-bold text-4xl text-[#1f1b18] tracking-tight">
                Ven a visitarnos o pide directo a tu hogar
              </h3>

              <p className="text-base text-[#5b403b] leading-relaxed">
                Atendemos en salón con la mejor atención familiar y llegamos con nuestro delivery propio en tiempo récord a las zonas de San Juan de Lurigancho y alrededores.
              </p>

              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f6ece6] border border-[#e4beb6]/30">
                  <MapPin className="w-5 h-5 text-[#b51d04] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-[#1f1b18] block">Dirección Principal</span>
                    <span className="text-sm text-[#5b403b]">{RESTAURANT_INFO.address}</span>
                    <p className="text-xs text-[#795900] mt-0.5 font-medium">{RESTAURANT_INFO.reference}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f6ece6] border border-[#e4beb6]/30">
                  <Phone className="w-5 h-5 text-[#795900] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-[#1f1b18] block">Central Telefónica de Pedidos</span>
                    <a href={`tel:+51${RESTAURANT_INFO.phone1}`} className="text-sm font-bold text-[#b51d04] hover:underline">
                      {RESTAURANT_INFO.phone1}
                    </a>
                    <span className="text-[#5b403b] text-sm"> / </span>
                    <a href={`tel:+51${RESTAURANT_INFO.phone2}`} className="text-sm font-bold text-[#b51d04] hover:underline">
                      {RESTAURANT_INFO.phone2}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f6ece6] border border-[#e4beb6]/30">
                  <CreditCard className="w-5 h-5 text-[#006b2f] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-[#1f1b18] block">Medios de Pago Aceptados</span>
                    <span className="text-sm text-[#5b403b]">Yape, Plin, Tarjetas Visa / MasterCard y Efectivo contraentrega.</span>
                    <span className="text-xs text-[#795900] block mt-0.5 font-semibold">Nota: Costo de táper por unidad S/ 1.50</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f6ece6] border border-[#e4beb6]/30">
                  <Clock className="w-5 h-5 text-[#5b403b] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-[#1f1b18] block">Horario de Atención</span>
                    <span className="text-sm text-[#5b403b]">{RESTAURANT_INFO.schedule}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 mt-2">
                <a
                  href="https://maps.google.com/?q=San+Juan+de+Lurigancho+Lima+Peru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#f0e6e1] hover:bg-[#eae1db] px-5 py-2.5 text-sm font-semibold text-[#1f1b18] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#b51d04]" />
                  <span>Abrir en Google Maps</span>
                </a>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#006b2f] hover:bg-[#1f8642] text-white px-5 py-2.5 text-sm font-bold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Escribir por WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="col-span-7 flex flex-col gap-4">
              <div className="overflow-hidden rounded-3xl bg-white p-2 shadow-xl border border-[#e4beb6]/40">
                <div 
                  className="h-96 w-full rounded-2xl bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${MAP_IMAGE_URL}')` }}
                >
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-lg flex items-center justify-between gap-4 border border-[#e4beb6]/40">
                    <div className="flex items-center gap-2.5">
                      <Store className="w-6 h-6 text-[#b51d04]" />
                      <div>
                        <span className="font-bold text-base text-[#1f1b18] block">{RESTAURANT_INFO.name}</span>
                        <span className="text-xs text-[#795900] font-bold">{RESTAURANT_INFO.tagline}</span>
                      </div>
                    </div>
                    <a
                      href="https://maps.google.com/?q=San+Juan+de+Lurigancho+Lima+Peru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-[#b51d04] hover:bg-[#d9381e] text-white px-4 py-2 text-xs font-bold shadow transition-colors"
                    >
                      Cómo Llegar
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-[#fcf2ec] p-4 text-center border border-[#e4beb6]/30">
                  <Clock className="w-6 h-6 text-[#795900] mx-auto mb-1" />
                  <span className="font-bold text-sm text-[#1f1b18] block">30 - 45 Min</span>
                  <span className="text-xs text-[#5b403b]">Tiempo Promedio Delivery</span>
                </div>
                <div className="rounded-2xl bg-[#fcf2ec] p-4 text-center border border-[#e4beb6]/30">
                  <ShieldCheck className="w-6 h-6 text-[#006b2f] mx-auto mb-1" />
                  <span className="font-bold text-sm text-[#1f1b18] block">Empaque Térmico</span>
                  <span className="text-xs text-[#5b403b]">Llega Caliente y Crocante</span>
                </div>
                <div className="rounded-2xl bg-[#fcf2ec] p-4 text-center border border-[#e4beb6]/30">
                  <Award className="w-6 h-6 text-[#b51d04] mx-auto mb-1" />
                  <span className="font-bold text-sm text-[#1f1b18] block">+15 Años</span>
                  <span className="text-xs text-[#5b403b]">De Tradición y Sabor</span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

    </div>
  );
};
