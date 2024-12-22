import { z } from 'zod';

export const allQuerySchema = z.object({
    id: z.string().optional().transform((val) => parseInt(val as string, 10)),
    lang: z.enum(['en', 'fr']).optional().default('en'),
    base64: z.string().optional().default('false').transform((val) => val === 'true'),
    withId: z.string().optional().default('true').transform((val) => val === 'true'),
    recursive: z.string().optional().default('false').transform((val) => val === 'true'),
    attr: z.string().optional().default('age kanji status episode images affiliation occupations'),
    offset: z.string().optional().default('0').transform((val) => parseInt(val, 10)),
    limit: z.string().optional().default('20').transform((val) => parseInt(val, 10)),
    attrToArray: z.string().optional().default('affiliation occupations'),
    ignore: z.string().optional().transform((val) => val?.split(' ') || []),
    withCount: z.string().optional().default('false').transform((val) => val === 'true')
});