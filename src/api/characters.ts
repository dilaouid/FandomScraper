import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import type { Character, QueryParams } from '../types'

const BASE_URL = 'https://fandomscraper-production.up.railway.app'

interface CharacterResponse {
    data: Character[]
    nextCursor?: number
}

export const characterKeys = {
    all: ['characters'] as const,
    lists: () => [...characterKeys.all, 'list'] as const,
    list: (wiki: string, params: QueryParams) => [...characterKeys.lists(), wiki, params] as const,
    details: () => [...characterKeys.all, 'detail'] as const,
    detail: (wiki: string, id: number) => [...characterKeys.details(), wiki, id] as const,
}

export const useCharacters = (wiki: string, params: QueryParams) => {
    return useInfiniteQuery({
        queryKey: characterKeys.list(wiki, params),
        queryFn: ({ pageParam }) =>
            fetch(`${BASE_URL}/${wiki}/characters?offset=${pageParam}&limit=${params.limit}`)
                .then(res => res.json()) as Promise<CharacterResponse>,
        getNextPageParam: (lastPage, pages) =>
            lastPage.data.length === params.limit ? pages.length * params.limit : undefined,
        initialPageParam: 0
    })
}

export const useCharacterDetails = (wiki: string, id: number) => {
    return useQuery({
        queryKey: characterKeys.detail(wiki, id),
        queryFn: () =>
            fetch(`${BASE_URL}/${wiki}/characters/id/${id}`)
                .then(res => res.json()) as Promise<Character>
    })
}
