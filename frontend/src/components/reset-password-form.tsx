'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { apiResetPassword } from '@/lib/auth-api'

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const prefillEmail = useMemo(() => searchParams.get('email') ?? '', [searchParams])

  const [email, setEmail] = useState(prefillEmail)
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await apiResetPassword({ email, code, password, passwordConfirmation })
      setDone(true)
      router.push('/entrar')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao redefinir senha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-md px-4">
        <h1 className="mb-2 font-serif text-3xl font-semibold text-foreground">Nova senha</h1>
        <p className="mb-8 text-muted-foreground">Use o código recebido por e-mail para criar uma nova senha.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="reset-email">E-mail</Label>
            <Input
              id="reset-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="reset-code">Código</Label>
            <Input id="reset-code" value={code} onChange={(e) => setCode(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="reset-password">Senha</Label>
            <Input
              id="reset-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <div>
            <Label htmlFor="reset-passwordConfirmation">Confirmar senha</Label>
            <Input
              id="reset-passwordConfirmation"
              type="password"
              autoComplete="new-password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              minLength={8}
            />
          </div>

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          {done ? (
            <p className="text-sm text-muted-foreground">Senha atualizada. Redirecionando…</p>
          ) : null}

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? 'Salvando…' : 'Atualizar senha'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Quer tentar novamente?{' '}
          <Link href="/esqueci-senha" className="font-medium text-foreground underline-offset-4 hover:underline">
            Enviar outro código
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

