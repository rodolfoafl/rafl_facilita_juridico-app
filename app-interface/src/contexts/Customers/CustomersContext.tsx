import { ReactNode, useCallback, useState } from 'react'
import { createContext } from 'use-context-selector'

import { api } from '../../lib/axios'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  longitude: number
  latitude: number
}

interface CreateCustomertData {
  name: string
  email: string
  phone: string
  longitude: number
  latitude: number
}

interface CustomersFilters {
  name?: string
  email?: string
  phone?: string
}

interface CustomersContextType {
  customers: Customer[]
  orderedCustomers: Customer[]
  fetchCustomers: () => Promise<void>
  createCustomer: (data: CreateCustomertData) => Promise<void>
  fetchCustomersShortestRoute: () => Promise<void>
  fetchFilteredCustomers: (filters: string) => Promise<void>
}

export const CustomersContext = createContext({} as CustomersContextType)

interface CustomersProviderProps {
  children: ReactNode
}

export const CustomersProvider = ({ children }: CustomersProviderProps) => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [orderedCustomers, setOrderedCustomers] = useState<Customer[]>([])

  const fetchCustomers = useCallback(async () => {
    const response = await api.get('/customers')

    setCustomers(response.data.customers)
  }, [])

  const fetchFilteredCustomers = useCallback(async (filters: string) => {
    const response = await api.get(`/customers/search${filters}`)

    setCustomers(response.data.filteredCustomers)
  }, [])

  const fetchCustomersShortestRoute = useCallback(async () => {
    const response = await api.get('/customers/shortest-route')

    setOrderedCustomers(response.data.orderedCustomers)
  }, [])

  const createCustomer = async (data: CreateCustomertData) => {
    const { name, email, phone, longitude, latitude } = data

    const response = await api.post('/customers/create', {
      name,
      email,
      phone,
      longitude,
      latitude,
    })

    const customerId = response.data.id
    setCustomers((oldState) => [
      {
        id: customerId,
        name,
        email,
        phone,
        longitude,
        latitude,
      },
      ...oldState,
    ])
  }

  return (
    <CustomersContext.Provider
      value={{
        customers,
        orderedCustomers,
        fetchCustomers,
        fetchCustomersShortestRoute,
        createCustomer,
        fetchFilteredCustomers,
      }}
    >
      {children}
    </CustomersContext.Provider>
  )
}
