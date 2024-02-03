import { useEffect } from 'react'
import { useContextSelector } from 'use-context-selector'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CustomersContext } from '@/contexts/Customers/CustomersContext'

import CustomerCard from './CustomerCard'

export default function ShortestRouteView() {
  const fetchCustomersShortestRoute = useContextSelector(
    CustomersContext,
    (context) => {
      return context.fetchCustomersShortestRoute
    },
  )

  const customers = useContextSelector(CustomersContext, (context) => {
    return context.orderedCustomers
  })

  const handleOpenModal = (open: boolean) => {
    if (open) {
      fetchCustomersShortestRoute()
    }
  }

  // useEffect(() => {
  //   fetchCustomersShortestRoute()
  // }, [fetchCustomersShortestRoute])

  return (
    <Dialog onOpenChange={handleOpenModal}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="min-w-24 rounded border border-sky-500  bg-sky-100 p-2 font-semibold text-black hover:bg-sky-50"
        >
          consultar rota
        </Button>
      </DialogTrigger>
      <DialogContent className=" w-[312px]  rounded sm:w-[640px]">
        <DialogHeader>
          <DialogTitle>melhor rota</DialogTitle>
          <DialogDescription>
            consulte a melhor rota para atendimento aos clientes
          </DialogDescription>
        </DialogHeader>
        <div className="flex max-h-[360px] flex-col gap-2 overflow-y-auto">
          {customers && customers.length === 0 ? (
            <span>nenhum cliente encontrado...</span>
          ) : (
            customers.map((customer) => {
              return (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  showCoordinates={true}
                />
              )
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
