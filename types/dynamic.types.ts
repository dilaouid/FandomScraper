import * as path from 'path';
import { fileURLToPath } from 'url';

const getCurrentPath = () => {
  if (typeof __dirname !== 'undefined') {
    return __dirname;
  }
  return path.dirname(fileURLToPath(import.meta.url));
};

// Liste statique des wikis disponibles
export const availableWikis = [
  'demon-slayer',
  'naruto',
  'shiki',
  'death-note',
  'fumetsu',
  'one-piece',
  'dragon-ball',
  'promised-neverland',
  'berserk',
  'jojo',
  'dororo',
  "shingeki-no-kyojin",
] as const;

// Type basé sur la liste statique
export type TAvailableWikis = typeof availableWikis[number];