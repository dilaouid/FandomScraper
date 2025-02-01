const BASE_URL = 'https://fandomscraper-production.up.railway.app'

export const api = {
    async getAvailableWikis() {
        const response = await fetch(`${BASE_URL}/available-wikis`)
        if (!response.ok) throw new Error('Failed to fetch wikis')
            
        return response.json()
    }
}