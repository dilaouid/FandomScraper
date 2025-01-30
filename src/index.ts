import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { characterRoutes } from './routes/router'
// import { errorHandler } from './middleware/error'

const app = new Hono()

// app.onError(errorHandler)
app.route('/', characterRoutes)

serve(app, () => {
  console.log('Server running on http://localhost:3000')
})