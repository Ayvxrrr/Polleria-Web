import { ArrowDown, ArrowRight, ArrowUpRight, Bike, Check, Clock3, Drumstick, Flame, MapPin, MessageCircle, Plus, Sparkles, UtensilsCrossed, Users, Wine } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../../data/menu.ts';
import type { MenuItem } from '../../types/index.ts';
import { formatSoles } from '../../utils/cart.ts';
import { AppLink } from '../AppLink.tsx';
import { DishCard } from '../DishCard.tsx';
import { Reveal } from '../Reveal.tsx';
import { SectionHeading } from '../SectionHeading.tsx';
import { ReviewInvite } from '../ReviewInvite.tsx';

interface HomeViewProps { onNavigate: (view: string) => void; onAddToCart: (item: MenuItem) => void; onUpdateQuantity: (id: string, delta: number) => void; cartQuantities: Record<string, number>; onOpenAssistant: () => void; }

const categories = [{ id: 'pollos', label: 'Los clásicos', text: 'Pollito a la brasa', icon: Drumstick }, { id: 'combos', label: 'Para compartir', text: 'Combos familiares', icon: Users }, { id: 'chifa', label: 'Del wok a tu mesa', text: 'Chifa, chaufa y sopas', icon: UtensilsCrossed }, { id: 'piques', label: 'Prende el antojo', text: 'Parrillas y saltados', icon: Flame }, { id: 'bebidas', label: 'Para acompañar', text: 'Bebidas', icon: Wine }];

export function HomeView({ onNavigate, onAddToCart, onUpdateQuantity, cartQuantities, onOpenAssistant }: HomeViewProps) {
  const reduced = useReducedMotion();
  const featured = ['pollo-entero-solo', 'mostrito', 'parrilla-tonito', 'mostro'].map(id => MENU_ITEMS.find(item => item.id === id)!);
  const promo = MENU_ITEMS.find(item => item.id === 'oferta-clasica-irresistible')!;
  const classic = featured[0];

  return <>
    <section className="container hero">
      <div className="hero-copy">
        <span className="eyebrow"><span className="live-dot" /> EL PEDREGAL, MANCHAY · LIMA</span>
        <h1>BUENA BRASA.<br />BUENA MESA.<br /><span>BUEN TOÑITO.</span></h1>
        <p>Ese pollito doradito, las papas que no se comparten y el sabor que siempre te hace volver. ¿Nos juntamos?</p>
        <div className="hero-actions"><AppLink view="carta-menu" onNavigate={onNavigate} className="btn btn-primary">Se me antojó <ArrowUpRight size={19} /></AppLink><AppLink view="promociones" onNavigate={onNavigate} className="text-link">Ver las promos <ArrowRight size={17} /></AppLink></div>
        <div className="hero-perks"><span><Flame size={17} /> A la brasa, de verdad</span><span><Bike size={18} /> Delivery en Manchay</span></div>
      </div>
      <div className="hero-visual">
        <div className="hero-orbit" aria-hidden="true" /><span className="hero-handwriting">¡Hoy se come rico!</span>
        <motion.div className="hero-photo" animate={reduced ? {} : { y: [0, -7, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}><img src="/images/pollo-brasa.jpg" alt="Pollo a la brasa dorado con papas y ensalada de El Toñito" fetchPriority="high" width="512" height="279" /><div className="hero-photo-shade" /><span className="hero-photo-label"><Flame size={16} /> EL CLÁSICO DE LA CASA</span></motion.div>
        <div className="hero-stamp" aria-label="Hecho para compartir"><UtensilsCrossed size={23} /><span>HECHO PARA<br />COMPARTIR</span><span>✦ ✦ ✦</span></div>
        <div className="hero-product"><div><small>Pollo entero + papas + ensalada</small><strong>{formatSoles(classic.price)}</strong></div><button onClick={() => onAddToCart(classic)} className="hero-add" aria-label="Agregar un pollo entero al pedido"><Plus size={24} /></button></div>
        <span className="hero-note">El acompañamiento perfecto: tu gente.</span>
      </div>
      <a className="hero-scroll" href="#antojos">EL SABOR SIGUE AQUÍ <ArrowDown size={15} /></a>
    </section>

    <div className="flavor-strip" aria-hidden="true"><span>POLLO A LA BRASA</span><Flame /><span>EL TOÑITO</span><Flame /><span>SABOR DE MANCHAY</span><Flame /><span>PARA COMPARTIR</span><Flame /><span>POLLO A LA BRASA</span></div>

    <section id="antojos" className="container section-space">
      <Reveal><SectionHeading eyebrow="¿QUÉ PROVOCA HOY?" title={<>Un antojo para <em>cada plan.</em></>} action={<AppLink view="carta-menu" onNavigate={onNavigate} className="text-link">Toda la carta <ArrowUpRight size={18} /></AppLink>} /></Reveal>
      <div className="category-grid">{categories.map(({ id, label, text, icon: Icon }) => <AppLink key={id} view={`carta-menu?categoria=${id}`} onNavigate={onNavigate} className="category-card"><span className="category-icon"><Icon size={29} strokeWidth={1.5} /></span><small>{label}</small><strong>{text}</strong><ArrowUpRight className="category-arrow" size={18} /></AppLink>)}</div>
    </section>

    <section className="container section-space section-top-zero"><Reveal><SectionHeading eyebrow="LOS QUE NUNCA FALLAN" title={<>Los favoritos <em>de la mesa.</em></>} description="Si no sabes por dónde empezar, empieza por aquí." /></Reveal><div className="food-grid featured-grid">{featured.map(item => <DishCard key={item.id} item={item} quantityInCart={cartQuantities[item.id] || 0} onAddToCart={onAddToCart} onUpdateQuantity={onUpdateQuantity} />)}</div></section>

    <section className="container"><Reveal className="promo-feature"><div className="promo-feature-copy"><span className="eyebrow"><Sparkles size={16} /> EL PLAN FAMILIAR ESTÁ SERVIDO</span><h2>JUNTOS SABE<br /><span>MUCHO MEJOR.</span></h2><p>Un pollo entero, chaufa, papas, ensalada y Pepsi 2L. La Clásica Irresistible tiene todo para reunir a los tuyos.</p><div className="promo-inclusions">{['Pollo entero', 'Chaufa + papas', 'Pepsi 2L'].map(text => <span key={text}><Check size={15} /> {text}</span>)}</div><div className="promo-feature-action"><strong>{formatSoles(promo.price)}</strong><button className="btn btn-dark" onClick={() => onAddToCart(promo)}>Quiero este combo <Plus size={18} /></button></div><small className="fine-print">Táperes aparte · Confirma disponibilidad al pedir.</small></div><div className="promo-feature-art"><img src="/images/promo-clasica.webp" alt="Promoción Clásica Irresistible de El Toñito, S/ 72.00" width="1080" height="1080" loading="lazy" /></div></Reveal></section>

    <section className="container section-space"><Reveal className="how-it-works"><div><span className="eyebrow">SIN VUELTAS. SIN COMISIONES DE APPS.</span><h2>Del antojo<br /><em>a tu mesa.</em></h2></div><div className="steps-grid">{[{ title: 'Elige a tu gusto', text: 'Explora la carta y agrega tus favoritos.', icon: UtensilsCrossed }, { title: 'Arma tu pedido', text: 'Elige delivery o recojo, y cómo pagar.', icon: Check }, { title: 'Confirma por WhatsApp', text: 'Te confirmamos disponibilidad, entrega y total.', icon: MessageCircle }].map(({ title, text, icon: Icon }, index) => <div className="step" key={title}><span className="step-number">0{index + 1}</span><Icon size={23} /><h3>{title}</h3><p>{text}</p></div>)}</div></Reveal></section>

    <section className="container section-space section-top-zero"><div className="home-info-grid"><Reveal className="visit-card"><span className="eyebrow"><MapPin size={16} /> SOMOS DE MANCHAY</span><h2>Tu próxima buena<br />mesa está <em>aquí.</em></h2><p>{RESTAURANT_INFO.address}</p><div className="visit-hours"><Clock3 size={18} /><span>Todos los días<br /><strong>12:00 p. m. — 11:00 p. m.</strong></span></div><AppLink view="ubicacion-delivery" onNavigate={onNavigate} className="btn btn-outline">Cómo llegar <ArrowUpRight size={18} /></AppLink></Reveal><Reveal className="assistant-promo"><span className="assistant-orb"><Sparkles size={34} /></span><span className="eyebrow">¿TE AYUDAMOS A ELEGIR?</span><h2>Tu antojo tiene<br />un nuevo <em>cómplice.</em></h2><p>Pregunta por nuestros platos, precios, ubicación o cómo pedir. El asistente de El Toñito te da una mano.</p><button className="btn btn-dark" onClick={onOpenAssistant}>Hablar con el asistente <Sparkles size={17} /></button></Reveal></div></section>
    <div className="container section-space section-top-zero"><ReviewInvite /></div>
  </>;
}
