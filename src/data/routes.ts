export const ROUTES = [
  { id: 'inicio', path: '/', label: 'Inicio', title: 'Pollo a la brasa en Manchay', description: 'Pollería El Toñito en El Pedregal, Manchay. Pollo a la brasa, mostritos, parrillas y pedidos directos por WhatsApp.' },
  { id: 'carta-menu', path: '/carta.html', label: 'La carta', title: 'Nuestra carta', description: 'Descubre los pollos a la brasa, chifa, mostritos, parrillas, ensaladas y bebidas de Pollería El Toñito en Manchay.' },
  { id: 'promociones', path: '/promociones.html', label: 'Promociones', title: 'Promociones para compartir', description: 'Combos familiares y promociones de Pollería El Toñito. Arma tu pedido y confírmalo por WhatsApp.' },
  { id: 'parrillas-carnes', path: '/parrillas.html', label: 'Parrillas', title: 'Parrillas y piqueos', description: 'Anticuchos, cortes a las brasas y parrillas para compartir en Pollería El Toñito, Manchay.' },
  { id: 'ubicacion-delivery', path: '/ubicacion.html', label: 'Encuéntranos', title: 'Encuéntranos en Manchay', description: 'Av. Victor Malasquez Mz. B-14, El Pedregal, Manchay. Llámanos al 928 067 861 y consulta nuestra cobertura de delivery.' },
] as const;

export type ViewId = typeof ROUTES[number]['id'];

export function getRoute(view: string) {
  return ROUTES.find(route => route.id === view.split('?')[0]) ?? ROUTES[0];
}

export function getRouteUrl(view: string) {
  const search = view.includes('?') ? `?${view.split('?').slice(1).join('?')}` : '';
  return `${getRoute(view).path}${search}`;
}

export function getViewFromPath(path: string): ViewId {
  const normalized = path.length > 1 ? path.replace(/\/+$/, '') : path;
  return ROUTES.find(route => route.path === normalized || route.path === `${normalized}.html`)?.id ?? 'inicio';
}
