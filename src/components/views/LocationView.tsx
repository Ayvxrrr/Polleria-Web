import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Bike, 
  Store, 
  CreditCard, 
  ShieldCheck, 
  MessageCircle, 
  ExternalLink,
  Award,
  CheckCircle2
} from 'lucide-react';
import { RESTAURANT_INFO, MAP_IMAGE_URL } from '../../data/menu.ts';

export const LocationView: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>(RESTAURANT_INFO.deliveryZones[0]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-20">
      
      {/* View Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#006b2f]/10 text-[#006b2f] px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-2">
          <Bike className="w-3.5 h-3.5" />
          <span>San Juan de Lurigancho & Alrededores</span>
        </div>
        <h1 className="font-headline font-extrabold text-3xl sm:text-5xl text-[#1f1b18] tracking-tight">
          Ubicación & Cobertura de Delivery
        </h1>
        <p className="text-sm text-[#5b403b] mt-2">
          Visítanos en salón o recibe tu pedido caliente y crujiente con empaque térmico sellado en tiempo récord.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Location & Delivery Info */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {/* Main Address Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e4beb6]/40 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#fcf2ec] flex items-center justify-center text-[#b51d04] shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-[#1f1b18]">
                  Local Principal San Juan de Lurigancho
                </h3>
                <p className="text-sm text-[#5b403b] mt-0.5 font-medium">
                  {RESTAURANT_INFO.address}
                </p>
                <p className="text-xs text-[#795900] mt-1 font-semibold">
                  {RESTAURANT_INFO.reference}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#e4beb6]/30 flex flex-wrap gap-2">
              <a
                href="https://maps.google.com/?q=San+Juan+de+Lurigancho+Lima+Peru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-[#f0e6e1] hover:bg-[#eae1db] text-[#1f1b18] px-4 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#b51d04]" />
                <span>Abrir en Google Maps</span>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-[#006b2f] hover:bg-[#1f8642] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Schedule & Telephones */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e4beb6]/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fcf2ec] flex items-center justify-center text-[#795900] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500">Horario de Atención</h4>
                <p className="text-xs sm:text-sm font-semibold text-[#1f1b18] mt-0.5">
                  Lunes a Domingo
                </p>
                <p className="text-xs text-[#5b403b]">12:00 PM a 11:00 PM</p>
                <span className="text-[10px] text-[#006b2f] font-bold bg-[#95f8a7] px-2 py-0.5 rounded-full inline-block mt-1">
                  Horario Corrido
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fcf2ec] flex items-center justify-center text-[#b51d04] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500">Central de Pedidos</h4>
                <a href={`tel:+51${RESTAURANT_INFO.phone1}`} className="text-xs sm:text-sm font-bold text-[#b51d04] hover:underline block mt-0.5">
                  {RESTAURANT_INFO.phone1}
                </a>
                <a href={`tel:+51${RESTAURANT_INFO.phone2}`} className="text-xs sm:text-sm font-bold text-[#b51d04] hover:underline block">
                  {RESTAURANT_INFO.phone2}
                </a>
                <span className="text-[10px] text-gray-400 mt-1 block">Llamadas y WhatsApp</span>
              </div>
            </div>

          </div>

          {/* Zones Selector */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e4beb6]/40 flex flex-col gap-3">
            <h4 className="font-bold text-sm text-[#1f1b18] flex items-center gap-2">
              <Bike className="w-4 h-4 text-[#006b2f]" />
              <span>Zonas de Cobertura en SJL</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {RESTAURANT_INFO.deliveryZones.map((z) => (
                <button
                  key={z}
                  onClick={() => setSelectedZone(z)}
                  className={`p-2 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                    selectedZone === z
                      ? 'bg-[#b51d04] text-white shadow-xs'
                      : 'bg-[#f6ece6] text-[#5b403b] hover:bg-[#eae1db]'
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
            <div className="p-3 bg-[#fcf2ec] rounded-xl flex items-center gap-2 text-xs text-[#5b403b] mt-1">
              <CheckCircle2 className="w-4 h-4 text-[#006b2f] shrink-0" />
              <span>Llegamos a tu domicilio en <strong>{selectedZone}</strong> en 30 a 45 minutos.</span>
            </div>
          </div>

        </div>

        {/* Right Column: Visual Map & Guarantees */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          <div className="overflow-hidden rounded-3xl bg-white p-2 shadow-xl border border-[#e4beb6]/40">
            <div 
              className="h-96 w-full rounded-2xl bg-cover bg-center relative"
              style={{ backgroundImage: `url('${MAP_IMAGE_URL}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl"></div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-[#e4beb6]/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#b51d04] text-white flex items-center justify-center font-bold">
                    🍗
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#1f1b18] block">Pollería El Toñito</span>
                    <span className="text-xs text-[#795900] font-semibold">{RESTAURANT_INFO.tagline}</span>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=San+Juan+de+Lurigancho+Lima+Peru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#b51d04] hover:bg-[#d9381e] text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm"
                >
                  Ver en Maps
                </a>
              </div>
            </div>
          </div>

          {/* Guarantees & Payment Methods */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e4beb6]/40 flex flex-col gap-4">
            <h4 className="font-bold text-sm text-[#1f1b18] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#795900]" />
              <span>Medios de Pago y Políticas de Entrega</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {RESTAURANT_INFO.paymentMethods.map((m) => (
                <div key={m.id} className="p-2.5 rounded-xl bg-[#f6ece6] text-center border border-[#e4beb6]/30">
                  <span className="font-bold text-xs text-[#1f1b18] block">{m.name}</span>
                  <span className="text-[10px] text-[#5b403b] mt-0.5 block">{m.note}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 pt-2 text-xs text-[#5b403b]">
              <p>• {RESTAURANT_INFO.taperPolicy}</p>
              <p>• {RESTAURANT_INFO.corchoPolicy}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
