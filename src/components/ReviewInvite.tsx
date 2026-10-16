import { ArrowUpRight, MessageSquareText, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menu.ts';

export function ReviewInvite() {
  return <section className="review-invite" aria-labelledby="review-invite-title">
    <span className="review-invite-icon" aria-hidden="true"><MessageSquareText size={28} /></span>
    <div>
      <span className="eyebrow">TU EXPERIENCIA NOS AYUDA A MEJORAR</span>
      <h2 id="review-invite-title">¿Ya compartiste mesa con nosotros?</h2>
      <p>Cuéntanos cómo te fue. Tu opinión honesta también ayuda a quienes quieren conocernos.</p>
      <small>Se abre Google Maps en otra pestaña. Google puede pedirte iniciar sesión.</small>
    </div>
    <a href={RESTAURANT_INFO.reviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><Star size={17} /> Dejar una reseña en Google Maps <ArrowUpRight size={17} /></a>
  </section>;
}
