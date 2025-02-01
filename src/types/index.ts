export type ArrayFields = 'affiliation' | 'occupations' | 'episode' | 'relatives' | 'images'

export interface Wiki {
    id: string
    name: string
    imageUrl: string
}

export interface Character {
    id: number
    name: string
    url: string
    data?: {
        age?: string
        kanji?: string
        status?: string
        species?: string
        gender?: string
        images?: string[]
        episode?: string[]
        affiliation?: string[]
        occupations?: string[]
    }
}

export interface ApiResponse<T> {
    data: T
    error?: string
}

export interface QueryParams {
    limit?: number
    offset?: number
    fields?: string[]
    arrayFields?: ArrayFields[]
}

