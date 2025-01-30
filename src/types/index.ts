export type ArrayFields = 'affiliation' | 'occupations' | 'episode' | 'relatives' | 'images'

export interface Character {
    id?: number
    name: string
    url: string
    data?: CharacterData
}

export interface CharacterData {
    name?: string
    kanji?: string
    romaji?: string
    status?: string
    species?: string
    gender?: string
    images?: string[]
    episode?: string[]
    age?: string
    affiliation?: string[] | string
    occupations?: string[] | string
    // ... autres champs
}

export interface QueryParams {
    limit?: number
    offset?: number
    fields?: string[]
    arrayFields?: ArrayFields[]
}

