import type { TAvailableWikis } from '../types/dynamic.types';

import { DeathNote } from './death-note';
import { DemonSlayer } from './kimetsu-no-yaiba';
import { DragonBall } from './dragon-ball';
import { Fumetsu } from './fumetsu-no-anata-e';
import { Naruto } from './naruto';
import { OnePiece } from './one-piece';
import { Shiki } from './shiki';
import { PromisedNeverland } from './promised-neverland';
import { Berserk } from './berserk';
import { Jojo } from './jojo';
import { Dororo } from './dororo';
import { Shingeki } from './shingeki-no-kyojin';
import { SilentVoice } from './koe-no-katachi';
import { Hellsing } from './hellsing';

export const Schemas: Record<TAvailableWikis, any> = {
    'berserk': Berserk,
    'death-note': DeathNote,
    'kimetsu-no-yaiba': DemonSlayer,
    'koe-no-katachi': SilentVoice,
    'dororo': Dororo,
    'dragon-ball': DragonBall,
    'fumetsu-no-anata-e': Fumetsu,
    'hellsing': Hellsing,
    'naruto': Naruto,
    'jojo': Jojo,
    'one-piece': OnePiece,
    'promised-neverland': PromisedNeverland,
    'shiki': Shiki,
    'shingeki-no-kyojin': Shingeki,
} as const;