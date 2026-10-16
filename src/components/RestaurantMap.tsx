import { RESTAURANT_INFO } from '../data/menu.ts';

export const RestaurantMap = () => (
  <iframe
    src={RESTAURANT_INFO.mapEmbedUrl}
    title="Ubicación de Pollería El Toñito en El Pedregal, Manchay"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    allowFullScreen
  />
);
