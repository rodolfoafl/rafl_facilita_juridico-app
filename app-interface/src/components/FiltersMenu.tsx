import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CustomersContext } from '@/contexts/Customers/CustomersContext'

export function FiltersMenu() {
  const fetchFilteredCustomers = useContextSelector(
    CustomersContext,
    (context) => {
      return context.fetchFilteredCustomers
    },
  )

  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleFilterCustomers = () => {
    if (filters.name === '' || filters.email === '' || filters.phone === '') {
      const params = '?' + new URLSearchParams(filters).toString()
      fetchFilteredCustomers(params)

      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className="w-24 max-w-72 self-start rounded border border-sky-700 bg-sky-700 p-2 font-semibold text-white hover:border-sky-600 hover:bg-sky-600"
        >
          filtros
        </Button>
      </PopoverTrigger>
      <PopoverContent className="absolute w-72 -translate-x-12 rounded">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="font-medium leading-none">filtros</h4>
            <p className="text-sm text-muted-foreground">
              filtre os clientes pelos campos abaixo
            </p>
          </div>
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex items-center gap-1">
              <Label htmlFor="name" className="w-1/3">
                nome:
              </Label>
              <Input
                onChange={(e) =>
                  setFilters({ ...filters, name: e.target.value })
                }
                value={filters.name}
                type="text"
                id="name"
                placeholder="nome"
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-1">
              <Label htmlFor="email" className="w-1/3">
                email:
              </Label>
              <Input
                onChange={(e) =>
                  setFilters({ ...filters, email: e.target.value })
                }
                value={filters.email}
                type="email"
                id="email"
                placeholder="email@exemplo.com"
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-1">
              <Label htmlFor="phone" className="w-1/3">
                telefone:
              </Label>
              <Input
                onChange={(e) =>
                  setFilters({ ...filters, phone: e.target.value })
                }
                value={filters.phone}
                type="tel"
                id="phone"
                placeholder="(00) 0000-0000"
                className="w-full"
              />
            </div>

            <Button
              onClick={handleFilterCustomers}
              type="button"
              className="w-24 self-end rounded border border-sky-500 bg-sky-500 p-2 
                  font-semibold text-black hover:border-sky-400 hover:bg-sky-400 
                  disabled:cursor-not-allowed disabled:opacity-50"
            >
              aplicar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
