import React from 'react';
import { LOGO_URL, RESTAURANT_INFO } from '../data/menu.ts';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#fcf2ec] text-[#1f1b18] pt-12 pb-24 lg:pb-12 border-t border-[#e4beb6]/40">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#e4beb6]/40">
          
          {/* Brand statement */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src={LOGO_URL}
                alt="Pollería El Toñito"
                className="w-10 h-10 rounded-full object-cover shadow-xs"
              />
              <div className="flex flex-col">
                <span className="font-headline font-bold text-lg text-[#b51d04] leading-tight">
                  El Toñito
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#795900]">
                  {RESTAURANT_INFO.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#5b403b] leading-relaxed">
              Sabor a brasa inconfundible con la receta tradicional limeña. Pollos dorados, papas crocantes y salsas caseras que unen a la familia.
            </p>

            <div className="flex items-center gap-1.5 mt-1 text-[#006b2f] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Sabor Tradicional Garantizado</span>
            </div>
          </div>

          {/* Ubicación */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-[#1f1b18] uppercase tracking-wider">
              Ubicación & Locales
            </h3>
            <div className="flex items-start gap-2 text-xs text-[#5b403b]">
              <MapPin className="w-4 h-4 text-[#b51d04] shrink-0 mt-0.5" />
              <span>{RESTAURANT_INFO.address}</span>
            </div>
            <a
              href="https://maps.google.com/?q=San+Juan+de+Lurigancho+Lima+Peru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#b51d04] hover:underline"
            >
              <span>Ver en Google Maps</span>
            </a>
          </div>

          {/* Horario & Contacto */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-[#1f1b18] uppercase tracking-wider">
              Horario & Contacto
            </h3>
            <div className="flex items-center gap-2 text-xs text-[#5b403b]">
              <Clock className="w-4 h-4 text-[#795900] shrink-0" />
              <span>Lunes a Domingo: 12:00 PM - 11:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#5b403b]">
              <Phone className="w-4 h-4 text-[#b51d04] shrink-0" />
              <a href="tel:+51928067861" className="hover:underline font-semibold">
                Central: +51 928 067 861 / 910 449 497
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#5b403b]">
              <Mail className="w-4 h-4 text-[#006b2f] shrink-0" />
              <span>pedidos@eltonito.pe</span>
            </div>
          </div>

          {/* Métodos de Pago */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-[#1f1b18] uppercase tracking-wider">
              Métodos de Pago
            </h3>
            <p className="text-xs text-[#5b403b]">
              Aceptamos todas las formas de pago en tienda y contraentrega:
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-lg bg-white border border-[#e4beb6]/40 text-xs font-bold text-[#742384]">
                Yape
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-[#e4beb6]/40 text-xs font-bold text-[#00bfa5]">
                Plin
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-[#e4beb6]/40 text-xs font-bold text-[#1f1b18]">
                Tarjetas Visa / MC
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-[#e4beb6]/40 text-xs font-bold text-[#006b2f]">
                Efectivo
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#5b403b]">
          <p>© 2025 Pollería El Toñito. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <button onClick={() => onNavigate('ubicacion-delivery')} className="hover:text-[#b51d04] cursor-pointer">
              Políticas de Delivery
            </button>
            <span className="text-gray-300">•</span>
            <button onClick={() => onNavigate('ubicacion-delivery')} className="hover:text-[#b51d04] cursor-pointer">
              Libro de Reclamaciones
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
