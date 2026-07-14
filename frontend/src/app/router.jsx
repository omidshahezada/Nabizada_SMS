import { createBrowserRouter } from 'react-router-dom'
import { allRoles, paths, roles } from '@/app/routes'
import { GuestRoute } from '@/components/routing/GuestRoute'
import { ProtectedRoute } from '@/components/routing/ProtectedRoute'
import { RoleRoute } from '@/components/routing/RoleRoute'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { CustomerCreatePage } from '@/features/customers/pages/CustomerCreatePage'
import { CustomerDetailPage } from '@/features/customers/pages/CustomerDetailPage'
import { CustomerEditPage } from '@/features/customers/pages/CustomerEditPage'
import { CustomerListPage } from '@/features/customers/pages/CustomerListPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { ExpenseCreatePage, ExpenseDetailPage, ExpenseEditPage, FinancePage, TransactionCreatePage, TransactionDetailPage, TransactionEditPage } from '@/features/finance/pages/FinancePages'
import { ProductCreatePage } from '@/features/products/pages/ProductCreatePage'
import { ProductDetailPage } from '@/features/products/pages/ProductDetailPage'
import { ProductEditPage } from '@/features/products/pages/ProductEditPage'
import { ProductListPage } from '@/features/products/pages/ProductListPage'
import { ProfilePage } from '@/features/profile/pages/ProfilePage'
import { SaleCreatePage, SaleEditPage, SaleInvoiceEditPage, SaleInvoicePage, SaleItemListPage, SaleListPage, TodaySalesPage } from '@/features/sales/pages/SalesPages'
import { CompanySettingsPage } from '@/features/settings/pages/CompanySettingsPage'
import { UserCreatePage, UserDetailPage, UserEditPage, UserListPage } from '@/features/users/pages/UserPages'
import { AppLayout } from '@/layouts/AppLayout'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

const adminOnly = [roles.admin]
const salesRoles = [roles.admin, roles.seller]

function restricted(allowedRoles, page) {
  return <RoleRoute allowedRoles={allowedRoles}>{page}</RoleRoute>
}

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [{ path: paths.login, element: <LoginPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: restricted(allRoles, <DashboardPage />) },
          { path: 'products', element: restricted(allRoles, <ProductListPage />) },
          { path: 'products/new', element: restricted(adminOnly, <ProductCreatePage />) },
          { path: 'products/:productId', element: restricted(allRoles, <ProductDetailPage />) },
          { path: 'products/:productId/edit', element: restricted(adminOnly, <ProductEditPage />) },
          { path: 'customers', element: restricted(allRoles, <CustomerListPage />) },
          { path: 'customers/new', element: restricted(salesRoles, <CustomerCreatePage />) },
          { path: 'customers/:customerId', element: restricted(allRoles, <CustomerDetailPage />) },
          { path: 'customers/:customerId/edit', element: restricted(salesRoles, <CustomerEditPage />) },
          { path: 'sales', element: restricted(allRoles, <SaleListPage />) },
          { path: 'sales/today', element: restricted(allRoles, <TodaySalesPage />) },
          { path: 'sales/new', element: restricted(salesRoles, <SaleCreatePage />) },
          { path: 'sales/:saleId', element: restricted(allRoles, <SaleInvoicePage />) },
          { path: 'sales/:saleId/edit', element: restricted(salesRoles, <SaleEditPage />) },
          { path: 'sales/:saleId/invoice', element: restricted(allRoles, <SaleInvoicePage />) },
          { path: 'sales/:saleId/invoice/edit', element: restricted(salesRoles, <SaleInvoiceEditPage />) },
          { path: 'sale-items', element: restricted(salesRoles, <SaleItemListPage />) },
          { path: 'finance', element: restricted(allRoles, <FinancePage />) },
          { path: 'transactions/new', element: restricted(adminOnly, <TransactionCreatePage />) },
          { path: 'transactions/:transactionId', element: restricted(allRoles, <TransactionDetailPage />) },
          { path: 'transactions/:transactionId/edit', element: restricted(adminOnly, <TransactionEditPage />) },
          { path: 'expenses/new', element: restricted(adminOnly, <ExpenseCreatePage />) },
          { path: 'expenses/:expenseId', element: restricted(allRoles, <ExpenseDetailPage />) },
          { path: 'expenses/:expenseId/edit', element: restricted(adminOnly, <ExpenseEditPage />) },
          { path: 'users', element: restricted(adminOnly, <UserListPage />) },
          { path: 'users/new', element: restricted(adminOnly, <UserCreatePage />) },
          { path: 'users/:userId', element: restricted(adminOnly, <UserDetailPage />) },
          { path: 'users/:userId/edit', element: restricted(adminOnly, <UserEditPage />) },
          { path: 'settings/company', element: restricted(adminOnly, <CompanySettingsPage />) },
          { path: 'profile', element: restricted(allRoles, <ProfilePage />) },
          { path: paths.forbidden, element: <ForbiddenPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])
