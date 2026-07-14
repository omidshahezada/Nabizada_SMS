import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from '@/features/customers/api/customersApi'

export const customerKeys = {
  all: ['customers'],
  lists: () => [...customerKeys.all, 'list'],
  list: (params) => [...customerKeys.lists(), params],
  details: () => [...customerKeys.all, 'detail'],
  detail: (customerId) => [...customerKeys.details(), String(customerId)],
}

export function useCustomers(params) {
  return useQuery({ queryKey: customerKeys.list(params), queryFn: () => getCustomers(params) })
}

export function useCustomer(customerId) {
  return useQuery({
    queryKey: customerKeys.detail(customerId),
    queryFn: () => getCustomer(customerId),
    enabled: Boolean(customerId),
  })
}

function useRefreshCustomers() {
  const queryClient = useQueryClient()
  return async (customerId) => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() }),
      ...(customerId ? [queryClient.invalidateQueries({ queryKey: customerKeys.detail(customerId) })] : []),
    ])
  }
}

export function useCreateCustomer() {
  const refresh = useRefreshCustomers()
  return useMutation({ mutationFn: createCustomer, onSuccess: (customer) => refresh(customer.id) })
}

export function useUpdateCustomer() {
  const refresh = useRefreshCustomers()
  return useMutation({ mutationFn: updateCustomer, onSuccess: (customer) => refresh(customer.id) })
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient()
  const refresh = useRefreshCustomers()
  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: async (_, customerId) => {
      queryClient.removeQueries({ queryKey: customerKeys.detail(customerId), exact: true })
      await refresh()
    },
  })
}
