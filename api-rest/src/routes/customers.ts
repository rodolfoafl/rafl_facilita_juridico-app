import crypto from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { getNearestCustomersFromOrigin } from '../utils/get-nearest-customer-from-origin'

export async function customersRoutes(app: FastifyInstance) {
  app.get('/', async (_, reply) => {
    const customers = await knex('customers')
      .select()
      .orderBy('created_at', 'desc')
    return reply.status(200).send({ customers })
  })

  app.get('/search', async (req, reply) => {
    const searchCustomersQuerySchema = z.object({
      name: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
    })

    const data = searchCustomersQuerySchema.parse(req.query)
    const name = data.name ?? ''
    const email = data.email ?? ''
    const phone = data.phone ?? ''

    const filteredCustomers = await knex('customers')
      .where('name', 'ilike', `%${name}%`)
      .where('email', 'ilike', `%${email}%`)
      .where('phone', 'ilike', `%${phone}%`)
      .select()
      .orderBy('created_at', 'desc')

    return reply.status(200).send({ filteredCustomers })
  })

  app.post('/create', async (req, reply) => {
    const createCustomerBodySchema = z.object({
      name: z.string().min(4),
      email: z.string().email(),
      phone: z.string().min(10),
      latitude: z.number(),
      longitude: z.number(),
    })

    const { name, email, phone, latitude, longitude } =
      createCustomerBodySchema.parse(req.body)

    const existingCustomer = await knex('customers')
      .where({
        email,
      })
      .first()

    if (existingCustomer) {
      return reply
        .status(409)
        .send({ message: 'A customer with this email already exists' })
    }

    const id = crypto.randomUUID()

    await knex('customers').insert({
      id,
      name,
      email,
      phone,
      latitude,
      longitude,
    })

    return reply.status(201).send({ id })
  })

  app.get('/shortest-route', async (req, reply) => {
    const customers = await knex('customers').select()

    if (customers.length === 0) {
      return reply.status(404).send({ message: 'No customers found' })
    }

    let orderedCustomers = []
    if (customers.length === 1) {
      orderedCustomers = customers
      return reply.status(200).send({ orderedCustomers })
    }

    orderedCustomers = getNearestCustomersFromOrigin(customers)
    return reply.status(200).send({ orderedCustomers })
  })
}
