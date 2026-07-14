import { allRoles, paths, roles } from '@/app/routes'

const salesRoles = [roles.admin, roles.seller]

export const navigationItems = [
  {
    id: 'dashboard',
    label: 'پنجره اطلاعات',
    icon: 'fa-bar-chart',
    to: paths.home,
    allowedRoles: allRoles,
    match: (pathname) => pathname === paths.home,
  },
  {
    id: 'products',
    label: 'محصولات/گدام',
    icon: 'fa-cubes',
    to: paths.products,
    allowedRoles: allRoles,
    match: (pathname) => pathname.startsWith(paths.products),
  },
  {
    id: 'new-sale',
    label: 'فروش جدید',
    icon: 'fa-plus-circle',
    to: paths.saleNew,
    allowedRoles: salesRoles,
    match: (pathname) => pathname === paths.saleNew,
  },
  {
    id: 'sales',
    label: 'فروشات',
    icon: 'fa-shopping-cart',
    allowedRoles: allRoles,
    match: (pathname) => pathname.startsWith('/sales') || pathname.startsWith(paths.saleItems),
    children: [
      { id: 'today-sales', label: 'فروشات امروز', icon: 'fa-clock-o', to: paths.salesToday, allowedRoles: allRoles },
      { id: 'sale-items', label: 'فروشات', icon: 'fa-clipboard', to: paths.saleItems, allowedRoles: salesRoles },
      { id: 'all-sales', label: 'فروشات عمومی', icon: 'fa-shopping-bag', to: paths.sales, allowedRoles: allRoles },
    ],
  },
  {
    id: 'customers',
    label: 'مشتریان',
    icon: 'fa-users',
    to: paths.customers,
    allowedRoles: allRoles,
    match: (pathname) => pathname.startsWith(paths.customers),
  },
  {
    id: 'finance',
    label: 'حسابات مالی',
    icon: 'fa-money',
    to: paths.finance,
    allowedRoles: allRoles,
    match: (pathname) => pathname.startsWith(paths.finance)
      || pathname.startsWith('/transactions')
      || pathname.startsWith('/expenses'),
  },
  {
    id: 'settings',
    label: 'تنظیمات',
    icon: 'fa-gear',
    allowedRoles: [roles.admin],
    match: (pathname) => pathname.startsWith('/users')
      || pathname.startsWith('/settings')
      || pathname === paths.profile,
    children: [
      { id: 'users', label: 'تظیمات کابران', icon: 'fa-users', to: paths.users },
      { id: 'company', label: 'تنظیمات فاکتور', icon: 'fa-building', to: paths.companySettings },
      { id: 'profile', label: 'نمایه', icon: 'fa-user', to: paths.profile },
    ],
  },
  {
    id: 'profile',
    label: 'نمایه',
    icon: 'fa-user',
    to: paths.profile,
    allowedRoles: [roles.seller, roles.monitor],
    match: (pathname) => pathname === paths.profile,
  },
]
