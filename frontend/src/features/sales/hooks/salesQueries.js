import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { dashboardKeys } from '@/features/dashboard/hooks/dashboardQueries'
import { productKeys } from '@/features/products/hooks/productQueries'
import {
  createSale,
  deleteSale,
  getInvoice,
  getSale,
  getSaleItems,
  getSales,
  getTodaySales,
  updateInvoice,
  updateSale,
} from '@/features/sales/api/salesApi'

export const saleKeys = {
  all: ['sales'],
  lists: () => ['sales', 'list'],
  list: (params) => ['sales', 'list', params],
  today: (params) => ['sales', 'today', params],
  detail: (id) => ['sales', 'detail', String(id)],
  invoice: (id) => ['sales', 'invoice', String(id)],
  items: (params) => ['sales', 'items', params],
}

export const useSales = (params) => useQuery({ queryKey: saleKeys.list(params), queryFn: () => getSales(params) })
export const useTodaySales = (params) => useQuery({ queryKey: saleKeys.today(params), queryFn: () => getTodaySales(params) })
export const useSale = (id) => useQuery({ queryKey: saleKeys.detail(id), queryFn: () => getSale(id), enabled: Boolean(id) })
export const useInvoice = (id) => useQuery({ queryKey: saleKeys.invoice(id), queryFn: () => getInvoice(id), enabled: Boolean(id) })
export const useSaleItems = (params) => useQuery({ queryKey: saleKeys.items(params), queryFn: () => getSaleItems(params) })

function useRefreshSales() {
  const queryClient = useQueryClient()
  return async (id) => Promise.all([
    queryClient.invalidateQueries({ queryKey: saleKeys.all }),
    queryClient.invalidateQueries({ queryKey: dashboardKeys.all }),
    queryClient.invalidateQueries({ queryKey: productKeys.lists() }),
    ...(id ? [queryClient.invalidateQueries({ queryKey: saleKeys.detail(id) }), queryClient.invalidateQueries({ queryKey: saleKeys.invoice(id) })] : []),
  ])
}

export function useCreateSale() {
  const refresh = useRefreshSales()
  return useMutation({ mutationFn: createSale, onSuccess: (sale) => refresh(sale.id) })
}

export function useUpdateSale() {
  const refresh = useRefreshSales()
  return useMutation({ mutationFn: updateSale, onSuccess: (sale) => refresh(sale.id) })
}

export function useDeleteSale() {
  const queryClient = useQueryClient()
  const refresh = useRefreshSales()
  return useMutation({ mutationFn: deleteSale, onSuccess: async (_, id) => { queryClient.removeQueries({ queryKey: saleKeys.detail(id) }); queryClient.removeQueries({ queryKey: saleKeys.invoice(id) }); await refresh() } })
}

export function useUpdateInvoice() {
  const refresh = useRefreshSales()
  return useMutation({ mutationFn: updateInvoice, onSuccess: (invoice) => refresh(invoice.sale.id) })
}
