import { useQuery } from '@tanstack/vue-query'
import type { Wiki } from '@/types'

interface WikisResponse {
    wikis: string[]
}

export function useWikis() {
    return useQuery<WikisResponse, Error, Wiki[]>({
        queryKey: ['wikis'],
        queryFn: async () => {
            const response = await fetch('https://fandomscraper-production.up.railway.app')
            if (!response.ok) {
                throw new Error('Failed to fetch wikis')
            }
            return response.json()
        },
        select: (data) =>
            data.wikis.map((wiki): Wiki => ({
                id: wiki,
                name: wiki
                    .split('-')
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' '),
                imageUrl: `/src/assets/images/wikis/${wiki}.jpg`
            }))
    })
}
