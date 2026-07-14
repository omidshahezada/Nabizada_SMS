import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { dashboardKeys } from '@/features/dashboard/hooks/dashboardQueries'
import {
  createProduct,
  deleteProduct,
  getCategories,
  getProduct,
  getProducts,
  updateProduct,
} from '@/features/products/api/productsApi'

export const productKeys = {
  all: ['products'],
  lists: () => [...productKeys.all, 'list'],
  list: (params) => [...productKeys.lists(), params],
  details: () => [...productKeys.all, 'detail'],
  detail: (productId) => [...productKeys.details(), String(productId)],
  categories: () => [...productKeys.all, 'categories'],
}

export function useProducts(params) {
  return useQuery({ queryKey: productKeys.list(params), queryFn: () => getProducts(params) })
}

export function useProduct(productId) {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => getProduct(productId),
    enabled: Boolean(productId),
  })
}

export function useCategories() {
  return useQuery({ queryKey: productKeys.categories(), queryFn: getCategories })
}

function useRefreshProducts() {
  const queryClient = useQueryClient()
  return async (productId) => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: productKeys.lists() }),
      queryClient.invalidateQueries({ queryKey: productKeys.categories() }),
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all }),
      ...(productId ? [queryClient.invalidateQueries({ queryKey: productKeys.detail(productId) })] : []),
    ])
  }
}

export function useCreateProduct() {
  const refresh = useRefreshProducts()
  return useMutation({ mutationFn: createProduct, onSuccess: (product) => refresh(product.id) })
}

export function useUpdateProduct() {
  const refresh = useRefreshProducts()
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (product) => refresh(product.id),
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  const refresh = useRefreshProducts()
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: async (_, productId) => {
      queryClient.removeQueries({ queryKey: productKeys.detail(productId), exact: true })
      await refresh()
    },
  })
}
