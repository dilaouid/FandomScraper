// Liste statique des wikis disponibles par défaut
export const availableWikis = [
  'berserk',
  'death-note',
  'dororo',
  'dragon-ball',
  'fumetsu-no-anata-e',
  'hellsing',
  'jojo',
  'kimetsu-no-yaiba',
  'koe-no-katachi',
  'naruto',
  'one-piece',
  'shiki',
  "shingeki-no-kyojin",
  'promised-neverland',
] as const;

export type TAvailableWikis = typeof availableWikis[number];