import { Hono } from 'hono'
import { handlers } from "../controllers/characters"

const router = new Hono()
router.get('/:wiki/characters', handlers.findAll)
router.get('/:wiki/characters/name/:name', handlers.findByName)
router.get('/:wiki/characters/id/:id', handlers.findById)
router.get('/:wiki/metadata', handlers.getMetadata)
router.get('/:wiki/count', handlers.getCount)
router.get('/available-wikis', handlers.getAvailableWikis)

export { router as characterRoutes }

