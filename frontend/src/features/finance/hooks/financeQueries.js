import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as api from '@/features/finance/api/financeApi'

export const financeKeys = { all: ['finance'], summary: ['finance', 'summary'], transactions: (params) => ['finance', 'transactions', params], transaction: (id) => ['finance', 'transaction', String(id)], expenses: (params) => ['finance', 'expenses', params], expense: (id) => ['finance', 'expense', String(id)] }
export const useFinanceSummary = () => useQuery({ queryKey: financeKeys.summary, queryFn: api.getFinanceSummary })
export const useTransactions = (params) => useQuery({ queryKey: financeKeys.transactions(params), queryFn: () => api.getTransactions(params) })
export const useTransaction = (id) => useQuery({ queryKey: financeKeys.transaction(id), queryFn: () => api.getTransaction(id), enabled: Boolean(id) })
export const useExpenses = (params) => useQuery({ queryKey: financeKeys.expenses(params), queryFn: () => api.getExpenses(params) })
export const useExpense = (id) => useQuery({ queryKey: financeKeys.expense(id), queryFn: () => api.getExpense(id), enabled: Boolean(id) })

function mutation(mutationFn) {
  return function useFinanceMutation() {
    const queryClient = useQueryClient()
    return useMutation({ mutationFn, onSuccess: () => queryClient.invalidateQueries({ queryKey: financeKeys.all }) })
  }
}
export const useCreateTransaction = mutation(api.createTransaction)
export const useUpdateTransaction = mutation(api.updateTransaction)
export const useDeleteTransaction = mutation(api.deleteTransaction)
export const useCreateExpense = mutation(api.createExpense)
export const useUpdateExpense = mutation(api.updateExpense)
export const useDeleteExpense = mutation(api.deleteExpense)
