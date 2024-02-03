import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { CustomersContext } from '@/contexts/Customers/CustomersContext'

const createCustomerFormSchema = z.object({
  email: z.string().email({ message: 'email inválido' }),
  name: z
    .string()
    .min(4, { message: 'o nome deve ter no mínimo 5 caracteres' }),
  phone: z
    .string()
    .min(14, { message: 'telefone deve ter no mínimo 14 dígitos' }),
  coordX: z.coerce.number().min(-99).max(99),
  coordY: z.coerce.number().min(-99).max(99),
})

type CreateCustomerFormValues = z.infer<typeof createCustomerFormSchema>

export function CustomerForm() {
  const { toast } = useToast()

  const createCustomerForm = useForm<CreateCustomerFormValues>({
    resolver: zodResolver(createCustomerFormSchema),
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      coordX: 0,
      coordY: 0,
    },
  })

  const createCustomer = useContextSelector(CustomersContext, (context) => {
    return context.createCustomer
  })

  const onSubmit = async (data: CreateCustomerFormValues) => {
    const formattedData = {
      longitude: data.coordX,
      latitude: data.coordY,
      ...data,
    }

    try {
      await createCustomer(formattedData)
      toast({
        title: 'Cliente cadastrado',
        description: `O cliente ${data.name} foi cadastrado com sucesso`,
      })

      createCustomerForm.reset()
    } catch (error) {
      toast({
        title: 'Erro ao cadastrar cliente',
        description: `O email informado já está sendo utilizado!`,
        variant: 'destructive',
      })
    }
  }

  const handleResetFormOnClose = (open: boolean) => {
    if (!open) {
      createCustomerForm.reset()
    }
  }

  const phoneMask = (value: string) => {
    if (!value) return ''
    if (value.length > 15) return value.slice(0, 15)

    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, '($1) $2')
    value = value.replace(/(\d)(\d{4})$/, '$1-$2')

    return value
  }

  return (
    <Dialog onOpenChange={handleResetFormOnClose}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="min-w-24 rounded border border-sky-500 bg-sky-500 p-2 font-semibold text-black hover:border-sky-400 hover:bg-sky-400"
        >
          cadastrar
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[312px] rounded sm:w-[640px]">
        <DialogHeader>
          <DialogTitle>cadastrar</DialogTitle>
          <DialogDescription>cadastre um novo cliente</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...createCustomerForm}>
            <form
              className="flex flex-col gap-4 py-4"
              onSubmit={createCustomerForm.handleSubmit(onSubmit)}
            >
              <FormField
                control={createCustomerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email:</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@exemplo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={createCustomerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>nome:</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="nome cliente"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={createCustomerForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>telefone:</FormLabel>
                    <FormControl>
                      <Input
                        min={14}
                        max={15}
                        onKeyUp={() =>
                          createCustomerForm.setValue(
                            'phone',
                            phoneMask(field.value),
                          )
                        }
                        type="tel"
                        placeholder="(00) 0000-0000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="flex items-start gap-4">
                <FormField
                  control={createCustomerForm.control}
                  name="coordX"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>coordenada X:</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          min={-99}
                          max={99}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createCustomerForm.control}
                  name="coordY"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>coordenada Y:</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          min={-99}
                          max={99}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                disabled={
                  // createCustomerForm.formState.isValid === false ||
                  createCustomerForm.formState.isSubmitting
                }
                type="submit"
                className="w-24 self-end rounded border border-sky-500 bg-sky-500 p-2 
                  font-semibold text-black hover:border-sky-400 hover:bg-sky-400 
                  disabled:cursor-not-allowed disabled:opacity-50"
              >
                confirmar
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
