import { TAvailableWikis } from '../types';

import { DeathNote } from './death-note';
import { DemonSlayer } from './demon-slayer';
import { DragonBall } from './dragon-ball';
import { Fumetsu } from './fumetsu';
import { Naruto } from './naruto';
import { OnePiece } from './one-piece';
import { Shiki } from './shiki';
import { PromisedNeverland } from './promised-neverland';
import { Berserk } from './berserk';
import { Jojo } from './jojo';

export const Schemas: Record<TAvailableWikis, any> = {
    'demon-slayer': DemonSlayer,
    'naruto': Naruto,
    'shiki': Shiki,
    'death-note': DeathNote,
    'fumetsu': Fumetsu,
    'one-piece': OnePiece,
    'dragon-ball': DragonBall,
    'promised-neverland': PromisedNeverland,
    'berserk': Berserk,
    'jojo': Jojo
} as Record<TAvailableWikis, any>;