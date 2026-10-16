import { ArrowUpRight, Bike, ChevronDown, Clock3, CreditCard, MapPin, MessageCircle, Phone, Store } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/menu.ts';
import { RestaurantMap } from '../RestaurantMap.tsx';
import { Reveal } from '../Reveal.tsx';
import { ReviewInvite } from '../ReviewInvite.tsx';

const faqs = [
  { question: '¿Dónde queda El Toñito?', answer: RESTAURANT_INFO.address },
  { question: '¿Hacen delivery a mi casa?', answer: 'Contamos con delivery en Manchay. Envíanos tu dirección por WhatsApp para confirmar la cobertura, el costo y el tiempo de entrega antes de pedir.' },
  { question: '¿Puedo recoger mi pedido?', answer: 'Sí. Selecciona «Recojo en local» al armar tu pedido y confírmalo por WhatsApp. Te indicaremos cuándo estará listo.' },
  { question: '¿Qué medios de pago aceptan?', answer: 'En nuestra carta figuran Yape, Plin, efectivo y tarjeta. Confirma por WhatsApp el método elegido y los datos de pago antes de transferir.' },
  { question: '¿El precio incluye los táperes?', answer: RESTAURANT_INFO.taperPolicy },
];

export function LocationView() {
  return <div className="container page-content"><div className="page-heading"><span className="eyebrow"><MapPin size={16} /> DE MANCHAY, PARA TU MESA</span><h1>Ya tienes<br /><em>dónde juntarte.</em></h1><p>Ven con hambre, ven con tu gente. Te esperamos en El Pedregal.</p></div>
    <div className="location-grid"><Reveal className="location-details"><div className="location-title"><span className="location-icon"><Store size={25} /></span><div><span className="eyebrow">NUESTRO LOCAL</span><h2>El Toñito · Manchay</h2></div></div><p className="location-address">{RESTAURANT_INFO.address}</p><a className="btn btn-primary" href={RESTAURANT_INFO.mapsUrl} target="_blank" rel="noopener noreferrer">Llévame en Google Maps <ArrowUpRight size={18} /></a><div className="location-facts"><div><Clock3 size={22} /><p><span>Siempre hay un buen momento</span><strong>Todos los días, 12 p. m. a 11 p. m.</strong></p></div><div><Phone size={22} /><p><span>Un solo número. Atención directa.</span><a href={RESTAURANT_INFO.phoneUrl}>{RESTAURANT_INFO.phone1}</a></p></div><div><Bike size={22} /><p><span>Delivery y recojo en local</span><strong>Confirma cobertura por WhatsApp</strong></p></div><div><CreditCard size={22} /><p><span>Paga a tu manera</span><strong>Yape · Plin · Tarjeta · Efectivo</strong></p></div></div><a href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Hola, quiero consultar la cobertura de delivery en Manchay.')}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><MessageCircle size={18} /> Consultar por WhatsApp</a></Reveal><Reveal className="location-map-card"><div className="location-map"><RestaurantMap /></div><div className="map-caption"><MapPin size={18} /><span>El Pedregal · Manchay, Pachacámac</span><a href={RESTAURANT_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir ubicación en Google Maps"><ArrowUpRight size={21} /></a></div></Reveal></div>
    <ReviewInvite />
    <section className="faq-section section-space"><div><span className="eyebrow">ANTES DE QUE TE DÉ MÁS HAMBRE</span><h2>Por si te<br /><em>lo preguntabas.</em></h2><p>Y si te queda alguna duda, llámanos. Será un gusto ayudarte.</p></div><div className="faq-list">{faqs.map(faq => <details key={faq.question}><summary>{faq.question}<ChevronDown size={19} /></summary><p>{faq.answer}</p></details>)}</div></section>
  </div>;
}
