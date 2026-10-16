import { ArrowUpRight, Clock3, Flame, MapPin, Phone, Star } from 'lucide-react';
import { LOGO_URL, RESTAURANT_INFO } from '../data/menu.ts';
import { ROUTES } from '../data/routes.ts';
import { AppLink } from './AppLink.tsx';

export function Footer({ onNavigate }: { onNavigate: (view: string) => void }) {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top">
      <div><span className="eyebrow"><Flame size={16} /> EL MEJOR INGREDIENTE ES LA COMPAÑÍA</span><h2>¿Y SI HOY<br /><span>PEDIMOS TOÑITO?</span></h2></div>
      <AppLink view="carta-menu" onNavigate={onNavigate} className="btn btn-yellow">Vamos a la carta <ArrowUpRight size={21} /></AppLink>
    </div>
    <div className="footer-grid">
      <div>
        <AppLink view="inicio" onNavigate={onNavigate} className="footer-brand"><img src={LOGO_URL} width="72" height="72" alt="Logo El Toñito" /><span>El Toñito<small>POLLERÍA & PARRILLAS</small></span></AppLink>
        <p>Buena brasa, buena mesa.<br />El sabor que nos reúne en Manchay.</p>
      </div>
      <div><h3>Explora el sabor</h3><nav aria-label="Navegación del pie de página">{ROUTES.map(route => <AppLink key={route.id} view={route.id} onNavigate={onNavigate}>{route.label}</AppLink>)}</nav></div>
      <div>
        <h3>Nos encontramos aquí</h3>
        <a className="footer-detail" href={RESTAURANT_INFO.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={17} /><span>{RESTAURANT_INFO.address}</span></a>
        <p className="footer-detail"><Clock3 size={17} /><span>Lunes a domingo<br />12:00 p. m. — 11:00 p. m.</span></p>
      </div>
      <div>
        <h3>Hablemos de tu pedido</h3>
        <a className="footer-phone" href={RESTAURANT_INFO.phoneUrl}><Phone size={19} /> {RESTAURANT_INFO.phone1}</a>
        <a className="footer-whatsapp" href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp <ArrowUpRight size={16} /></a>
        <a className="footer-review" href={RESTAURANT_INFO.reviewUrl} target="_blank" rel="noopener noreferrer"><Star size={15} /> Dejar una reseña en Maps <ArrowUpRight size={14} /></a>
        <div className="payment-badges"><span>Yape</span><span>Plin</span><span>Visa</span><span>Efectivo</span></div>
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Pollería El Toñito. Todos los derechos reservados.</span><span>Hecho para compartir. <Flame size={13} /></span></div>
  </div></footer>;
}
