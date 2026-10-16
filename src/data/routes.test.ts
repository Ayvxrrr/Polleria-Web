import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ROUTES, getRoute, getRouteUrl, getViewFromPath } from './routes.ts';

test('each section has its own HTML entry and maps to the right view', () => {
  for (const route of ROUTES) {
    assert.equal(getViewFromPath(route.path), route.id);
    assert.equal(getViewFromPath(route.path.replace('.html', '')), route.id);
    const file = route.path === '/' ? 'index.html' : route.path.slice(1);
    const html = readFileSync(new URL(`../../${file}`, import.meta.url), 'utf8');
    assert.ok(html.includes('/src/main.tsx'));
    assert.ok(html.includes('<title>'));
    assert.ok(!html.includes('user-scalable=no'));
  }
});

test('category deep links preserve query strings without invalid views', () => {
  assert.equal(getRouteUrl('carta-menu?categoria=pollos'), '/carta.html?categoria=pollos');
  assert.equal(getRoute('carta-menu?categoria=pollos').id, 'carta-menu');
  assert.equal(getViewFromPath('/index.html'), 'inicio');
  assert.equal(getRoute('invalid').id, 'inicio');
});
