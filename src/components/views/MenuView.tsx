import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Flame, 
  Bike, 
  Phone, 
  Sparkles, 
  ShoppingBag, 
  Plus, 
  Minus,
  UtensilsCrossed, 
  Check, 
  Info,
  ShieldCheck,
  CreditCard,
  Wine
} from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../../data/menu.ts';
import type { MenuItem, MenuCategory } from '../../types/index.ts';
import { formatSoles, filterMenuItems } from '../../utils/cart.ts';

interface MenuViewProps {
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  cartQuantities: Record<string, number>;
  initialCategory?: MenuCategory;
}

export const MenuView: React.FC<MenuViewProps> = ({
  onAddToCart,
  onUpdateQuantity,
  cartQuantities,
  initialCategory = 'all'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return filterMenuItems(MENU_ITEMS, searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const featuredParrilla = MENU_ITEMS.find(i => i.id === 'parrilla-tonito')!;

  const categories: { id: MenuCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'Todos los Platos', icon: '🔥' },
    { id: 'combos', label: 'Parrillas & Combos', icon: '🥩' },
    { id: 'pollos', label: 'Pollos a la Brasa & Mostros', icon: '🍗' },
    { id: 'mostritos', label: 'Anticuchos & Saltados', icon: '🍳' },
    { id: 'piques', label: 'Especialidad & Ensaladas', icon: '🥗' },
    { id: 'bebidas', label: 'Bebidas & Sangrías', icon: '🍹' },
  ];

  return (
    <div className="flex flex-col w-full pb-16">
      
      {/* Top Notice Banner (matching Image 6) */}
      <section className="w-full bg-[#fcf2ec] border-b border-[#e4beb6]/30 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div className="flex items-center gap-1.5 justify-center">
            <span className="p-1 bg-[#ffc329] text-[#261a00] rounded-full">
              <Flame className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs uppercase tracking-wider text-[#795900] font-bold">
              Tradición a la Leña & Brasas Limeñas
            </span>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-3 sm:gap-4 text-xs text-[#5b403b]">
            <span className="flex items-center gap-1">
              <Bike className="w-3.5 h-3.5 text-[#b51d04]" />
              San Juan de Lurigancho y alrededores
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <a 
              href="tel:+51928067861"
              className="flex items-center gap-1 font-bold text-[#1f1b18] hover:text-[#b51d04] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#006b2f]" />
              928 067 861 / 910 449 497
            </a>
          </div>
        </div>
      </section>

      {/* Editorial Category Header & Hero Billboard (matching Image 6) */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-2">
            <div className="inline-flex items-center gap-1.5 bg-[#ffc329]/40 text-[#6f5100] px-3 py-1 rounded-full w-fit">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Carta Oficial Digital</span>
            </div>

            <h1 className="font-headline font-extrabold text-2xl sm:text-4xl text-[#1f1b18] leading-tight tracking-tight">
              Parrillas al Carbón & <span className="text-[#b51d04] italic">Pollos Dorados</span>
            </h1>

            <p className="text-xs sm:text-base text-[#5b403b] max-w-xl leading-relaxed">
              Preparados al momento con nuestro aderezo tradicional de la casa, papas crocantes, ensalada fresca y salsas caseras de ají amarillo.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#f6ece6] border border-[#e4beb6]/30 text-xs font-bold text-[#1f1b18]">
                <Check className="w-3.5 h-3.5 text-[#006b2f]" />
                <span>Papas Crocantes 100% Nacional</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#f6ece6] border border-[#e4beb6]/30 text-xs font-bold text-[#1f1b18]">
                <Sparkles className="w-3.5 h-3.5 text-[#795900]" />
                <span>Cortes Selectos a la Brasa</span>
              </div>
            </div>
          </div>

          {/* Featured Spotlight: Parrilla Toñito */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-2xl p-4 shadow-xl border border-[#e4beb6]/40 overflow-hidden group">
              <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#f6ece6]">
                <img
                  src={featuredParrilla.image}
                  alt={featuredParrilla.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#ffc329] text-[#261a00] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow font-price-badge">
                  Recomendado del Maestro
                </span>
                <span className="absolute bottom-2.5 right-2.5 bg-[#006b2f] text-white font-price-badge font-bold text-sm sm:text-base px-2.5 py-1 rounded-lg shadow-md">
                  {formatSoles(featuredParrilla.price)}
                </span>
              </div>

              <div className="mt-3 flex justify-between items-start gap-2">
                <div>
                  <h3 className="font-headline font-bold text-lg text-[#1f1b18]">Parrilla Toñito</h3>
                  <p className="text-xs text-[#5b403b] line-clamp-2 mt-0.5">
                    1/4 pollo + 1 chuleta + 2 brochetas + 2 anticuchos + 2 chorizos + papas + ensalada + bebida natural.
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#e4beb6]/30 flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#b51d04] uppercase tracking-wider">
                  ¡El banquete familiar por excelencia!
                </span>
                <button
                  onClick={() => onAddToCart(featuredParrilla)}
                  className="flex items-center gap-1 bg-[#b51d04] hover:bg-[#d9381e] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow transition-all active:scale-95 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{cartQuantities[featuredParrilla.id] ? `Añadido (${cartQuantities[featuredParrilla.id]})` : 'Pedir'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Sticky Filter & Search Bar */}
      <section className="sticky top-20 z-30 w-full bg-[#fff8f5]/95 backdrop-blur-md shadow-xs py-3 border-y border-[#e4beb6]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar plato o ingrediente..."
              className="w-full bg-[#f6ece6] rounded-full pl-9 pr-8 py-2 text-xs sm:text-sm text-[#1f1b18] placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b51d04] border border-[#e4beb6]/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Chips (horizontal scroll on mobile) */}
          <div className="w-full sm:w-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#b51d04] text-white shadow-sm'
                    : 'bg-[#f0e6e1] text-[#5b403b] hover:bg-[#eae1db] hover:text-[#1f1b18]'
                }`}
              >
                <span className="mr-1">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-1 text-xs text-[#5b403b] shrink-0 font-medium">
            <Info className="w-3.5 h-3.5 text-[#b51d04]" />
            <span>Costo táper: S/ 1.50</span>
          </div>

        </div>
      </section>

      {/* Main Dishes Catalog Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#f6ece6] flex items-center justify-center text-[#5b403b] mb-3">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-[#1f1b18]">No encontramos ese plato</h3>
            <p className="text-xs text-[#5b403b] max-w-xs mt-1">
              Prueba buscando por "pollo", "anticucho", "parrilla" o selecciona otra categoría.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#f0e6e1] text-[#1f1b18] font-bold text-xs hover:bg-[#eae1db] cursor-pointer"
            >
              Ver Toda la Carta
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item) => {
              const qty = cartQuantities[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-[#e4beb6]/40 flex flex-col justify-between group"
                >
                  <div>
                    {/* Item Image */}
                    <div className="relative w-full h-40 rounded-xl overflow-hidden bg-[#f6ece6] mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.badge && (
                        <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm font-price-badge ${
                          item.badgeType === 'primary' 
                            ? 'bg-[#b51d04] text-white' 
                            : item.badgeType === 'secondary'
                            ? 'bg-[#ffc329] text-[#261a00]'
                            : item.badgeType === 'tertiary'
                            ? 'bg-[#006b2f] text-white'
                            : 'bg-white/90 text-[#1f1b18]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      <span className="absolute bottom-2 right-2 bg-white/95 px-2 py-0.5 rounded font-price-badge font-bold text-xs text-[#b51d04] shadow-xs">
                        {formatSoles(item.price)}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-[#1f1b18] group-hover:text-[#b51d04] transition-colors leading-snug">
                      {item.title}
                    </h4>

                    {item.serves && (
                      <span className="text-[11px] text-[#795900] font-semibold block mt-0.5">
                        Rinde: {item.serves}
                      </span>
                    )}

                    <p className="mt-1 text-xs text-[#5b403b] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((t, idx) => (
                          <span key={idx} className="text-[10px] bg-[#f6ece6] text-[#5b403b] px-1.5 py-0.2 rounded font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer & Add controls */}
                  <div className="mt-4 pt-3 border-t border-[#e4beb6]/30 flex items-center justify-between">
                    <span className="font-price-badge font-extrabold text-base text-[#b51d04]">
                      {formatSoles(item.price)}
                    </span>

                    {qty > 0 ? (
                      <div className="flex items-center bg-[#f6ece6] rounded-full p-1 border border-[#e4beb6]/40">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-white text-[#1f1b18] flex items-center justify-center hover:bg-[#eae1db] text-xs font-bold cursor-pointer"
                          aria-label={`Quitar uno de ${item.title}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-price-badge font-bold text-xs">
                          {qty}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-[#b51d04] text-white flex items-center justify-center hover:bg-[#d9381e] text-xs font-bold cursor-pointer"
                          aria-label={`Añadir uno más de ${item.title}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(item)}
                        className="flex items-center gap-1 bg-[#f0e6e1] hover:bg-[#b51d04] hover:text-white text-[#1f1b18] px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Añadir</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* Assurance and policies grid (as in Image 6) */}
      <section className="w-full bg-[#f6ece6] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#e4beb6]/30 mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#e4beb6]/40 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#fcf2ec] flex items-center justify-center text-[#b51d04] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1f1b18]">Empaque Térmico Seguro</h4>
              <p className="text-xs text-[#5b403b]">Llega caliente y crujiente a tu mesa (Costo táper S/ 1.50).</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#e4beb6]/40 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#fcf2ec] flex items-center justify-center text-[#795900] shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1f1b18]">Múltiples Formas de Pago</h4>
              <p className="text-xs text-[#5b403b]">Aceptamos Yape, Plin, tarjetas con POS y efectivo.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#e4beb6]/40 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#fcf2ec] flex items-center justify-center text-[#006b2f] shrink-0">
              <Wine className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1f1b18]">Servicio en Salón</h4>
              <p className="text-xs text-[#5b403b]">Se cobra derecho de corcho por bebida al consumir en local.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
