import type { TAvailableWikis } from '../types/dynamic.types';
import { availableWikis } from '../types/dynamic.types';

// Importe tous les schémas de manière dynamique
export const Schemas: Record<TAvailableWikis, any> = Object.fromEntries(
  availableWikis.map((wiki) => [
    wiki,
    require(`./${wiki}/index.js`)[wiki.split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('')]
  ])
) as Record<TAvailableWikis, any>;