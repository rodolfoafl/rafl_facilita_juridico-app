import fastify from 'fastify'
import cors from '@fastify/cors'
import { customersRoutes } from './routes/customers'

export const app = fastify()

app.register(cors, {
  origin: ['http://localhost:5173'],
})
app.register(customersRoutes, {
  prefix: '/customers',
})
