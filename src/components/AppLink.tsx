import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { getRouteUrl } from '../data/routes.ts';

interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  view: string;
  onNavigate: (view: string) => void;
}

export function AppLink({ view, onNavigate, onClick, children, ...props }: AppLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === '_blank') return;
    event.preventDefault();
    onNavigate(view);
  };

  return <a {...props} href={getRouteUrl(view)} onClick={handleClick}>{children}</a>;
}
