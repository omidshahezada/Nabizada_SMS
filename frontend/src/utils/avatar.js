export function createAvatarFallback(user) {
  const candidate = user?.name?.trim()?.charAt(0) || 'ک'
  const initial = /[\p{L}\p{N}]/u.test(candidate) ? candidate : 'ک'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><rect width="100%" height="100%" fill="#17a2b8"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-size="58">${initial}</text></svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}
