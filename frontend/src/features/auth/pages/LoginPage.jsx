import { useNavigate, useLocation } from 'react-router-dom'
import { laravelUrl } from '@/api/client'
import { paths } from '@/app/routes'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { useLogin } from '@/features/auth/hooks/authQueries'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const loginMutation = useLogin()
  const intendedPath = location.state?.from || paths.home

  function handleSubmit(credentials) {
    loginMutation.mutate(credentials, {
      onSuccess: () => navigate(intendedPath, { replace: true }),
    })
  }

  return (
    <main className="login-page auth-page">
      <div className="login-box">
        <div className="login-logo">
          <strong>ورود به سیستم</strong>
        </div>
        <div className="card card-info auth-card">
          <div className="card-header">
            <h1 className="card-title">وارد شدن به سیستم</h1>
          </div>
          <LoginForm
            onSubmit={handleSubmit}
            error={loginMutation.error}
            isPending={loginMutation.isPending}
            forgotPasswordUrl={laravelUrl('/forgot-password')}
          />
        </div>
      </div>
    </main>
  )
}
