export function RoleGate({ allowedRoles, user, children, fallback = null }) {
  if (!allowedRoles?.length || allowedRoles.includes(user?.role)) return children
  return fallback
}

