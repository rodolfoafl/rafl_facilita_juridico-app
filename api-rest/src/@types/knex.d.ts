// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    customers: {
      id: string
      name: string
      email: string
      phone: string
      latitude: number
      longitude: number
      created_at: Date
    }
  }
}
