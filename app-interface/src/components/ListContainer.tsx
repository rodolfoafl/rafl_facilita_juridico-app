import { useEffect } from 'react'
import { useContextSelector } from 'use-context-selector'

import { CustomersContext } from '@/contexts/Customers/CustomersContext'

import CustomerCard from './CustomerCard'
import { FiltersMenu } from './FiltersMenu'
import { Toaster } from './ui/toaster'

export default function ListContainer() {
  const fetchCustomers = useContextSelector(CustomersContext, (context) => {
    return context.fetchCustomers
  })

  const customers = useContextSelector(CustomersContext, (context) => {
    return context.customers
  })

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  return (
    <div className="flex w-full flex-col gap-4 overflow-y-auto">
      <h1 className="text-lg font-bold">Lista de clientes</h1>
      <FiltersMenu />
      <div className="flex max-h-[480px] flex-col gap-2 overflow-y-auto">
        {customers && customers.length === 0 ? (
          <span>nenhum cliente encontrado...</span>
        ) : (
          customers.map((customer) => {
            return <CustomerCard key={customer.id} customer={customer} />
          })
        )}
      </div>
      <Toaster />
    </div>
  )
}
