import { Hono } from 'hono'
import { handlers } from "../controllers/characters"

const router = new Hono()

// Standard FandomScraper routes
router.get('/:wiki/characters', handlers.findAll)
router.get('/:wiki/characters/name/:name', handlers.findByName)
router.get('/:wiki/characters/id/:id', handlers.findById)
router.get('/:wiki/metadata', handlers.getMetadata)
router.get('/:wiki/count', handlers.getCount)
router.get('/available-wikis', handlers.getAvailableWikis)

// FandomPersonalScraper routes
router.post('/personal-wiki/characters', handlers.findAllPersonal)
router.post('/personal-wiki/characters/name/:name', handlers.findByNamePersonal)
router.post('/personal-wiki/characters/id/:id', handlers.findByIdPersonal)

export { router as characterRoutes }