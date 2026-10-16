import { useDeferredValue, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownWideNarrow, Search, SlidersHorizontal, UtensilsCrossed, X } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, RESTAURANT_INFO } from '../../data/menu.ts';
import type { MenuCategory, MenuItem } from '../../types/index.ts';
import { filterMenuItems } from '../../utils/cart.ts';
import { DishCard } from '../DishCard.tsx';

interface MenuViewProps { onAddToCart: (item: MenuItem) => void; onUpdateQuantity: (id: string, delta: number) => void; cartQuantities: Record<string, number>; initialCategory?: string; }

export function MenuView({ onAddToCart, onUpdateQuantity, cartQuantities, initialCategory = 'all' }: MenuViewProps) {
  const [category, setCategory] = useState<MenuCategory>(MENU_CATEGORIES.some(item => item.id === initialCategory) ? initialCategory as MenuCategory : 'all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recommended');
  const [section, setSection] = useState('all');
  const deferredQuery = useDeferredValue(query);
  const items = useMemo(() => {
    const filtered = filterMenuItems(MENU_ITEMS, deferredQuery, category);
    return filtered.filter(item => category !== 'chifa' || section === 'all' || item.section === section).sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : Number(!!b.isPopular) - Number(!!a.isPopular));
  }, [deferredQuery, category, sort, section]);

  return <div className="container page-content">
    <div className="page-heading"><span className="eyebrow"><UtensilsCrossed size={16} /> RECIÉN HECHO. BIEN SERVIDO.</span><h1>La carta del <em>antojo.</em></h1><p>Clásicos que enamoran, combos para juntarse y ese gustito que hoy te mereces.</p></div>
    <div className="menu-toolbar"><label className="search-field"><Search size={19} /><span className="sr-only">Buscar en la carta</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="¿Pollito, mostrito, una parrilla…?" type="search" />{query && <button onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><X size={17} /></button>}</label><label className="sort-field"><ArrowDownWideNarrow size={18} /><span className="sr-only">Ordenar platos</span><select value={sort} onChange={event => setSort(event.target.value)}><option value="recommended">Los favoritos primero</option><option value="price-asc">Menor precio</option><option value="price-desc">Mayor precio</option></select></label></div>
    <div className="category-tabs" role="group" aria-label="Filtrar por categoría">{MENU_CATEGORIES.map(item => <button key={item.id} aria-pressed={category === item.id} className={category === item.id ? 'is-active' : ''} onClick={() => { setCategory(item.id); setSection('all'); }}>{item.label}<span>{MENU_ITEMS.filter(dish => item.id === 'all' || dish.category === item.id).length}</span></button>)}</div>
    {category === 'chifa' && <div className="chifa-filters" role="group" aria-label="Secciones de chifa">{['all', 'Sopas', 'Chaufa', 'Aeropuertos', 'Tortillas'].map(value => <button key={value} aria-pressed={section === value} onClick={() => setSection(value)}>{value === 'all' ? 'Todo el chifa' : value}</button>)}</div>}
    <div className="results-label" aria-live="polite"><span><SlidersHorizontal size={15} /> {items.length} {items.length === 1 ? 'opción para tu antojo' : 'opciones para tu antojo'}</span><small>Precios en soles · Táperes aparte</small></div>
    <motion.div layout className="food-grid">{items.map((item, index) => <motion.div layout key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, delay: Math.min(index, 5) * 0.025 }}><DishCard item={item} quantityInCart={cartQuantities[item.id] || 0} onAddToCart={onAddToCart} onUpdateQuantity={onUpdateQuantity} /></motion.div>)}</motion.div>
    {items.length === 0 && <div className="empty-state"><Search size={38} /><h2>Ese antojo aún no aparece.</h2><p>Prueba con otra palabra o explora toda nuestra carta.</p><button className="btn btn-primary" onClick={() => { setQuery(''); setCategory('all'); }}>Ver toda la carta</button></div>}
    <p className="menu-disclaimer">{RESTAURANT_INFO.pricePolicy} Las imágenes son referenciales. Táperes: S/ 1.50 por unidad; cantidad por confirmar.</p>
  </div>;
}
