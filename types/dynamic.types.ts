// Liste statique des wikis disponibles
export const availableWikis = [
  'kimetsu-no-yaiba',
  'koe-no-katachi',
  'naruto',
  'shiki',
  'death-note',
  'fumetsu-no-anata-e',
  'one-piece',
  'dragon-ball',
  'promised-neverland',
  'berserk',
  'jojo',
  'dororo',
  "shingeki-no-kyojin",
] as const;

export type TAvailableWikis = typeof availableWikis[number];