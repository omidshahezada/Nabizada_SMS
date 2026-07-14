import { apiClient } from '@/api/client'
import { unwrapResource } from '@/api/response'

export const getFinanceSummary = async () => unwrapResource(await apiClient.get('/api/v1/finance/summary'))
export const getTransactions = async (params) => (await apiClient.get('/api/v1/transactions', { params })).data
export const getTransaction = async (id) => unwrapResource(await apiClient.get(`/api/v1/transactions/${id}`))
export const createTransaction = async (payload) => unwrapResource(await apiClient.post('/api/v1/transactions', payload))
export const updateTransaction = async ({ id, payload }) => unwrapResource(await apiClient.patch(`/api/v1/transactions/${id}`, payload))
export const deleteTransaction = async (id) => apiClient.delete(`/api/v1/transactions/${id}`)
export const getExpenses = async (params) => (await apiClient.get('/api/v1/expenses', { params })).data
export const getExpense = async (id) => unwrapResource(await apiClient.get(`/api/v1/expenses/${id}`))
export const createExpense = async (payload) => unwrapResource(await apiClient.post('/api/v1/expenses', payload))
export const updateExpense = async ({ id, payload }) => unwrapResource(await apiClient.patch(`/api/v1/expenses/${id}`, payload))
export const deleteExpense = async (id) => apiClient.delete(`/api/v1/expenses/${id}`)
