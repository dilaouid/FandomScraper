import type { TAvailableWikis } from '../types/dynamic.types';

import { DeathNote } from './death-note/index';
import { DemonSlayer } from './demon-slayer/index';
import { DragonBall } from './dragon-ball/index';
import { Fumetsu } from './fumetsu/index';
import { Naruto } from './naruto/index';
import { OnePiece } from './one-piece/index';
import { Shiki } from './shiki/index';
import { PromisedNeverland } from './promised-neverland/index';
import { Berserk } from './berserk/index';
import { Jojo } from './jojo/index';

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
} as const;