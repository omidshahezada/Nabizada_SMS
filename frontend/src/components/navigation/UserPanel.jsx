import { Link } from 'react-router-dom'
import { paths } from '@/app/routes'
import { createAvatarFallback } from '@/utils/avatar'
import { resolveMediaUrl } from '@/utils/media'

export function UserPanel({ user }) {
  const fallback = createAvatarFallback(user)
  const source = resolveMediaUrl(user.image_url)
    || (user.image ? resolveMediaUrl(`/storage/${user.image.replace(/^\//, '')}`) : fallback)
  return (
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img
          src={source}
          onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallback }}
          className="img-circle elevation-2"
          alt={user.name}
        />
      </div>
      <div className="info">
        <Link to={paths.profile} className="d-block">{user.name}</Link>
      </div>
    </div>
  )
}
